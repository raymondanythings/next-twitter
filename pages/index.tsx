import React from "react";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import TweetIcon from "../components/tweetIcon";

function Home() {
  return (
    <div>
      <div className="p-[19px] flex flex-col">
        <TweetIcon />
        <div className="text-tWhite -traking-[0.8px] font-bold leading-[49px] text-[38px] my-9">
          지금 일어나고 있는 일
        </div>
        <div className="mb-[19px] leading-[27px] text-2xl font-semibold">
          오늘 트위터에 가입하세요.
        </div>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
