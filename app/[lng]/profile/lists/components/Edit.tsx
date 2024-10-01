"use client";

import { cn } from "@/app/utils/cn";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useModal, useResolvedTheme } from "@/app/hooks";
import { Toast, Modal, GenericInput, SubmitButton } from "@/app/components";
import { updateExistingCustomList } from "@/app/services/customList/controller";
import type { ICustomListState } from "@/app/interfaces";

interface IEdit {
  lng: string;
  customList: {
    id: string;
    name: string;
    description: string | null;
  };
  handleClose: () => void;
}

const Edit = ({ lng, customList, handleClose }: IEdit) => {
  const theme = useResolvedTheme();
  const { isOpen, onOpen } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(lng, "profile");
  const {
    actions: {
      edit: {
        action: actionBtn,
        title: actionTitle,
        name: nameInput,
        namePlaceholder: nameInputPlaceholder,
        description: descriptionInput,
        descriptionPlaceholder: descriptionInputPlaceholder,
      },
    },
  } = JSON.parse(t("lists"));

  const initialState: ICustomListState = {
    message: "",
    errors: {},
  };
  const [error, action] = useFormState(updateExistingCustomList, initialState);
  const { errors } = error ?? {};

  useEffect(() => {
    if (error && error.message === "OK") {
      Toast({
        theme,
        type: "success",
        message:
          lng === "en"
            ? "List updated successfully"
            : "Lista actualizada con éxito",
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, handleClose]);

  const handleChangeIsSubmitting = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <button
        className="block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onOpen}
      >
        {actionBtn}
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} isForSideBar={false}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-4xl">{actionTitle}</h1>
            {error?.message && error?.message !== "OK" && (
              <p className="text-red-600">{error?.message}</p>
            )}
          </div>
          <form action={action} className="px-4">
            <fieldset
              disabled={isSubmitting}
              className={cn(isSubmitting && "opacity-50")}
            >
              <div className="flex flex-col gap-2">
                <GenericInput
                  id="name"
                  ariaLabel={nameInput}
                  type="text"
                  placeholder={nameInputPlaceholder}
                  error={errors?.name}
                  defaultValue={customList.name}
                  autoComplete="off"
                />
                <GenericInput
                  id="description"
                  ariaLabel={descriptionInput}
                  type="text"
                  placeholder={descriptionInputPlaceholder}
                  autoComplete="off"
                  defaultValue={customList.description ?? ""}
                />
              </div>
              <input hidden name="id" defaultValue={customList.id} />
              <div className="text-center mt-4 w-full">
                <SubmitButton
                  title={actionBtn}
                  handleChangeIsSearching={handleChangeIsSubmitting}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Edit;
