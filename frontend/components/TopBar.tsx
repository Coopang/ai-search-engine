import { images } from "@/util/images";
import Image from "next/image";
import React from "react";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <nav className="container m-auto py-5">
      <Image src={images.logo} width={216} height={94} alt="AiSearch Logo" />
    </nav>
  );
};

export default TopBar;
