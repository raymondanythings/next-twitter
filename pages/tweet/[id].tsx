import { useRouter } from "next/router";

function TweetDetail() {
  const router = useRouter();

  return <>{router.query.id}</>;
}

export default TweetDetail;
