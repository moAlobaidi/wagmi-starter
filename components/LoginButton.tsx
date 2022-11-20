import {
  PaperSDKProvider,
  LoginWithPaper,
  PaperSDKError,
} from "@paperxyz/react-client-sdk";
import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export function LoginButton() {
  const onSuccessLogin = async (code: string) => {
    // code is the temporary access code that you can swap for a permenant user access token on your backend
    const resp = await fetch("/api/get-user-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
      }),
    });
    console.log("made it after fetch");
    if (resp.status !== 200) {
      console.log("resp", resp);
      throw new Error("Failed to get user token");
    }
    const { userToken } = await resp.json();
    window.localStorage.setItem("userToken", userToken);
  };
  // Ensure that you have a PaperSDKProvider set-up with the proper chain name and client Id.
  return (
    <PaperSDKProvider
      chainName="Polygon"
      clientId={process.env.NEXT_PUBLIC_PAPER_CLIENT_ID}
    >
      <LoginWithPaper
        onSuccess={onSuccessLogin}
        onError={(error: PaperSDKError) => {
          console.log("ERROR");
          console.log(error.code);
        }}
      >
        {({ onClick }: { onClick: () => void }) => {
          return (
            <Button auto flat onClick={onClick}>
              Login
            </Button>
          );
        }}
      </LoginWithPaper>
    </PaperSDKProvider>
  );
}

export default LoginButton;
