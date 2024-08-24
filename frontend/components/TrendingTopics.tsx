import React from "react";
import QueryButton from "./QueryButton";

type Props = {};

const TrendingTopics = (props: Props) => {
  return (
    <section className="space-y-5 flex flex-col items-center">
      <p>
        What's trending in,{" "}
        <span className="font-bold text-main-red">Seoul?</span>
      </p>
      <div className="flex items-center gap-5 flex-wrap justify-center">
        <QueryButton color="blue" iconRight="trendingUp">
          Seoul Pride summer outfit
        </QueryButton>
        <QueryButton color="blue" iconRight="trendingUp">
          Coachella inspired cute look
        </QueryButton>
        <QueryButton color="blue" iconRight="trendingUp">
          Kpop style outfit
        </QueryButton>
      </div>
    </section>
  );
};

export default TrendingTopics;
