import { Box, Grid2, Typography } from "@mui/material";
import { useFetchBestQuery, useFetchNewQuery } from "../catalogue/catalogueAPI";
import ProductCard from "../catalogue/ProductCard";

export default function Home() {
  const {data: newItems} = useFetchNewQuery();
  const {data: bestItems} = useFetchBestQuery();

  if (!newItems || !bestItems) return <div>Loading...</div>;

   return (
  <>
    <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-between">
        <Box>
          <img 
          src="/images/HomePageBanner.jpg"
          alt="Banner image."
          style={{
          position: "absolute",
          width: "100%",
          height: "500px",
          objectFit: "cover",
          inset: 0
          }}
          />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column" position="absolute">
          <Typography textAlign="center" fontFamily="Trattatello">Metal Merch Store</Typography>
      </Box>
    </Box>
    
    <Box display="flex" flexDirection="column" sx={{mt: 49, px: 8}} alignItems="center">
      <Typography sx={{mb: 2}} fontWeight="bold" fontSize="30px">NEW ARRIVALS</Typography>
    <Grid2 container spacing={3} >
    {newItems ? newItems.map(item => (
        <Grid2 size={2} key={item.id}>
          <ProductCard product={item} />
        </Grid2>))
    : "An error occurred while fetching the products."}
      </Grid2>
      <Typography sx={{my: 2}} fontWeight="bold" fontSize="30px">BEST SELLERS</Typography>
    <Grid2 container spacing={3}>
      
  {bestItems 
    ? bestItems.map( item => (
        <Grid2 size={2} key={item.id}>
          <ProductCard product={item} />
        </Grid2>
      ))
    : "An error occurred while fetching the products."}
      </Grid2>
    </Box>
   
    
    </>
  )
}
