import React from "react";
import ProductCard from "./elisa/ProductCard";
import SearchResultsSkeleton from "./elisa/SkeletonCard";
import { Skeleton } from "./ui/skeleton";

const SearchResults = ({ data, isPending }: any) => {
  console.log(data);
  if (isPending) {
    return <SearchResultsSkeleton />;
  } else if (data && data?.items?.length > 0) {
    return (
      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 ">
        {data?.items?.map((d: any, i: number) => (
          <ProductCard
            title={d?.title}
            price={d?.price}
            key={d?.title + d?.id}
            image={d?.image_url}
          />
        ))}
      </div>
    );
  } else {
    // No query data yet
    return <div></div>;
  }
};

export default SearchResults;
