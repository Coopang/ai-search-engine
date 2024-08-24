"use client";

import React from "react";
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";
import QueryBuilder from "./QueryBuilder";
import SearchResults from "./SearchResults";
import { useMutation } from "@tanstack/react-query";
import { searchData } from "@/api/api";

type Props = {};

const Search = (props: Props) => {
  const { data, mutate, isError, isPending } = useMutation({
    mutationFn: searchData,
    mutationKey: ["searchResults"],
  });
  return (
    <div className="flex flex-col items-center space-y-20 my-20 container m-auto">
      <SearchBar onSubmit={mutate} />
      <SearchSuggestions data={data?.data?.results} />
      <SearchResults data={data} isPending={isPending} />
      <QueryBuilder />
    </div>
  );
};

export default Search;
