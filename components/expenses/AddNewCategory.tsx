"use client";
import EmojiBtn from "../ui/EmojiBtn";

export default function AddNewCategory({setNewCategory}: {setNewCategory: any}) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="space-y-2 w-fit">
          <label htmlFor="CatIcon">Icon</label>
          <div className="h-9">
            <EmojiBtn setNewData={setNewCategory} defaultEmoji={""} />
          </div>
        </div>
        <div className="space-y-2 w-fit">
          <label htmlFor="fill">Color</label>
          <input
            onChange={(e) => {
              setNewCategory((prev: any) => ({...prev, fill: e.target.value}));
            }}
            id="fill"
            type="color"
            name="fill"
            className="w-full h-9"
            readOnly={false}
          />
        </div>
        <div className="space-y-2 w-full">
          <label htmlFor="category">Category</label>
          <input
            onChange={(e) => {
              setNewCategory((prev: any) => ({...prev, category: e.target.value}));
            }}
            id="category"
            name="category"
            className="w-full"
            readOnly={false}
          />
        </div>
      </div>
    </div>
  );
}
