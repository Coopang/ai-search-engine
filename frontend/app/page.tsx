"use client";
import ProductCard from "@/components/elisa/ProductCard";
import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

export default function Home() {
  const state = useMutationState({
    filters: { mutationKey: ["searchResults"] },
  });

  const data = state[state?.length - 1];
  console.log(data);
  return (
    <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 ">
      {data && data?.data?.data?.items?.length > 0
        ? data?.data?.data?.items?.map((d: any, i: number) => (
            <ProductCard key={d?.title + d?.id} />
          ))
        : null}
    </div>
  );
}
