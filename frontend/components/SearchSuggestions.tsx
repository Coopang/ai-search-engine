import React from "react";
import QueryButton from "./QueryButton";

type Props = {};

const outfitQueries = [
  "Stylish outfit ideas for a winter date night...",
  "Casual weekend brunch outfit inspiration...",
  "Elegant outfit for a wedding reception...",
  "Comfy yet chic airport outfit ideas...",
  "Sporty look for a day at the park...",
];

const SearchSuggestions = ({ data, mutate, isPending }: any) => {
  console.log(data ? Object.keys(data) : null);

  if (isPending) {
    return (
      <div className="flex flex-wrap gap-5 items-center justify-center">
        <div className="py-3 px-20 rounded-full bg-slate-200 animate-pulse w-[400px]" />
        <div className="py-3 px-20 rounded-full bg-slate-200 animate-pulse w-[400px]" />
        <div className="py-3 px-20 rounded-full bg-slate-200 animate-pulse w-[350px]" />
        <div className="py-3 px-20 rounded-full bg-slate-200 animate-pulse w-[350px]" />
        <div className="py-3 px-20 rounded-full bg-slate-200 animate-pulse w-[350px]" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-5">
      {data ? (
        <p className="font-bold">Related searches...</p>
      ) : (
        <p className="font-bold">Need some inspiration? Try one of these...</p>
      )}{" "}
      <div className="flex flex-wrap items-center gap-5 justify-center">
        {data
          ? Object.keys(data).map((d: string) => (
              <QueryButton
                onClick={() => mutate(data[d])}
                key={d}
                color={"green"}
                iconRight="chevronRight"
              >
                {data[d]}
              </QueryButton>
            ))
          : outfitQueries.map((d) => (
              <QueryButton
                onClick={() => mutate(d)}
                key={d}
                color={"green"}
                iconRight="chevronRight"
              >
                {d}
              </QueryButton>
            ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
