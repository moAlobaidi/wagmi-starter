import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import { useNFT } from "../hooks/useNFT";
import { useRouter } from "next/router";

const registerContract = async (contractAddress: string) => {
  //register contract to get contractId
  const resp = await fetch("/api/register-contract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contractAddress,
    }),
  });
  console.log("made it after fetch");
  if (resp.status !== 200) {
    console.log("resp", resp);
    throw new Error("Failed to get user token");
  }
  const { contractId } = await resp.json();
  return contractId;
  //returns contractId, access via data.contractId
};

const createCheckoutIntent = async (contractId: string) => {
  //returns sdkClientSecret
  const resp = await fetch("/api/create-checkout-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contractId,
    }),
  });
  console.log("made it after fetch");
  if (resp.status !== 200) {
    console.log("resp", resp);
    throw new Error("Failed to get user token");
  }
  const { sdkClientSecret } = await resp.json();
  return sdkClientSecret;
};

const ProductCard = ({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: string;
  tokenId: string;
}) => {
  const { data, error, isLoading, isSuccess, isError } = useNFT();
  const router = useRouter();

  const handleBuy = async () => {
    //register contract
    const contractId = await registerContract(tokenAddress);
    //create checkout intent
    const SDKClientSecret = await createCheckoutIntent(contractId);

    router.push({
      pathname: "/checkout",
      query: { checkoutId: SDKClientSecret },
    });
  };

  if (isSuccess) {
    return (
      <Card css={{ w: "100%", h: "400px" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              Owned by: {data.token.token.owner}
            </Text>
            <Text h3 color="black">
              {data.token.token.name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={data.token.token.image.url}
            alt="https://nextui.org/images/card-example-6.jpeg"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text color="#000" size={12}>
                {data.token.token.collectionName}
              </Text>
              <Text color="#000" size={12}>
                Token ID: {data.token.token.tokenId}
              </Text>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button flat auto rounded color="secondary" onClick={handleBuy}>
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Buy Now $
                    {data.token.sales[0].price.usdcPrice.decimal.toFixed(2)}
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  if (isError) {
    return (
      <>
        <h1>404 error page couldn't load</h1>
        {/*<p>{error.message}</p>*/}
      </>
    );
  }
  return <div>This should be impossible</div>;
};

export default ProductCard;
