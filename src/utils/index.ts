import { ClockIcon, HomeIcon, ViewListIcon } from "@heroicons/react/outline";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const navigation = [
  {
    name: "Home",
    path: "dashboard",
    icon: HomeIcon,
    current: true,
    exact: true,
  },
  {
    name: "Products",
    path: "products",
    icon: ViewListIcon,
    current: false,
    exact: false,
  },
  {
    name: "Orders",
    path: "orders",
    icon: ClockIcon,
    current: false,
    exact: false,
  },
];
