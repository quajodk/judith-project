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

export const getCardType = (number: string) => {
  if (!number) return;
  let amex = new RegExp("^3[47][0-9]{13}$");
  let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  let cup1 = new RegExp("^62[0-9]{14}[0-9]*$");
  let cup2 = new RegExp("^81[0-9]{14}[0-9]*$");

  let mastercard = new RegExp("^5[1-5][0-9]{14}$");
  let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

  let disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
  let disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
  let disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

  let diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
  let jcb = new RegExp("^35[0-9]{14}[0-9]*$");

  if (visa.test(number)) {
    return "VISA";
  }
  if (amex.test(number)) {
    return "AMEX";
  }
  if (mastercard.test(number) || mastercard2.test(number)) {
    return "MASTERCARD";
  }
  if (disco1.test(number) || disco2.test(number) || disco3.test(number)) {
    return "DISCOVER";
  }
  if (diners.test(number)) {
    return "DINERS";
  }
  if (jcb.test(number)) {
    return "JCB";
  }
  if (cup1.test(number) || cup2.test(number)) {
    return "CHINA_UNION_PAY";
  }
  return undefined;
};

export const extractFileNameFromLink = (link: string, folder?: string) => {
  if (!link) return "";
  const fileName = link.substring(link.lastIndexOf("/") + 1);

  if (folder) {
    return fileName
      ?.replace("%2F", "")
      ?.split(folder)[1]
      ?.split("?")[0]
      .replace("%2F", "")
      .replace("%20", " ")
      .trim();
  }
  return fileName
    .replace("%2F", "")
    .split("media")[1]
    .split("?")[0]
    .replace("%2F", "")
    .replace("%20", " ")
    .trim();
};
