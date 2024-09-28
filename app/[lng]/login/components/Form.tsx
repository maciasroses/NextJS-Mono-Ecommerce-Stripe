"use client";

import { useState } from "react";
import { cn } from "@/app/utils/cn";
import { useFormState } from "react-dom";
import { login } from "@/app/services/auth";
import { GenericInput, SubmitButton } from "@/app/components";
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
        {error?.message && (
          <p className="text-red-600 dark:text-red-300">{error?.message}</p>
        )}
      </div>
      <form action={action}>
        <fieldset
          disabled={isSubmitting}
          className={cn(isSubmitting && "opacity-50")}
        >
          <div className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col gap-2">
              <GenericInput
                type="email"
                id="email"
                autoComplete="email"
                placeholder="user@mail.com"
                ariaLabel="Email"
                error={errors?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <GenericInput
                type="password"
                id="password"
                placeholder="password"
                ariaLabel="Password"
                error={errors?.password}
              />
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
