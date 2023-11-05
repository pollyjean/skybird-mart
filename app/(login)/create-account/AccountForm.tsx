"use client";

import useMutation from "@/libs/client/useMutation";
import { AccountFormValues } from "@/libs/constants";
import { SubmitHandler, useForm } from "react-hook-form";

const AccountForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormValues>({ mode: "onChange" });
  const [mutate, { loading, data, error }] =
    useMutation<AccountFormValues>("/api/users/account");
  const onSubmit: SubmitHandler<AccountFormValues> = (formData) => {
    if (formData && formData.password !== formData.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "Enter the same password" },
        { shouldFocus: true },
      );
    } else {
      mutate(formData);
    }
  };
  if (error) console.error(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="relative flex flex-col gap-1">
        <label htmlFor="email" className="text-base-200 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="ex) youremail@domain.com"
          className="border-base-200 bg-base-950 rounded-md border p-3 text-sm placeholder:opacity-40"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter as an email",
            },
          })}
        />
        <p className="text-red absolute right-0 top-0 h-5 text-xs">
          {errors.email?.message && errors.email.message}
        </p>
      </div>

      <div className="relative flex flex-col gap-1">
        <label htmlFor="username" className="text-base-200 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="username"
          placeholder="At least 3 characters"
          className="border-base-200 bg-base-950 rounded-md border p-3 text-sm placeholder:opacity-40"
          {...register("username", {
            minLength: {
              value: 3,
              message: "Enter at least 3 characters",
            },
          })}
        />
        <p className="text-red absolute right-0 top-0 h-5 text-xs">
          {errors.username?.message && errors.username.message}
        </p>
      </div>

      <div className="relative flex flex-col gap-1">
        <label htmlFor="password" className="text-base-200 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="At least 3 characters"
          className="border-base-200 bg-base-950 rounded-md border p-3 text-sm placeholder:opacity-40"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Enter at least 3 characters",
            },
          })}
        />
        <p className="text-red absolute right-0 top-0 h-5 text-xs">
          {errors.password?.message && errors.password.message}
        </p>
      </div>

      <div className="relative flex flex-col gap-1">
        <label
          htmlFor="passwordConfirm"
          className="text-base-200 text-sm font-medium"
        >
          Password Confirm
        </label>
        <input
          type="password"
          id="passwordConfirm"
          placeholder="Enter your password again"
          className="border-base-200 bg-base-950 rounded-md border p-3 text-sm placeholder:opacity-40"
          {...register("passwordConfirm", { required: "Enter Password Again" })}
        />
        <p className="text-red absolute right-0 top-0 h-5 text-xs">
          {errors.passwordConfirm?.message && errors.passwordConfirm.message}
        </p>
      </div>
      <button type="submit">{loading ? "Loading..." : "Create Account"}</button>
    </form>
  );
};
export default AccountForm;
