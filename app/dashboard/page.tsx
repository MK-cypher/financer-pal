"use client";
import ActiveCats from "@/components/category/ActiveCats";
import {ChartBar} from "@/components/charts/ChartBar";
import {ChartPie} from "@/components/charts/ChartPie";
import ExpensesPreview from "@/components/dashboardPage/expensesPreview";
import Stats from "@/components/dashboardPage/Stats";
import {useFinance} from "@/components/FinanceContext";
import ActiveIncome from "@/components/income/ActiveIncome";
import ActiveSubs from "@/components/subs/ActiveSubs";
import {CategoryType, ChartPieType, ExpensesType, UserSubs} from "@/lib/types";
import {getMonth} from "@/lib/utils";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";

export default function page() {
  const {expenses, income, categories, recurring, expensesChart, totlaExpenses, totlaIncome} = useFinance().financeData;
  const date = new Date();
  const month = getMonth();
  const year = date.getFullYear();
  return (
    <div className="">
      <Stats expenses={totlaExpenses} income={totlaIncome} />
      <Link
        href="/dashboard/expenses"
        className="w-fit text-2xl font-semibold mb-3 flex items-center gap-2 hover:text-primary transition-all duration-300"
      >
        Expenses
        <ArrowUpRight />
      </Link>
      <div className="flex mb-10 gap-5 max-[950px]:flex-col">
        <div className="w-full">
          {expenses && expenses.length ? (
            expenses.slice(0, 8).map((item: ExpensesType) => <ExpensesPreview item={item} key={item.id} />)
          ) : (
            <div>No Expenses have been added</div>
          )}
        </div>
        <ChartPie chartData={expensesChart} date={`${month} - ${year}`} />
      </div>
      <Link
        href="/dashboard/income"
        className="w-fit text-2xl font-semibold mb-3 flex items-center gap-2 hover:text-primary transition-all duration-300"
      >
        Income
        <ArrowUpRight />
      </Link>
      <div className="flex mb-10 gap-5 max-[950px]:flex-col">
        <div className="w-full">
          {income && income.length ? (
            income.slice(0, 8).map((item: ChartPieType) => <ActiveIncome item={item} key={item.id} preview />)
          ) : (
            <div>No Icomes have been added</div>
          )}
        </div>
        <ChartPie chartData={income} date={`${month} - ${year}`} />
      </div>
      <div className="flex gap-5 max-[950px]:flex-col">
        <div className="w-full">
          <Link
            href="/dashboard/categories"
            className="w-fit text-2xl font-semibold mb-3 flex items-center gap-2 hover:text-primary transition-all duration-300"
          >
            Categories
            <ArrowUpRight />
          </Link>
          <div>
            {categories && categories.length ? (
              categories.slice(0, 8).map((item: CategoryType) => <ActiveCats item={item} key={item.id} preview />)
            ) : (
              <div className="min-h-20">No Categories have been added</div>
            )}
          </div>
        </div>
        <div className="w-full">
          <Link
            href="/dashboard/subscriptions"
            className="w-fit text-2xl font-semibold mb-3 flex items-center gap-2 hover:text-primary transition-all duration-300"
          >
            Recurring
            <ArrowUpRight />
          </Link>
          <div>
            {recurring && recurring.length ? (
              recurring.slice(0, 8).map((item: UserSubs) => <ActiveSubs item={item} key={item.id} preview />)
            ) : (
              <div className="min-h-20">No Subscriptions have been added</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
