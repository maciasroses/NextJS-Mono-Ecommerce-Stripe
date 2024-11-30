"use client";

import Image from "next/image";
import { useFormState } from "react-dom";
import { cn } from "@/app/shared/utils/cn";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useResolvedTheme } from "@/app/shared/hooks";
import { Heart, LeftArrow, Plus, Photo } from "@/app/shared/icons";
import { Toast, GenericInput, SubmitButton } from "@/app/shared/components";
import {
  createNewCustomList,
  addProductToManyCustomLists,
} from "@/app/shared/services/customList/controller";
import type {
  IAddProductToCustomList,
  ICustomList,
  ICustomListState,
} from "@/app/shared/interfaces";

interface IForm {
  lng: string;
  myLists: ICustomList[];
  productId: string;
  handleClose: () => void;
}

const Form = ({ lng, myLists, productId, handleClose }: IForm) => {
  const theme = useResolvedTheme();
  const [newListForm, setNewListForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(lng, "customList");
  const {
    title: newListTitle,
    nameInput: nameListInputLabel,
    namePlaceholder: nameListPlaceholder,
    descriptionInput: descriptionListInput,
    descriptionPlaceholder: descriptionListPlaceholder,
    createBtn: createListBtn,
  } = JSON.parse(t("newList"));
  const {
    title: addToListTitle,
    newListBtn,
    addBtn,
  } = JSON.parse(t("addToList"));

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
      Toast({
        theme,
        type: "success",
        message:
          lng === "en"
            ? "List created and product added to it successfully"
            : "Lista creada y producto añadido a ella con éxito",
      });
      handleClose();
    }
    if (addProductError && addProductError.message === "OK") {
      Toast({
        theme,
        type: "success",
        message:
          lng === "en"
            ? "Product added to list(s) successfully"
            : "Producto añadido a la(s) lista(s) con éxito",
      });
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, addProductError, handleClose]);

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
              <h1 className="text-xl md:text-4xl">{newListTitle}</h1>
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
                  ariaLabel={nameListInputLabel}
                  type="text"
                  placeholder={nameListPlaceholder}
                  error={errors?.name}
                />
                <GenericInput
                  id="description"
                  ariaLabel={descriptionListInput}
                  type="text"
                  placeholder={descriptionListPlaceholder}
                />
              </div>
              <input hidden name="productId" defaultValue={productId} />
              <div className="text-center mt-4 w-full">
                <SubmitButton
                  title={createListBtn}
                  handleChangeIsSearching={handleChangeIsSubmitting}
                />
              </div>
            </fieldset>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-4xl">{addToListTitle}</h1>
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
              <span>{newListBtn}</span>
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
                          ) : list.products[0]?.product.files[0] ? (
                            <Image
                              src={list.products[0]?.product.files[0].url}
                              alt="Main list image"
                              width={50}
                              height={50}
                              className="size-full object-contain"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center">
                              <Photo />
                            </div>
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
                    title={addBtn}
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
