import PageBoard from "./components/PageBoard";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { vercelURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FlamePixel",
    description: "We have 1 days to place pixel then we can claim it as NFT",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          vercelURL() || "http://localhost:3000"
        )
      )),
    },
  };
}

// This is a react server component only
export default async function Home() {
  return (
    <div className="">
      <PageBoard/>
    </div>
  );
}
