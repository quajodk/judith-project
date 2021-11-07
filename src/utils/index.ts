import { ClockIcon, HomeIcon, ViewListIcon } from "@heroicons/react/outline";

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
