"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border border-stone-300"
        defaultValue="test"
        {...register("example")}
      />
      <input
        className="border border-stone-300"
        {...register("exampleRequired", { required: true })}
      />
      {errors.exampleRequired && <span>This field is required</span>}
      <input className="border border-stone-300" type="submit" />
    </form>
  );
}
