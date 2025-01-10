import ProductList from "./ProductList";
import { useFetchAllProductsQuery } from "./catalogueAPI";

export default function Catalogue() {
  const { data, isLoading } = useFetchAllProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <>
      <h1>List of products:</h1>
      <ProductList products={data} />
    </>
  );
}
