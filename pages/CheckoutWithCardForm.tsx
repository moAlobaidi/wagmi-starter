import { CheckoutWithCard, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import "@paperxyz/react-client-sdk/dist/index.css";
import { router } from "next/client";

const CheckoutWithCardForm = () => {
  const queryParams = new URLSearchParams(location.search);
  const SDKClientSecret = queryParams.get("checkoutId");

  if (SDKClientSecret) {
    return (
      <PaperSDKProvider
        clientId={process.env.NEXT_PUBLIC_PAPER_CLIENT_ID}
        chainName="Polygon"
      >
        <CheckoutWithCard
          sdkClientSecret={SDKClientSecret}
          onPaymentSuccess={(result) => {}}
          onReview={(result) => {}}
          onError={(error) => {}}
          options={{ colorBackground: "#121212" }}
        />
      </PaperSDKProvider>
    );
  } else {
    router.push("/");
  }
};
