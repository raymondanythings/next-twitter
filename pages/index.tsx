import { Fav, Tweet as TweetType, User } from "@prisma/client";
import Tweet from "components/Tweet";
import HomeLayout from "layout/HomeLayout";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { Response } from "types/common";

interface Tweets extends TweetType {
  user: User;
  Fav: Fav[];
}
interface GetTweets extends Response {
  result: Tweets[];
}

function Home() {
  const { data, error, mutate } = useSWR<GetTweets>("/api/tweet/all");
  const loading = !data && !error;
  return (
    <HomeLayout path="/">
      <Head>
        <title>Home / Twitter</title>
      </Head>
      {loading ? (
        <>Loading...</>
      ) : (
        data && (
          <section className="flex flex-col divide-y-2 pb-[50px] divide-borderColor">
            {data.result.map((item) => {
              const tweet = { ...item, isLike: !!item.Fav.length };
              return <Tweet mutate={mutate} tweet={tweet} key={item.id} />;
            })}
          </section>
        )
      )}
    </HomeLayout>
  );
}

export default Home;
