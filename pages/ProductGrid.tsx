import { Grid } from "@nextui-org/react";
import ProductCard from "./ProductCard";

//test address Zorbs: 0xCa21d4228cDCc68D4e23807E5e370C07577Dd152

function ProductGrid() {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={4}>
        <ProductCard
          tokenAddress={"0xCa21d4228cDCc68D4e23807E5e370C07577Dd152"}
          tokenId={"25660"}
        />
      </Grid>
      <Grid xs={4}>
        <ProductCard
          tokenAddress={"0xCa21d4228cDCc68D4e23807E5e370C07577Dd152"}
          tokenId={"25660"}
        />
      </Grid>
      <Grid xs={4}>
        <ProductCard
          tokenAddress={"0xCa21d4228cDCc68D4e23807E5e370C07577Dd152"}
          tokenId={"25660"}
        />
      </Grid>
    </Grid.Container>
  );
}

export default ProductGrid;
