import { Tweet as TweetType, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface TweetWithUser extends TweetType {
  user: User;
}

interface TweetProps {
  tweet: TweetWithUser;
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <div className="px-4 flex py-3">
      <div className="w-[48px] mr-3 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full relative">
          <Image src="/images/0.png" alt="icon" layout="fill" />
        </div>
      </div>
      <div className="grow flex flex-col">
        <h1>{tweet.user.name}</h1>
        <p> {tweet.content}</p>
      </div>
    </div>
  );
};

export default Tweet;
