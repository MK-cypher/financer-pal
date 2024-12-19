"use client";
import React, {useState} from "react";
import {ChartPieType} from "@/lib/types";
import ActiveIncome from "@/components/income/ActiveIncome";

export default function IncomePage({incomes}: {incomes: ChartPieType[] | null}) {
  return <>{incomes?.length ? incomes.map((item) => <ActiveIncome key={item.id} item={item} />) : <></>}</>;
}
