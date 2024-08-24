"use client";

import QueryButton from "./QueryButton";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { getTrends } from "@/api/api";

interface TrendingData {
  rank1: string;
  rank2: string;
  rank3: string;
}

const TrendingTopics = () => {
  const { data, isLoading, error, refetch } = useQuery<TrendingData>({
    queryKey: ["trendingData"],
    queryFn: async () => {
      const response = await getTrends();
      return response.data;
    },
    refetchInterval: 30000,
  });

  console.log(useIsFetching);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading trends.</p>;

  return (
    <section className="space-y-5 flex flex-col items-center">
      <p
        className="text-main-wine
      "
      >
        What's trending in,
        <span className="font-bold text-main-red">Seoul?</span>
      </p>
      <div className="flex items-center gap-5 flex-wrap justify-center">
        <QueryButton
          color="blue"
          iconRight="trendingUp"
        >
          {data?.rank1}
        </QueryButton>
        <QueryButton
          color="blue"
          iconRight="trendingUp"
        >
          {data?.rank2}
        </QueryButton>
        <QueryButton
          color="blue"
          iconRight="trendingUp"
        >
          {data?.rank3}
        </QueryButton>
      </div>
    </section>
  );
};

export default TrendingTopics;
