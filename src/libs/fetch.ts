import { z, ZodError } from "zod";

const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

const postResponseSchema = z.array(postSchema);
type PostResponse = z.infer<typeof postResponseSchema>;

const fetchPosts = async (): Promise<PostResponse> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const jsonPosts = await response.json();

    const posts = postResponseSchema.parse(jsonPosts);
    // const Posts: {
    //   id: number;
    //   userId: number;
    //   title: string;
    //   body: boolean;
    // }[]

    return posts;
  } catch (e) {
    if (e instanceof ZodError) {
      // handle validation error
    }
    throw e;
  }
};
