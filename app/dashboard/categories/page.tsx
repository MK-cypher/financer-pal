import {getCategories} from "@/app/actions/categories";
import AddCatBtn from "@/components/category/AddCatBtn";
import CategoryPage from "@/components/category/CategoryPage";

export default async function page() {
  const categories = await getCategories();
  return (
    <div>
      <AddCatBtn />
      <div className="mt-5">
        <div className="text-xl font-semibold">Active Categories</div>
        <CategoryPage categories={categories} />
      </div>
    </div>
  );
}
