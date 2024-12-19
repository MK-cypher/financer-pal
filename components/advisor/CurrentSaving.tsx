import {MoneyFormat} from "@/lib/utils";
import {useFinance} from "../FinanceContext";

export default function CurrentSaving() {
  const {financeData} = useFinance();
  const income = financeData.totlaIncome;
  const expenses = financeData.totlaExpenses;
  return (
    <div className="bg-background rounded-lg p-2">
      <div>
        <div className="text-xl mb-2 text-muted-foreground">Current Saving</div>
        <div className="font-bold text-2xl">{MoneyFormat.format(Number(income - expenses))}</div>
      </div>
    </div>
  );
}
