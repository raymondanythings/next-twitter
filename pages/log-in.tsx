import axios from "axios";
import MuiInput from "components/MuiInput";
import TweetIcon from "components/tweetIcon";
import useUser from "hook/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const { isLoading, mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: "/",
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onValid = async (data: LoginProps) => {
    try {
      const result = await axios.post("/api/users/login", data);
      if (result.data.ok) {
        mutateUser({ ok: true, user: result.data.user });
        router.push("/");
        return;
      }
      throw new Error("알수없는 오류 입니다.");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError("email", {
          type: "pattern",
          message: err.response?.data?.message,
        });
        return;
      }
      console.log(err);
    }
  };
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
            <div className="my-[19px]">
              <h1 className="leading-[30px] text-[25px] font-bold">
                {!errors.email && errors.password
                  ? "비밀번호를 입력하세요."
                  : errors.email?.message
                  ? errors.email?.message
                  : "이메일을 입력하세요."}
              </h1>
            </div>
            <div className="flex flex-col space-y-6">
              <MuiInput
                label="이메일"
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                }}
              />
              <MuiInput
                label="비밀번호"
                type="password"
                control={control}
                name="password"
                rules={{ required: true }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col fixed bottom-0 left-0 px-[30px] w-full">
          <button className="focus:outline-tWhite my-[23px] rounded-full px-[30px] grow text-center bg-[rgb(239,243,244)] border-black border min-h-[49px] text-[rgb(15,20,25)] font-bold leading-[19px]">
            로그인하기
          </button>
          <div className="mb-[23px] text-[rgb(113,118,123)]">
            <span className="text-inherit">계정이 없으신가요? </span>
            <Link href="/create-account">
              <a className="text-tSky">가입하기</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
