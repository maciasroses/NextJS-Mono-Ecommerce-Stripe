"use client";

import Form from "./Form";
import { Heart } from "@/app/shared/icons";
import { Modal, Toast } from "@/app/shared/components";
import { useModal, useResolvedTheme } from "@/app/shared/hooks";
import { deleteProductFromAllCustomLists } from "@/app/shared/services/customList/controller";
import type { ICustomList } from "@/app/shared/interfaces";

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
        Toast({
          theme,
          type: "success",
          message:
            lng === "en"
              ? "Product removed from all lists"
              : "Producto eliminado de todas las listas",
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
        <Form
          lng={lng}
          myLists={myLists}
          productId={productId}
          handleClose={onClose}
        />
      </Modal>
    </>
  );
};

export default AddCustomList;
