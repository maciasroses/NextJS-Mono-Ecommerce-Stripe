"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components";
import { login } from "@/app/services/user/controller";
import type { ILoginState } from "@/app/interfaces";

const Form = ({ lng }: { lng: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState: ILoginState = {
    message: "",
    errors: {},
  };
  const [error, action] = useFormState(login, initialState);
  const { errors } = error ?? {};

  const handleChangeIsSearching = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className=" text-6xl">Log in</h1>
        {error?.message && <p className="text-red-600">{error?.message}</p>}
      </div>
      <form action={action}>
        <fieldset disabled={isSubmitting}>
          <div className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="email@test.com"
                className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                  errors?.email
                    ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors?.email && (
                <small className="text-red-600">{errors?.email}</small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                  errors?.password
                    ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {errors?.password && (
                <small className="text-red-600">{errors?.password}</small>
              )}
            </div>
          </div>
          <input hidden name="lang" defaultValue={lng} />
          <div className="text-center mt-4">
            <SubmitButton
              title="Log in"
              handleChangeIsSearching={handleChangeIsSearching}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Form;
