"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import OpenAI from "openai";

type IncomeType = {
  category: string;
  amount: number;
};
type ExpensesType = {
  label: string;
  amount: number;
};
type RecurringType = {
  subName: string;
  subAmount: number;
};

export const getAIPlan = async () => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.rpc("get_finance_data");
  if (error) console.log(error);
  let allData = data[0];
  const income = allData.income;
  const expenses = allData.expenses;
  const recurring = allData.recurring;
  const goal = allData.user_goal;
  if (!expenses && !recurring) {
    return JSON.stringify({
      error: true,
      title: "You haven't added any Expenses",
      description: "Please Provide your expenses or subscriptions in order to get the saving plan",
      variant: "default",
    });
  }
  if (!income) {
    return JSON.stringify({
      error: true,
      title: "You haven't added any Income",
      description: "Please Provide your Income in order to get the saving plan",
      variant: "default",
    });
  }
  if (!goal) {
    return JSON.stringify({
      error: true,
      title: "You haven't added a saving goal",
      description: "Please Provide your saving goal in order to get the saving plan",
      variant: "default",
    });
  }

  const template = `
You are an expert financial advisor specializing in personalized savings strategies. 
Your goal is to create a highly detailed, actionable, and personalized savings plan.

ANALYSIS GUIDELINES:
1. Conduct a thorough analysis of income, expenses, and financial constraints
2. Identify precise opportunities for savings and expense reduction
3. Provide specific, measurable, and realistic savings strategies
4. Consider the user's unique financial situation and saving goal

REQUIRED OUTPUT FORMAT:
A. FINANCIAL SNAPSHOT
- Total Monthly Income
- Total Fixed Expenses
- Total Variable Expenses
- Current Savings Potential

B. SAVINGS OPTIMIZATION STRATEGY
1. Primary Savings Recommendations
   - Specific expense categories to reduce
   - Exact dollar amounts to cut
   - Alternative cost-saving methods

2. Income Enhancement Suggestions
   - Potential side hustles
   - Skills to develop for additional income
   - Passive income opportunities

3. Savings Acceleration Plan
   - Recommended monthly savings amount
   - Projected timeline to reach goal
   - Milestone tracking suggestions

C. DETAILED IMPLEMENTATION STEPS
- Week-by-week savings plan
- Specific actions to reduce expenses
- Recommended budget allocation percentages

D. RISK MITIGATION
- Emergency fund recommendations
- Potential financial challenges to anticipate
- Adaptive strategy for unexpected expenses

E. PSYCHOLOGICAL SAVINGS SUPPORT
- Motivation techniques
- Habit-building strategies
- Recommended financial tracking tools

CRITICAL INSTRUCTIONS:
- Be extremely specific with numbers and percentages
- Provide actionable, immediate steps
- Tailor advice to the individual's exact financial data
- Avoid generic advice
- Prioritize realistic and sustainable savings strategies

OUTPUT CONSTRAINTS:
- Maximum 750 words
- Use clear, motivational language
- Include encouraging but realistic tone
- Provide a step-by-step, easy-to-follow plan
`;

  const incomeData = income
    ? income.map((item: IncomeType) => {
        return {label: item.category, amount: item.amount};
      })
    : "";
  const expensesData = expenses
    ? expenses.map((item: ExpensesType) => {
        return {label: item.label, amount: item.amount};
      })
    : "";

  const recurringData = recurring
    ? recurring.map((item: RecurringType) => {
        return {label: item.subName, amount: item.subAmount};
      })
    : "";

  const content = `
        ${income ? "INCOME: " + JSON.stringify(incomeData) : ""}
        ${expenses ? "EXPENSES: " + JSON.stringify(expensesData) : ""}
        ${recurring ? "RECURRING EXPENSES: " + JSON.stringify(recurringData) : ""}
        SAVING GOAL:${JSON.stringify(goal)}`;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API!,
    });

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: template,
        },
        {
          role: "user",
          content,
        },
      ],
    });

    const response = res.choices[0].message.content;
    return JSON.stringify({error: false, response});
    // return JSON.stringify({error: false, response: ""});
  } catch (error) {
    return JSON.stringify({
      error: true,
      title: "Something Went Wrong!",
      description: "Please try again later",
      variant: "destructive",
    });
  }
};
