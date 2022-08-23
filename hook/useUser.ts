import useSWR from "swr";

function useUser() {
  const { data, error } = useSWR("/api/users/getOne");
  return {
    user: data?.user,
    isLoading: !error && !data?.user,
    isError: error,
  };
}

export default useUser;
