import {getIncome} from "@/app/actions/income";
import ActiveIncome from "@/components/income/ActiveIncome";
import AddIncome from "@/components/income/AddIncome";
import IncomePage from "@/components/income/IncomePage";

export default async function page() {
  const income = await getIncome();
  return (
    <div>
      <AddIncome />
      <div className="mt-5">
        <div className="text-xl font-semibold">Active Income</div>
        <IncomePage incomes={income} />
      </div>
    </div>
  );
}
