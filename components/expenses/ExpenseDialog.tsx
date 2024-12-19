import {saveExpenses, updateExpenses} from "@/app/actions/expenses";
import {CategoryType, ChartPieType} from "@/lib/types";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {DialogContent, DialogTitle} from "../ui/dialog";
import {Plus, X} from "lucide-react";
import AddNewCategory from "./AddNewCategory";
import SelectCategory from "./SelectCategory";
import {saveCategories} from "@/app/actions/categories";
import {useToast} from "@/hooks/use-toast";

export default function ExpenseDialog({data, categories}: {data?: ChartPieType; categories: CategoryType[] | null}) {
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState<ChartPieType>(data || {fill: "", amount: "", category: "", label: ""});
  const [activeCats, setActiveCats] = useState(categories);
  const [newCategory, setNewCategory] = useState<CategoryType>({fill: "", category: "", icon: ""});
  const [add, setAdd] = useState(false);
  const {toast} = useToast();

  useEffect(() => {
    if (data) {
      setNewData((prev) => ({...prev, amount: `${prev.amount}`}));
    }
  }, []);

  const save = async () => {
    setLoading(true);
    //
    let res;
    if (data) {
      res = JSON.parse(await updateExpenses(newData, data.id!));
    } else {
      res = JSON.parse(await saveExpenses(newData));
    }
    if (res.error) {
      toast({title: "Something went Wrong!", variant: "destructive"});
    } else {
      toast({title: "Data has been saved Successfully", variant: "success"});
    }

    setLoading(false);
  };

  const addCategory = async () => {
    setLoading(true);
    const res = JSON.parse(await saveCategories(newCategory));
    //
    let id = "";
    if (!res.error) {
      id = res.id;
    }
    setNewData((prev) => ({...prev, category: id}));
    setActiveCats((prev: any) => [...prev, {...newCategory, id}]);
    setAdd(false);
    setLoading(false);
  };

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="font-normal"></DialogTitle>
      <div>
        <div className="flex items-center gap-2">
          <div className="space-y-2 mb-5 w-fit">
            <label htmlFor="fill-color">Color</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, fill: e.target.value}));
              }}
              id="fill-color"
              type="color"
              name="fill"
              className="w-full h-8"
              defaultValue={data?.fill || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 flex-1">
            <label htmlFor="label">Expense</label>
            <input
              onChange={(e) => {
                setNewData((prev) => ({...prev, label: e.target.value}));
              }}
              id="label"
              name="label"
              className="w-full"
              defaultValue={data?.label || ""}
              readOnly={false}
            />
          </div>
          <div className="space-y-2 mb-5 flex-shrink w-min">
            <label htmlFor="amount">Amount</label>
            <input
              onKeyDown={(e) => {
                const value = e.key;
                const pass = ["e", "-", "+", "=", "."];
                if (pass.includes(value)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = e.target.value;
                setNewData((prev) => ({...prev, amount: value}));
              }}
              id="amount"
              name="amount"
              type="number"
              className="min-w-[60px]"
              // @ts-ignore
              style={{width: `${newData.amount.length * 8 + 40}px`}}
              defaultValue={data?.amount || ""}
              readOnly={false}
            />
          </div>
        </div>
        <div className="flex items-start gap-3 mb-5">
          {add ? (
            <AddNewCategory setNewCategory={setNewCategory} />
          ) : (
            <SelectCategory
              selectedCategory={newData.category || data?.category || ""}
              data={activeCats}
              setNewData={setNewData}
            />
          )}
          <button
            onClick={() => {
              setAdd(!add);
            }}
            className={`${
              add ? "bg-red-400 hover:bg-red-600" : "bg-emerald-400 hover:bg-emerald-600"
            } mt-[33px] rounded-lg p-1.5 w-fit  text-white flex items-center gap-2`}
          >
            {add ? <X /> : <Plus />}
          </button>
        </div>
        <Button
          onClick={add ? addCategory : save}
          className={`w-full ${add && "bg-emerald-400 hover:bg-emerald-600"} ${loading && "loading"}`}
        >
          <span></span> {add ? "Add New Category" : "Save"}
        </Button>
      </div>
    </DialogContent>
  );
}
