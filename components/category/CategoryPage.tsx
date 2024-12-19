"use client";
import React, {useState} from "react";
import {CategoryType} from "@/lib/types";
import ActiveCats from "@/components/category/ActiveCats";

export default function CategoryPage({categories}: {categories: CategoryType[] | null}) {
  return <>{categories?.length ? categories.map((item) => <ActiveCats key={item.id} item={item} />) : <></>}</>;
}
