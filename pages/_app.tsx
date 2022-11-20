import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../src/api";

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
