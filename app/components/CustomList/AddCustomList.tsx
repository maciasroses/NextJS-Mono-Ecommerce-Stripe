"use client";

import Form from "./Form";
import Modal from "../Modal";
import { Heart } from "@/public/icons";
import { useModal } from "@/app/hooks";
import { deleteProductFromAllCustomLists } from "@/app/services/customList/controller";
import { ICustomList } from "@/app/interfaces";

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
  const { isOpen, onOpen, onClose } = useModal();

  const handleFavorite = () => {
    if (userId) {
      isFavorite ? deleteProductFromAllCustomLists(productId) : onOpen();
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
        <Form myLists={myLists} productId={productId} />
      </Modal>
    </>
  );
};

export default AddCustomList;
