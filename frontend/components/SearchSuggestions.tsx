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

const SearchSuggestions = ({ data, mutate }: any) => {
  console.log(data ? Object.keys(data) : null);
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
                onClick={() => mutate(d)}
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
