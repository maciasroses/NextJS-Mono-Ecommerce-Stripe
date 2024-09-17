"use client";

import Modal from "./Modal";
import { cn } from "../utils/cn";
import { cloneElement } from "react";
import useModal from "@/app/hooks/useModal";
import { PencilIcon, PlusCircle, TrashIcon } from "@/public/icons";

interface IAction {
  cannotDelete?: boolean;
  children: React.ReactElement<{
    onClose: () => void;
    action: IAction["action"];
  }>;
  action: "create" | "update" | "delete" | "massiveDelete";
}

const Action = ({ cannotDelete, children, action }: IAction) => {
  const { isOpen, onOpen, onClose } = useModal();

  const handleClick = () => {
    if (!cannotDelete) onOpen();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          "bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 text-white px-4 py-2 rounded-lg border border-white",
          cannotDelete && "opacity-50 cursor-not-allowed"
        )}
        title={`${
          action === "create"
            ? "Crear"
            : action === "update"
            ? "Editar"
            : "Eliminar"
        }`}
      >
        {action === "create" ? (
          <PlusCircle />
        ) : action === "update" ? (
          <PencilIcon />
        ) : (
          <TrashIcon />
        )}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        {cloneElement(children, {
          onClose,
          action,
        })}
      </Modal>
    </>
  );
};

export default Action;
