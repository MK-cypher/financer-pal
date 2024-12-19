"use client";

import {TextGenerateEffect} from "../ui/text-generate-effect";
import {Timeline} from "../ui/timeline";

export default function HowItWorks() {
  const data = [
    {
      title: "1. Add Your Expenses",
      content: (
        <div>
          <p className="text-muted-foreground">
            Effortlessly log every financial outflow with our intuitive interface. Whether it's daily coffee purchases,
            monthly rent, or unexpected car repairs, capture all your expenses quickly and accurately. Categorize
            spending instantly, attach receipts, and gain a comprehensive view of where your money is going.
          </p>
          <div className="rounded-lg object-cover h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mt-3">
            <img src="/expenses.png" alt="expenses" className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      ),
    },
    {
      title: "2. Add Your Incomes",
      content: (
        <div>
          <p className="text-muted-foreground">
            Track every source of income with precision and ease. Record your salary, freelance earnings, investments,
            side hustle revenue, and any other financial inflows. Our flexible system allows you to log one-time or
            recurring income streams, helping you maintain a clear and complete picture of your financial earnings.
          </p>
          <div className="rounded-lg object-cover h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mt-3">
            <img src="income.png" alt="Income" className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      ),
    },
    {
      title: "3. Track Your financial goals",
      content: (
        <div className="text-muted-foreground">
          <p>
            Define short-term and long-term financial objectives. Track your progress, receive motivational insights,
            and get personalized recommendations to help you achieve your financial milestones.
          </p>
          <div className="rounded-lg object-cover h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mt-3">
            <img src="track.png" alt="Track progress" className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      ),
    },
    {
      title: "4. Receive Personalized Insights",
      content: (
        <div className="text-muted-foreground">
          <p>
            Our smart algorithm analyzes your spending habits, identifies potential savings opportunities, and provides
            actionable recommendations to optimize your financial strategy.
          </p>
          <div className="rounded-lg object-cover h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mt-3">
            <img src="advisor.png" alt="AI Advisor" className="object-cover w-full h-full rounded-lg" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="work" className="container py-20 flex items-center justify-center">
      <div>
        <div className="mb-10 text-center mx-auto max-w-[600px]">
          <TextGenerateEffect duration={2} className="font-bold text-3xl" words={"How it Works?"} />
        </div>
        <div className="w-full">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
}
