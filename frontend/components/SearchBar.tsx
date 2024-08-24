import React from "react";
import { Icons } from "./Icons";

type Props = {};

const SearchBar = (props: Props) => {
  const SearchIcon = Icons["search"];
  return (
    <div className="relative w-[1000px] max-w-full rounded-full pl-5 pr-12 py-5 bg-white border-2 border-main-blue">
      <input
        className=" w-full text-lg  placeholder:text-slate-300 font-light focus:outline-none"
        type="text"
        placeholder="What are you looking for?"
      />
      <button
        type="submit"
        className="text-main-blue absolute top-1/2 -translate-y-1/2 right-5"
      >
        <SearchIcon size={30} />
      </button>
    </div>
  );
};

export default SearchBar;
