"use client";

import Modal from "../Modal";
import { cn } from "@/app/utils/cn";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { GenericInput, SubmitButton } from "../Form";
import { useModal, useResolvedTheme } from "@/app/hooks";
import { updateExistingCustomList } from "@/app/services/customList/controller";
import type { ICustomListState } from "@/app/interfaces";

interface IEdit {
  customList: {
    id: string;
    name: string;
    description: string | null;
  };
  handleClose: () => void;
}

const Edit = ({ customList, handleClose }: IEdit) => {
  const theme = useResolvedTheme();
  const { isOpen, onOpen } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState: ICustomListState = {
    message: "",
    errors: {},
  };
  const [error, action] = useFormState(updateExistingCustomList, initialState);
  const { errors } = error ?? {};

  useEffect(() => {
    if (error && error.message === "OK") {
      toast.success("List updated successfully", {
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
        theme: theme === "dark" ? "dark" : "light",
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChangeIsSubmitting = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <button
        className="block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onOpen}
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} isForSideBar={false}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-4xl">Edit list</h1>
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
                  ariaLabel="Name"
                  type="text"
                  placeholder="Favorites"
                  error={errors?.name}
                  defaultValue={customList.name}
                />
                <GenericInput
                  id="description"
                  ariaLabel="Description (Optional)"
                  type="text"
                  placeholder="This is my favorite list"
                  defaultValue={customList.description ?? ""}
                />
              </div>
              <input hidden name="id" defaultValue={customList.id} />
              <div className="text-center mt-4 w-full">
                <SubmitButton
                  title="Edit"
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
