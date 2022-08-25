import { Tweet as TweetType, User } from "@prisma/client";
import { timeForToday } from "lib/client/fn";
import Image from "next/image";
import React from "react";

interface TweetWithUser extends TweetType {
  user: User;
}

interface TweetProps {
  tweet: TweetWithUser;
}

const Tweet = ({ tweet }: TweetProps) => {
  const timeStamp = timeForToday(tweet.updatedAt);

  return (
    <div className="px-4 flex py-3">
      <div className="w-[48px] mr-3 flex flex-col items-center">
        {tweet.user.logo ? (
          <div className="w-12 h-12 rounded-full relative">
            <Image
              src={`/images/${tweet.user.logo}.png`}
              alt="icon"
              layout="fill"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full relative bg-tSky" />
        )}
      </div>
      <div className="grow flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-lg">{tweet.user.name}</h1>
          <span className="text-xs text-borderColor">{timeStamp}</span>
        </div>
        <p className="text-md">{tweet.content}</p>
      </div>
    </div>
  );
};

export default Tweet;
