import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";

const API_URL = `https://api.zora.co/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    "X-API-KEY": "",
  },
});

export function useNFT() {
  return useQuery(["get-nft"], async () => {
    const getNFT = await graphQLClient.request(
      gql`
        query TokenSale {
          token(
            token: {
              address: "0xc729Ce9bF1030fbb639849a96fA8BBD013680B64"
              tokenId: "246"
            }
          ) {
            sales {
              saleType
              saleContractAddress
              sellerAddress
              buyerAddress
              transactionInfo {
                blockTimestamp
                transactionHash
              }
              price {
                nativePrice {
                  decimal
                  currency {
                    name
                  }
                }
                usdcPrice {
                  decimal
                  currency {
                    name
                  }
                }
              }
            }
            token {
              collectionName
              image {
                url
              }
              name
              owner
              description
              tokenId
            }
          }
        }
      `
    );
    return getNFT;
  });
}
