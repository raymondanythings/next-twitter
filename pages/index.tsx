import HomeLayout from "layout/HomeLayout";
import Head from "next/head";
import React from "react";
import useSWR from "swr";

function Home() {
  const { data } = useSWR("/api/tweet/all");
  console.log(data);
  return (
    <HomeLayout path="/">
      <Head>
        <title>Home / Twitter</title>
      </Head>
      HOME
    </HomeLayout>
  );
}

export default Home;
