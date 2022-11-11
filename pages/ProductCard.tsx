import { Button, Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { useNFT } from "../hooks/useNFT";

const ProductCard = ({
  tokenAddress,
  tokenId,
}: {
  tokenAddress: string;
  tokenId: string;
}) => {
  const { data, error, isLoading, isSuccess } = useNFT();

  if (isSuccess) {
    console.log(data);
    console.log(`Owner: ${data.token.token.owner}`);
    console.log(`Name: ${data.token.token.name}`);
    console.log(`image: ${data.token.token.image.url}`);
    console.log(`description: ${data.token.token.description}`);
    console.log(`price: ${data.token.sales[0].price.nativePrice.decimal}`);
  }

  return (
    isSuccess && (
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
                <Button flat auto rounded color="secondary">
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
    )
  );
};

export default ProductCard;
