import { CreateWallet, PaperSDKProvider } from "@paperxyz/react-client-sdk";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { awaitExpression } from "@babel/types";

const SignUp = ({
  email,
  onEmailVerificationInitiated,
}: {
  email: string;
  onEmailVerificationInitiated: () => void;
}) => {
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

  return (
    <PaperSDKProvider chainName={"Polygon"}>
      <CreateWallet
        clientId={process.env.NEXT_PUBLIC_PAPER_CLIENT_ID}
        emailAddress={email}
        onSuccess={async (user) => {
          console.log("user", user);
          const accessCode = user.accessCode ? user.accessCode : "";
          window.localStorage.setItem("accessCode", accessCode);
          await onSuccessLogin(accessCode);
        }}
        onEmailVerificationInitiated={onEmailVerificationInitiated}
        onError={(error) => {
          console.log("error", error);
        }}
        redirectUrl="http://localhost:3000/"
      >
        {({ createWallet }) => {
          return (
            <Button
              auto
              onClick={() => {
                // you can verify you email here before passing it in!
                createWallet(email);
              }}
            >
              Sign Up
            </Button>
          );
        }}
      </CreateWallet>
    </PaperSDKProvider>
  );
};

export default SignUp;
