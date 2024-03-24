import PageBoard from "./components/PageBoard";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { vercelURL } from "./utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "New api example",
    description: "This is a new api example",
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
