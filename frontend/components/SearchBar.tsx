"use client";
import React from "react";
import { Icons } from "./Icons";
import { useFormik } from "formik";
import { searchData } from "@/api/api";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const SearchBar = (props: Props) => {
  const SearchIcon = Icons["search"];
  const { data, mutate } = useMutation({
    mutationFn: searchData,
    mutationKey: ["searchResults"],
  });

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: async ({ query }) => {
      try {
        console.log(query);
        mutate(query);
        // let result = await searchData(query);
      } catch (error) {}
    },
  });

  console.log(data);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative w-[1000px] max-w-full rounded-full pl-5 pr-12 py-5 bg-white border-2 border-main-blue focus-within:shadow-blue transition-all"
    >
      <input
        name="query"
        onChange={formik.handleChange}
        className="w-full text-lg  placeholder:text-slate-300 font-light focus:outline-none"
        type="text"
        placeholder="What are you looking for?"
      />
      <button
        type="submit"
        className="text-main-blue absolute top-1/2 -translate-y-1/2 right-5"
      >
        <SearchIcon size={30} />
      </button>
    </form>
  );
};

export default SearchBar;
