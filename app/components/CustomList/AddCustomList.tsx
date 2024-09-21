"use client";

import Form from "./Form";
import Modal from "../Modal";
import { Heart } from "@/public/icons";
import { Slide, toast } from "react-toastify";
import { useModal, useResolvedTheme } from "@/app/hooks";
import { deleteProductFromAllCustomLists } from "@/app/services/customList/controller";
import type { ICustomList } from "@/app/interfaces";

interface IAddCustomList {
  lng: string;
  userId: string;
  productId: string;
  isFavorite: boolean;
  myLists: ICustomList[];
}

const AddCustomList = ({
  lng,
  userId,
  productId,
  isFavorite,
  myLists,
}: IAddCustomList) => {
  const theme = useResolvedTheme();
  const { isOpen, onOpen, onClose } = useModal();

  const handleFavorite = () => {
    if (userId) {
      if (isFavorite) {
        deleteProductFromAllCustomLists(productId);
        toast.success("Product removed from all lists", {
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          position: "bottom-right",
          theme: theme === "dark" ? "dark" : "light",
        });
      } else {
        onOpen();
      }
    } else {
      window.location.href = `/${lng}/login`;
    }
  };

  return (
    <>
      <button aria-label="Custom List Button" onClick={handleFavorite}>
        {isFavorite ? (
          <Heart isFilled size="size-10" />
        ) : (
          <Heart size="size-10" />
        )}
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isForSideBar={false}>
        <Form myLists={myLists} productId={productId} handleClose={onClose} />
      </Modal>
    </>
  );
};

export default AddCustomList;
