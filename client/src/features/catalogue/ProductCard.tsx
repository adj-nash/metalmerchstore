import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();
  return (
    <Card sx={{borderRadius: "10px"}}>
      <CardMedia
        sx={{ height: 250, backgroundSize: "cover" }}
        image={product.imageUrl}
        title={product.name}
        component={Link}
        to={`/catalogue/${product.id}`}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="secondary">
          £{(product.price / 100).toFixed(2)}
        </Typography>
        <Button
          onClick={() => addBasketItem({ product, quantity: 1 })}
          variant="contained"
          disabled={isLoading}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
