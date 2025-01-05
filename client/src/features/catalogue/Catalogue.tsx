import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

type Props = {
  products: Product[];
};

export default function Catalogue({ products }: Props) {
  return (
    <>
      <h1>List of products:</h1>
      <ProductList products={products} />
    </>
  );
}
