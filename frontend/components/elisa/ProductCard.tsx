import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { TiThumbsDown, TiThumbsUp } from "react-icons/ti";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const ProductCard = ({ image, title, description, price }: any) => {
  console.log(image);

  return (
    <Card className=" border-none shadow-blueFaint overflow-hidden">
      <div className="relative w-full h-0 pb-[100%] ">
        <Image
          src={image}
          width={200}
          height={200}
          alt="Picture of the author"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {/* <CardDescription className="text-lg">
          Description of the product
        </CardDescription> */}
        <CardDescription className="text-2xl font-bold text-[#51A3D9]">
          ₩{price?.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <Badge className="bg-[#E9F1D8] text-[#6D8C29] text-sm">80% MATCH</Badge>
        <div className="flex gap-1">
          <Badge className="bg-[#51A3D9] text-white p-1.5">
            <FaRegThumbsUp />
          </Badge>
          <Badge className="bg-[#D73328] text-white p-1.5">
            <FaRegThumbsDown />
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
