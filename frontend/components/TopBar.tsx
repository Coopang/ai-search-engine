import { images } from "@/util/images";
import Image from "next/image";
import React from "react";
import { Icons } from "./Icons";

type Props = {};

const TopBar = (props: Props) => {
  const UserProfile = Icons["userProfile"];
  const Cart = Icons["cart"];
  return (
    <nav className="container m-auto py-5 flex justify-between">
      <Image
        src={images.logo}
        width={216}
        height={94}
        alt="AiSearch Logo"
      />
      <div className="flex justify-center items-center gap-3">
        <Cart size={30} />
        <UserProfile size={30} />
      </div>
    </nav>
  );
};

export default TopBar;
