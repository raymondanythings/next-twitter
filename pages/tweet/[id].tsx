import Tweet from "components/Tweet";
import HomeLayout from "layout/HomeLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

function TweetDetail() {
  const router = useRouter();
  const { data, error, mutate } = useSWR(`/api/tweet/${router.query.id}`);
  const isLoading = !data && !error;
  return (
    <HomeLayout>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Tweet mutate={mutate} tweet={data.result} />
      )}
    </HomeLayout>
  );
}

export default TweetDetail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.query.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
