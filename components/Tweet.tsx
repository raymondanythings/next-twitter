import { Tweet as TweetType, User } from "@prisma/client";
import axios from "axios";
import { timeForToday } from "lib/client/fn";
import Image from "next/image";
import Router from "next/router";
import React from "react";
import { KeyedMutator } from "swr";

interface TweetWithUser extends TweetType {
  user: User;
  isLike: boolean;
}

interface TweetProps {
  tweet: TweetWithUser;
  mutate?: KeyedMutator<any>;
}

const Tweet = ({ tweet, mutate }: TweetProps) => {
  const timeStamp = timeForToday(tweet.updatedAt);
  const goTweetDetail = () => {
    Router.push(`/tweet/${tweet.id}`);
  };

  const toggleLike = async () => {
    await axios.post(`/api/tweet/${tweet.id}/fav`);
    mutate && mutate();
  };
  return (
    <div className="px-4 py-3">
      <div className="flex relative">
        <div className="w-[48px] mr-3 flex flex-col items-center">
          {tweet.user.logo !== undefined ? (
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
        <div className="grow flex flex-col pr-4" onClick={goTweetDetail}>
          <div className="flex w-full justify-between items-center">
            <h1 className="font-bold text-lg">{tweet.user.name}</h1>
          </div>
          <p className="text-md">{tweet.content}</p>
        </div>
        <span className="text-xs text-borderColor">{timeStamp}</span>
        <div onClick={toggleLike}>
          <svg
            className="w-4 h-4 absolute right-0 bottom-0 duration-300"
            fill={`${tweet.isLike ? "red" : "transparent"}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
