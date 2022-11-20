import { dehydrate, useQuery } from "@tanstack/react-query";

import ProductGrid from "../components/ProductGrid";
import CrazyNav from "../components/CrazyNav";
import { getDogs, queryClient } from "../src/api";

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["dogs"], () => getDogs());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function Home() {
  const { data } = useQuery(["dogs"], () => getDogs());
  console.log(data);
  return (
    <>
      <CrazyNav />
      <ProductGrid />
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
