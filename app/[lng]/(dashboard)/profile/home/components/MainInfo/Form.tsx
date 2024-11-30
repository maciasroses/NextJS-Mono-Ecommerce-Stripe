"use client";

import { cn } from "@/app/shared/utils/cn";
import { useFormState } from "react-dom";
import { ReactNode, useEffect, useState } from "react";
import { GenericInput, Toast } from "@/app/shared/components";
import { useAuth, useResolvedTheme } from "@/app/shared/hooks";
import { PencilIcon, Check, XMark } from "@/app/shared/icons";
import { updateMyMainInfo } from "@/app/shared/services/user/controller";
import type { IUpdateMyMainInfo } from "@/app/shared/interfaces";

const Form = ({ lng }: { lng: string }) => {
  const { user } = useAuth();
  const theme = useResolvedTheme();
  const [isEditing, setIsEditing] = useState(false);

  const initialState: IUpdateMyMainInfo = {
    message: {
      en: "",
      es: "",
    },
    errors: {},
  };
  const [error, action] = useFormState(updateMyMainInfo, initialState);
  const { errors } = error ?? {};

  useEffect(() => {
    if (error && (error.message as Record<string, string>)[lng] === "OK") {
      Toast({
        theme,
        type: "success",
        message:
          lng === "en"
            ? "User updated successfully"
            : "Usuario actualizado con éxito",
      });
      handleEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <>
          <form action={action}>
            <CustomBtn icon={<Check />} isEditing={isEditing} />
            <CustomBtn icon={<XMark />} isCancelAction onClick={handleEdit} />
            <div className="flex flex-col gap-2">
              <GenericInput
                type="text"
                id="username"
                ariaLabel="Username"
                placeholder="user123"
                defaultValue={user?.username}
                error={errors?.username}
              />
              <GenericInput
                type="email"
                id="email"
                ariaLabel="Email"
                placeholder="user@mail.com"
                defaultValue={user?.email}
                error={errors?.email}
              />
              {error?.message &&
                (error?.message as Record<string, string>)[lng] !== "OK" && (
                  <p className="text-red-600 dark:text-red-300">
                    {(error?.message as Record<string, string>)[lng]}
                  </p>
                )}
            </div>
          </form>
        </>
      ) : (
        <>
          <CustomBtn
            icon={<PencilIcon />}
            isEditing={isEditing}
            onClick={handleEdit}
          />
          <h3 className="mb-1 mt-3 text-lg font-semibold">{user?.username}</h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {user?.email}
          </p>
        </>
      )}
    </>
  );
};

export default Form;

interface ICustomBtn {
  icon: ReactNode;
  isEditing?: boolean;
  onClick?: () => void;
  isCancelAction?: boolean;
}

const CustomBtn = ({
  icon,
  isEditing,
  onClick,
  isCancelAction,
}: ICustomBtn) => {
  return (
    <button
      onClick={onClick}
      type={isEditing ? "submit" : "button"}
      className={cn(
        "absolute top-0 hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-full",
        isEditing
          ? "text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-400 border border-transparent hover:border-green-700 dark:hover:border-green-400 right-14"
          : isCancelAction
          ? "text-red-600 dark:text-red-300 hover:text-red-700 dark:hover:text-red-400 border border-transparent hover:border-red-700 dark:hover:border-red-400 right-5"
          : "text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 border border-transparent hover:border-blue-700 dark:hover:border-blue-400 right-5"
      )}
    >
      {icon}
    </button>
  );
};
