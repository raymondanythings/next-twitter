import axios from "axios";
import useUser from "hook/useUser";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
interface TextAreaProp {
  content: string;
}
const Compose = () => {
  const { user, isLoading } = useUser({
    redirectTo: "/create-account",
  });
  const { register, handleSubmit } = useForm<TextAreaProp>();

  const onValid = async (data: TextAreaProp) => {
    const res = await axios.post("/api/tweet/compose", data);
    if (res.data.ok) {
      Router.push("/");
    }
  };

  const resize = (obj: KeyboardEvent<HTMLTextAreaElement>) => {
    obj.currentTarget.style.height = "1px";
    obj.currentTarget.style.height = 12 + obj.currentTarget.scrollHeight + "px";
  };
  return isLoading ? (
    <>Loading...</>
  ) : (
    <form onSubmit={handleSubmit(onValid)}>
      <header className="h-[50px] flex items-center justify-between px-[15px]">
        <Link href="/">
          <a>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5 text-[rgb(239, 243, 244)]"
              fill="currentColor"
            >
              <g>
                <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
              </g>
            </svg>
          </a>
        </Link>
        <button className="flex items-center text-sm font-bold p-1.5 px-4  bg-tSky rounded-full">
          Tweet
        </button>
      </header>
      <div className="px-[15px] py-[4px] flex">
        <div className="mr-[11px] pt-2">
          {user?.logo ? (
            <div className="w-[46px] h-[46px] rounded-full overflow-hidden relative">
              <Image
                src={`/images/${user.logo}.png`}
                alt="logo"
                layout="fill"
              />
            </div>
          ) : (
            <div className="w-[46px] h-[46px] rounded-full bg-tSky" />
          )}
        </div>
        <div className="grow flex flex-col text-[19px]">
          <textarea
            onKeyDown={resize}
            autoComplete="on"
            autoCapitalize="sentences"
            placeholder="What's happening?"
            spellCheck
            dir="auto"
            autoFocus
            autoCorrect="on"
            className="p-[11px] text-inherit min-h-[114px] max-h-[252px] bg-transparent resize-none grow focus:outline-none"
            {...register("content", { required: true })}
          />
          <div className="w-full h-[50px] border-b-boderColor border-b"></div>
        </div>
      </div>
    </form>
  );
};

export default Compose;
