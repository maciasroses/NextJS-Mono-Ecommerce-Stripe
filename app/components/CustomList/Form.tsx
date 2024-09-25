"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import DefaultPhoto from "@/public/photo.webp";
import { useResolvedTheme } from "@/app/hooks";
import { GenericInput, SubmitButton } from "../Form";
import { Heart, LeftArrow, Plus } from "@/public/icons";
import {
  addProductToManyCustomLists,
  createNewCustomList,
} from "@/app/services/customList/controller";
import type {
  IAddProductToCustomList,
  ICustomList,
  ICustomListState,
} from "@/app/interfaces";
import { cn } from "@/app/utils/cn";

interface IForm {
  myLists: ICustomList[];
  productId: string;
  handleClose: () => void;
}

const Form = ({ myLists, productId, handleClose }: IForm) => {
  const theme = useResolvedTheme();
  const [newListForm, setNewListForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState: ICustomListState = {
    message: "",
    errors: {},
  };
  const [error, action] = useFormState(createNewCustomList, initialState);
  const { errors } = error ?? {};

  const initialAddProductState: IAddProductToCustomList = {
    message: "",
    errors: {} as IAddProductToCustomList["errors"],
  };

  const [addProductError, addProductAction] = useFormState(
    addProductToManyCustomLists,
    initialAddProductState
  );
  const { errors: addProductErrors } = addProductError ?? {};

  useEffect(() => {
    if (error && error.message === "OK") {
      toast.success("List created and product added to it successfully", {
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
        theme: theme === "dark" ? "dark" : "light",
      });
      handleClose();
    }
    if (addProductError && addProductError.message === "OK") {
      toast.success("Product added to list(s)", {
        transition: Slide,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
        theme: theme === "dark" ? "dark" : "light",
      });
      handleClose();
    }
  }, [error, addProductError, handleClose, theme]);

  const handleChageView = () => {
    setNewListForm(!newListForm);
  };

  const handleChangeIsSubmitting = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      {newListForm ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handleChageView}
                disabled={isSubmitting}
                className={cn(
                  "text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400",
                  isSubmitting && "opacity-50"
                )}
              >
                <LeftArrow size="size-6 md:size-8" />
              </button>
              <h1 className="text-xl md:text-4xl">Create new list</h1>
            </div>
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
                />
                <GenericInput
                  id="description"
                  ariaLabel="Description (Optional)"
                  type="text"
                  placeholder="This is my favorite list"
                />
              </div>
              <input hidden name="productId" defaultValue={productId} />
              <div className="text-center mt-4 w-full">
                <SubmitButton
                  title="Create"
                  handleChangeIsSearching={handleChangeIsSubmitting}
                />
              </div>
            </fieldset>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-4xl">Add to list</h1>
            {addProductError?.message && addProductError?.message !== "OK" && (
              <p className="text-red-600 dark:text-red-300">
                {addProductError?.message}
              </p>
            )}
            {addProductErrors && addProductErrors[0]?.customListId && (
              <p className="text-red-600 dark:text-red-300">
                {addProductErrors[0]?.customListId}
              </p>
            )}
          </div>
          <div className="flex flex-col px-4">
            <button
              onClick={handleChageView}
              disabled={isSubmitting}
              className={cn(
                "flex items-center group gap-2 text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 mb-2",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              <Plus
                size="size-10"
                customClass="border border-blue-600 dark:border-blue-300 group-hover:border-blue-700 dark:group-hover:border-blue-400 rounded-md p-1"
              />
              <span>Create new list</span>
            </button>
            <form action={addProductAction}>
              <fieldset
                disabled={isSubmitting}
                className={cn(isSubmitting && "opacity-50")}
              >
                <div className="max-h-[169px] overflow-y-auto">
                  {myLists.map((list) => (
                    <label
                      key={list.id}
                      htmlFor={list.id}
                      className={cn(
                        "flex justify-between items-center gap-2 mb-2",
                        isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="size-10 border border-gray-200 p-1 rounded-md">
                          {list.name.toLowerCase() === "favorites" ||
                          list.name.toLowerCase() === "favorite" ||
                          list.name.toLowerCase() === "favourites" ||
                          list.name.toLowerCase() === "favourite" ? (
                            <div className="size-full flex items-center justify-center">
                              <Heart isFilled />
                            </div>
                          ) : (
                            <Image
                              src={
                                list.products[0]?.product.files[0].url ??
                                DefaultPhoto
                              }
                              alt="Main list image"
                              width={50}
                              height={50}
                              className="size-full object-contain"
                            />
                          )}
                        </div>
                        {list.name}
                      </div>
                      <input
                        id={list.id}
                        type="checkbox"
                        name="customListId"
                        value={list.id}
                        aria-label={list.name}
                        className="size-4"
                      />
                    </label>
                  ))}
                </div>
                <input hidden name="productId" defaultValue={productId} />
                <div className="text-center mt-4">
                  <SubmitButton
                    title="Add"
                    handleChangeIsSearching={handleChangeIsSubmitting}
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
