"use client";

import Modal from "../Modal";
import { useState } from "react";
import { cn } from "@/app/utils/cn";
import { SubmitButton } from "../Form";
import { Slide, toast } from "react-toastify";
import { useModal, useResolvedTheme } from "@/app/hooks";
import { deleteExistingCustomList } from "@/app/services/customList/controller";

interface IDelete {
  customList: {
    id: string;
    name: string;
    description: string | null;
  };
  handleClose: () => void;
}

const Delete = ({ customList, handleClose }: IDelete) => {
  const theme = useResolvedTheme();
  const { isOpen, onOpen } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await deleteExistingCustomList(customList.id);
    if (response.message === "OK") {
      toast.success("List deleted successfully", {
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
        theme: theme === "dark" ? "dark" : "light",
      });
    } else {
      toast.error("Something went wrong", {
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
        theme: theme === "dark" ? "dark" : "light",
      });
    }
    handleClose();
  };

  const handleChangeIsSubmitting = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <button
        className="block w-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onOpen}
      >
        Delete
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} isForSideBar={false}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-4xl">Delete list</h1>
          </div>
          <form onSubmit={handleSubmit} className="px-4">
            <fieldset
              disabled={isSubmitting}
              className={cn("text-center", isSubmitting && "opacity-50")}
            >
              <h2 className="text-red-600 dark:text-red-300 text-xl">
                ⚠️ This action cannot be undone. ⚠️
              </h2>
              <p className="text-2xl">
                Are you sure you want to delete the list{" "}
                <span className="font-bold">{customList.name}</span>?
              </p>
              <div className="text-center mt-4 w-full">
                <SubmitButton
                  title="Delete"
                  color="red"
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

export default Delete;
