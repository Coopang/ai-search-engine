import React from "react";
import ProductCard from "./elisa/ProductCard";

const SearchResults = ({ data, isPending }: any) => {
  console.log(data);
  if (isPending) {
    return <div>Loading</div>;
  } else if (data && data?.data?.items?.length > 0) {
    return (
      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 ">
        {data?.data?.items?.map((d: any, i: number) => (
          <ProductCard
            title={d?.title}
            price={d?.price}
            key={d?.title + d?.id}
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
