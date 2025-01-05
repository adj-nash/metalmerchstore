import { Container } from "@mui/material";
import Catalogue from "../../features/catalogue/Catalogue";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Header from "./Header";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5154/api/Products/")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Header
        mode={false}
        toggleMode={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Container maxWidth="xl">
        <Catalogue products={products} />
      </Container>
    </>
  );
}

export default App;
