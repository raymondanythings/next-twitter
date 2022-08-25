import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Response } from "types/common";
import { User } from "@prisma/client";

interface UserResponse extends Response {
  user?: User;
  message?: string;
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const router = useRouter();
  const {
    data: res,
    mutate: mutateUser,
    error,
  } = useSWR<UserResponse>("/api/users/me");
  const user = res?.user;
  useEffect(() => {
    if (!redirectTo || !res) return;

    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectTo && redirectIfFound && user)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, router, res]);
  return { user, mutateUser, isLoading: !error && !res, isError: error };
}
