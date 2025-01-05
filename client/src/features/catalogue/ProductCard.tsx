import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 250, backgroundSize: "cover" }}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          £{(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}
