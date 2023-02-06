import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
  hobby: z.string().transform((x) => Number(x)),
});

type Form = z.infer<typeof schema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <div>
        <input {...register("name")} />
        {errors && errors.name?.message}
      </div>
      <div>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors && errors.age?.message}
      </div>
      <div>
        <select {...register("hobby")}>
          <option value={1}>soccer</option>
          <option value={2}>baseball</option>
        </select>
        {errors && errors.hobby?.message}
      </div>
      <input type="submit" />
    </form>
  );
};
