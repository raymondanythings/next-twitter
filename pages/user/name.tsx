import axios from "axios";
import MuiInput from "components/MuiInput";
import TweetIcon from "components/tweetIcon";
import useUser from "hook/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export interface NameProps {
  name: string;
}

function Name() {
  const [imageNum, setImageNum] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoading, mutateUser, user } = useUser({
    redirectTo: "/",
  });

  const { control, handleSubmit, setError } = useForm<NameProps>();

  const onValid = async (data: NameProps) => {
    const form = { ...data, logo: imageNum };
    try {
      const result = await axios.post("/api/users/update", form);
      if (result.data.ok) {
        mutateUser();
        router.push("/");
        return;
      }
      throw new Error("알수없는 오류 입니다.");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError("name", {
          type: "pattern",
          message: err.response?.data?.message,
        });
        return;
      }
    }
  };
  useEffect(() => {
    if (user?.name) {
      router.push("/");
    }
  });
  return isLoading ? (
    <>Loading...</>
  ) : (
    <div className="p-[15px]">
      <div className="flex items-center">
        <Link href="/create-account">
          <a className="basis-1/2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-[19px] h-[19px]"
              style={{ color: "rgb(239, 243, 244)" }}
              fill="currentColor"
            >
              <g>
                <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
              </g>
            </svg>
          </a>
        </Link>
        <TweetIcon size="small" />
        <div className="basis-1/2"></div>
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-[15px]">
          <div>
            <div className="my-[19px] mx-auto w-fit">
              <h1 className="leading-[30px] text-[25px] font-bold">
                프로필 설정
              </h1>
            </div>
            <div className="w-fit mx-auto my-10 relative flex justify-center">
              {imageNum !== null ? (
                <div
                  className="w-[68px] h-[68px] rounded-full relative overflow-hidden"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <Image
                    src={`/images/${imageNum}.png`}
                    alt="icon"
                    layout="fill"
                  />
                </div>
              ) : (
                <div
                  className="w-[68px] h-[68px] rounded-full relative bg-tSky"
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              )}
              <div
                className={`absolute top-full w-[70vw] backdrop-blur-md bg-transparent z-50  p-4  rounded-md ${
                  isOpen ? "scale-100" : "scale-0"
                } duration-150 origin-top`}
              >
                <div className="grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div key={num} className="flex justify-center grow">
                      <div
                        className="relative w-12 h-12 "
                        onClick={() => setImageNum(num)}
                      >
                        <Image
                          src={`/images/${num}.png`}
                          alt="icon"
                          layout="fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="mx-auto outline-tWhite my-[23px] rounded-full py-2 px-[30px] text-center cursor-pointer bg-[rgb(239,243,244)] border-black border text-[rgb(15,20,25)] font-bold leading-[19px] duration-150"
                  >
                    확인
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <MuiInput
                label="이름"
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col fixed bottom-0 left-0 px-[30px] w-full">
          <button className="focus:outline-tWhite my-[23px] rounded-full px-[30px] grow text-center bg-tSky hover:bg-[rgb(239,243,244)] border-black border min-h-[49px] text-tWhite hover:text-[rgb(15,20,25)] font-bold leading-[19px] duration-150">
            시작하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Name;
