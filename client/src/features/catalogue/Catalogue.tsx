import ProductList from "./ProductList";
import { useFetchAllProductsQuery } from "./catalogueAPI";

export default function Catalogue() {
  const { data, isLoading } = useFetchAllProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <>
      <ProductList products={data} />
    </>
  );
}
