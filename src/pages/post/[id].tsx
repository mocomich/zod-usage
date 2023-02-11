import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string(),
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const params = ctx.params;
  const checkParams = paramsSchema.safeParse(params);
  if (!checkParams.success) {
    return { notFound: true };
  }

  //データ取得処理

  return { props: data };
};

export default function PostDetail() {
  const router = useRouter();
  const query = router.query;
}
