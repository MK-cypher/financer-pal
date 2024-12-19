import {getCategories} from "@/app/actions/categories";
import {getExpenses} from "@/app/actions/expenses";
import AddExpenses from "@/components/expenses/AddExpenses";
import ExpensesPage from "@/components/expenses/ExpensesPage";

export default async function page() {
  const expenses = await getExpenses();
  const categories = await getCategories();
  return (
    <div>
      <AddExpenses categories={categories} />
      <div className="mt-5">
        <div className="text-xl font-semibold">Active Expenses</div>
        <ExpensesPage expenses={expenses} categories={categories} />
      </div>
    </div>
  );
}
