import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";
import { QueryClient } from "@tanstack/query-core";

const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql");

export const { getDogs } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
