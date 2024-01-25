import InfiniteScroll from "react-infinite-scroll-component";
import { Heading } from "./Heading";

type InfiniteLoaderProps = {
  length: number;
  next: () => void;
  children: React.ReactNode;
  err: boolean;
};

const loaderError =
  "We are experiencing technical difficulties. Please try again later";

export default function InfiniteLoader({
  length,
  next,
  children,
  err,
}: InfiniteLoaderProps) {
  return (
    <InfiniteScroll
      dataLength={length}
      next={next}
      hasMore={true}
      loader={
        <Heading
          containerClass="mt-2 text-center"
          size={4}
          text={err ? loaderError : "Loading..."}
        />
      }
    >
      {children}
    </InfiniteScroll>
  );
}
