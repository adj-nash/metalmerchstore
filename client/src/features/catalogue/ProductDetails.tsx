import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { useFetchProductQuery } from "./catalogueAPI";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useFetchProductQuery(id ? +id : 0);

  if (isLoading || !product) return <div>Product not found...</div>;

  const productFields = [
    { label: "", value: product.description },
    { label: "Band", value: product.band },
    { label: "Genre", value: product.genre },
  ];

  const productSize = [
    {
      label: "Small",
      value: "S",
    },
    {
      label: "Medium",
      value: "M",
    },
    {
      label: "Large",
      value: "L",
    },
    {
      label: "Extra Large",
      value: "XL",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ marginTop: "85px" }}>
      <Grid size={2}></Grid>
      <Grid size={5}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={5}>
        <Typography variant="h3">{product.name}</Typography>

        <Typography variant="h4" sx={{ mb: 1 }}>
          £{(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">Inc. VAT plus shipping</Typography>
        <Grid size={4}>
          <TextField
            sx={{ marginTop: "20px", width: "210px" }}
            variant="outlined"
            select
            label="Size"
            defaultValue="S"
          >
            {productSize.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ marginTop: "20px", width: "210px" }}
            variant="outlined"
            type="number"
            label="Quantity in Basket"
            defaultValue={1}
          ></TextField>
        </Grid>
        <Grid size={4}>
          <Button
            sx={{ height: "55px", width: "210px", marginTop: "20px" }}
            color="primary"
            variant="contained"
            fullWidth
          >
            Add to Basket
          </Button>
        </Grid>
        <br />
        {productFields.map((item, index) => (
          <Typography variant="subtitle1" key={index}>
            <b>{item.label.toUpperCase()}</b> {item.value}
          </Typography>
        ))}

        <Grid />
      </Grid>
    </Grid>
  );
}
