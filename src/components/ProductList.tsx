import { uuid } from "uuidv4";
import { IProduct } from "../utils/models";
import ProductCard from "./ProductCard";

const products: IProduct[] = [
  {
    id: uuid(),
    title: "Zip Tote Basket",
    color: "White and black",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: 140,
    description:
      "A zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    isAvailable: true,
  },
  // More products...
];

export default function ProductList() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
