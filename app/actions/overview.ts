"use server";
import {CategoryType, ChartPieType, ExpensesType, UserSubs} from "@/lib/types";
import {createSupabaseServerClient} from "@/lib/db/server";

const groupData = (categories: CategoryType[], expensesData: ExpensesType[]) => {
  const groupedExpenses = expensesData.reduce((acc, expense) => {
    const categoryId = expense.category;
    //@ts-ignore
    if (!acc[categoryId]) {
      //@ts-ignore
      acc[categoryId] = [];
    }
    //@ts-ignore
    acc[categoryId].push(expense);
    return acc;
  }, {});

  return categories.map((category) => ({
    ...category,
    //@ts-ignore
    data: groupedExpenses[category.id] || [],
  }));
};

export const getAllData = async () => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.rpc("get_all_data");
  if (error) console.log(error);
  let allData = data[0];
  if (allData.categories?.length && allData.expenses?.length) {
    const expensesData = groupData(allData.categories, allData.expenses).filter((item) => item.data.length !== 0);
    allData.expensesChart = expensesData;
  }
  let totlaExpenses = allData.expenses
    ? allData.expenses.reduce((acc: number, cur: ExpensesType) => (acc += cur.amount), 0)
    : 0;
  let totalRecurring = allData.recurring
    ? allData.recurring.reduce((acc: number, cur: UserSubs) => (acc += cur.subAmount), 0)
    : 0;
  totlaExpenses += totalRecurring;
  const totlaIncome = allData.income
    ? allData.income.reduce((acc: number, cur: ChartPieType) => (acc += Number(cur.amount)), 0)
    : 0;
  allData.totlaExpenses = totlaExpenses;
  allData.totlaIncome = totlaIncome;
  return allData || [];
};
