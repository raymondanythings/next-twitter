import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { AlertContext } from "../reducer/AlertProvider";
interface LoginDto {
  email: string;
  password: string;
}
function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm<LoginDto>();
  const { alertMessage } = useContext(AlertContext);
  const onValid = async (data: LoginDto) => {
    try {
      const result = await axios.post<{ ok: boolean; user: User }>(
        "/api/users/create",
        data
      );
      if (result.data.ok) {
        await axios.post("/api/users/login", data);
        router.push("/user/name");
        return;
      }
    } catch (err: any) {
      console.log(err);
      errorsAlert(err.response.data.message);
    }
  };
  const errorsAlert = useCallback(
    (message: string) => {
      alertMessage(message);
    },
    [alertMessage]
  );
  const validate = () => {
    const data = getValues();
    if (data.email === "") {
      errorsAlert("이메일을 입력하세요.");
      return;
    }
    if (data.password === "") {
      errorsAlert("비밀번호를 입력하세요.");
      return;
    }
  };
  return (
    <div>
      <form
        className="flex flex-col space-y-[19px]"
        onSubmit={handleSubmit(onValid)}
      >
        <input className="input" {...register("email")} placeholder="이메일" />
        <input
          className="input"
          type="password"
          {...register("password", {
            required: "필수입력",
          })}
          placeholder="패스워드"
        />
        <div className="flex">
          <button
            onClick={validate}
            className="bg-tSky text-tWhite font-bold input grow"
          >
            가입하기
          </button>
        </div>
        <div className="flex items-center relative -top-3">
          <div className="flex-1 mx-[4px] flex flex-col">
            <div className="bg-[rgb(47,51,54)] h-[1px]"></div>
          </div>
          <div className="mx-[4px] basis-auto">또는</div>
          <div className="flex-1 mx-[4px] flex flex-col">
            <div className="bg-[rgb(47,51,54)] h-[1px]"></div>
          </div>
        </div>
        <div className="relative -top-5 flex">
          <div
            onClick={() => router.push("/log-in")}
            className="bg-tSky text-tWhite font-bold input grow cursor-pointer flex justify-center items-center"
          >
            로그인하기
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
