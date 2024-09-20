"use client";

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import {
  addProductToManyCustomLists,
  createNewCustomList,
} from "@/app/services/customList/controller";
import type {
  IAddProductToCustomList,
  ICustomList,
  ICustomListState,
} from "@/app/interfaces";
import { LeftArrow, Plus } from "@/public/icons";
import { GenericInput, SubmitButton } from "../Form";
import Image from "next/image";
import DefaultPhoto from "@/public/photo.webp";

interface IForm {
  myLists: ICustomList[];
  productId: string;
}

const Form = ({ myLists, productId }: IForm) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newListForm, setNewListForm] = useState(false);

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
      window.location.reload();
    }
    if (addProductError && addProductError.message === "OK") {
      window.location.reload();
    }
  }, [error, addProductError]);

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
                className="text-blue-500 hover:text-blue-600"
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
            <fieldset disabled={isSubmitting}>
              <div className="flex flex-col md:flex-row gap-2">
                <GenericInput
                  id="name"
                  ariaLabel="List name"
                  type="text"
                  placeholder="Favorites"
                  error={errors?.name}
                />
                <GenericInput
                  id="description"
                  ariaLabel="List description"
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
              <p className="text-red-600">{addProductError?.message}</p>
            )}
            {addProductErrors && addProductErrors[0]?.customListId && (
              <p className="text-red-600">
                {addProductErrors[0]?.customListId}
              </p>
            )}
          </div>
          <div className="flex flex-col px-4 max-h-[200px] overflow-y-auto">
            <button
              onClick={handleChageView}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
              <Plus
                size="size-10"
                customClass="border border-blue-500 hover:border-blue-600 rounded-md p-1"
              />
              <span>Create new list</span>
            </button>
            <form action={addProductAction}>
              <fieldset disabled={isSubmitting}>
                {myLists.map((list) => (
                  <label
                    key={list.id}
                    htmlFor={list.id}
                    className="flex justify-between items-center gap-2 cursor-pointer mt-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-10 border border-gray-200 p-1 rounded-md">
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
                <input hidden name="productId" defaultValue={productId} />
                {/* <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md w-full mt-4"
              >
                Add
              </button> */}
                <div className="text-center mt-4 w-full">
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
