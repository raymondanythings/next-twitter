import useUser from "hook/useUser";
import { useRouter } from "next/router";
import React from "react";

function Home() {
  const router = useRouter();
  const { user, isError, isLoading } = useUser();
  console.log(user);
  return <div>HOME</div>;
}

export default Home;
