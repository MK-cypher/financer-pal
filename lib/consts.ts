import {CircleDollarSignIcon, Home, Palette, RefreshCcw, Settings, ShoppingCart, Tag, Wand2} from "lucide-react";

export const navLinks = [
  {
    link: "Features",
    href: "#features",
  },
  {
    link: "How it works",
    href: "#work",
  },
  {
    link: "Pricing",
    href: "#pricing",
  },
  {
    link: "FAQs",
    href: "#faq",
  },
];

export const asideLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: Home,
  },
  {
    name: "Income",
    href: "/dashboard/income",
    Icon: CircleDollarSignIcon,
  },
  {
    name: "Expenses",
    href: "/dashboard/expenses",
    Icon: ShoppingCart,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    Icon: Tag,
  },
  {
    name: "Subscriptions",
    href: "/dashboard/subscriptions",
    Icon: RefreshCcw,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    Icon: Settings,
  },
];

export const features = [
  {
    title: "Comprehensive Tracking",
    description: "Effortlessly monitor all your financial transactions in one intuitive dashboard.",
    Icon: Palette,
  },
  {
    title: "Subscription Management",
    description: "Never lose track of recurring payments. Identify and cut unnecessary expenses.",
    Icon: Palette,
  },
  {
    title: "Personalization",
    description: "Make the app truly yours with customizable themes, icons, and colors. ",
    Icon: Palette,
  },
  {
    title: "Smart AI Insights",
    description: "Receive actionable recommendations to optimize your spending and savings.",
    Icon: Palette,
  },
];

export const prices = [
  {
    type: "FREE",
    price: {
      monthly: {
        amount: 0,
        id: "",
      },
      annual: {
        amount: 0,
        id: "",
      },
    },
    description: "Join Now for FREE",
    features: ["Track expenses", "Track income", "Track subscriptions", "full customizations"],
  },
  {
    type: "PRO",
    price: {
      monthly: {
        amount: 3,
        id: "price_1QX6CTG6gV3y7RTMNO6o11X5",
      },
      annual: {
        amount: 30,
        id: "price_1QX6E2G6gV3y7RTMYzESM4xo",
      },
    },
    description: "Unlock Your full Experience",
    features: ["Track expenses", "Track income", "Track subscriptions", "full customizations", "AI Advisor"],
  },
];

export const faqs = [
  {
    id: "01",
    title: "Do I lose access to the pro features if I cancel my subscription?",
    description:
      "if you cancel the subscription you will be able to continue using the pro features for the rest of the subscription duration.",
  },
  {
    id: "02",
    title: "is there a free trial?",
    description:
      "at the moment there isn't but there will be a 7 days free trial in the future without any credit card information, just signing up will unlock the free trial.",
  },
  {
    id: "03",
    title: "is there a refund?",
    description: "at the moment there is not refund for the subscription.",
  },
  {
    id: "04",
    title: "is the app fully published?",
    description: "the app is still not publically published yet",
  },
];
