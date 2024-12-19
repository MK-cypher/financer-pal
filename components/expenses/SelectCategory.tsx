import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {CategoryType} from "@/lib/types";

export default function SelectCategory({
  setNewData,
  data,
  selectedCategory,
}: {
  setNewData: any;
  data?: CategoryType[] | null;
  selectedCategory: string;
}) {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor="category">Category</label>
      <div className="flex items-center gap-3">
        <div className="w-full">
          <Select
            defaultValue={selectedCategory || ""}
            onValueChange={(e) => {
              setNewData((prev: any) => ({...prev, category: e}));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.length ? (
                  data.map((item, i) => (
                    <SelectItem key={item.id} value={item.id || ""}>
                      {item.category}
                    </SelectItem>
                  ))
                ) : (
                  <></>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
