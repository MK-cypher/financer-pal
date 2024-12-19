import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export type UserSubs = {
  id: string;
  subName: string;
  icon: string;
  nextBilling: string;
  subAmount: number;
  billingType: "monthly" | "annually";
  created_by?: string;
  created_at?: string;
};

export type CategoryType = {
  created_by?: string;
  created_at?: string;
  id?: string;
  category: string;
  icon: string;
  fill: string;
  amount?: number;
};

export type ExpensesType = {
  id?: string;
  category: string;
  label: string;
  amount: number;
  fill: string;
  created_by?: string;
  created_at?: string;
};

export type ExpensesData = Partial<CategoryType> & {
  data: ExpensesType[];
};

export type ChartPieType = {
  id?: string;
  category: string;
  amount: string | number;
  fill: string;
  label?: string;
  created_by?: string;
  created_at?: string;
};

export type FeatureType = {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export type workDataType = {
  title: string;
  content: React.ReactNode;
};

export type PriceType = {
  type: string;
  price: {monthly: {amount: number; id: string}; annual: {amount: number; id: string}};
  description: string;
  features: string[];
};
