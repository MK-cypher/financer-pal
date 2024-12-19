import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {ExpensesType} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToHSL(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return {h, s, l};
}

export function hslToHex(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hueToRgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export const keyToVar = (key: string) => {
  let res = "";
  for (let c of key) {
    if (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90) {
      res += `-`;
    }
    res += c.toLowerCase();
  }
  return res;
};

export const digitInput = (val: string) => {
  if (val.charCodeAt(0) >= 48 && val.charCodeAt(0) <= 57) return true;

  return false;
};

export const MoneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const monthDayYear = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + ", " + year;
};

export const getMonth = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  return month[d.getMonth()];
};

export function mergeDailyData(existingData: ExpensesType[]) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthlyData = Array.from({length: daysInMonth}, (_, index) => {
    const date = new Date(year, month, index + 1);
    return {
      date: date.toISOString(),
      day: String(date.getDate()).length == 2 ? String(date.getDate()) : `0${String(date.getDate())}`,
      amount: 0,
      fill: "",
    };
  });
  if (!existingData || !existingData.length) return monthlyData;

  existingData.forEach((existingItem) => {
    const existingDate = new Date(existingItem.created_at!);

    const matchingDayIndex = monthlyData.findIndex((monthItem) => {
      const monthDate = new Date(monthItem.date);
      return (
        monthDate.getDate() === existingDate.getDate() &&
        monthDate.getMonth() === existingDate.getMonth() &&
        monthDate.getFullYear() === existingDate.getFullYear()
      );
    });

    if (matchingDayIndex !== -1) {
      monthlyData[matchingDayIndex].amount += existingItem.amount;

      if (!monthlyData[matchingDayIndex].fill) {
        monthlyData[matchingDayIndex].fill = existingItem.fill;
      }
    }
  });

  return monthlyData;
}
