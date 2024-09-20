"use client";

import { cn } from "../utils/cn";
import { XMark } from "@/public/icons";
import { useCallback, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isForSideBar?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  isForSideBar = true,
}: ModalProps) => {
  const menuRef = useRef(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen) return null;

  return (
    // <div className="fixed flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 sm:ml-48 mt-20 inset-0 z-50">
    <div
      className={cn(
        "fixed flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-75 inset-0 z-50",
        isForSideBar && "sm:ml-48"
      )}
    >
      <div
        className="relative bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg dark:shadow-gray-900 w-[80%] md:w-1/2 h-auto max-h-[80%] overflow-y-auto overflow-x-hidden"
        ref={menuRef}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
        >
          <XMark />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

//EXAMPLE OF HOW TO USE THIS HOOK
// import Modal from "~/components/Modal";
// import useModal from "~/hooks/useModal";

// const Component = () => {
//   const { isOpen, onOpen, onClose } = useModal();
//   return (
//     <>
//       <h1>Home Index</h1>
//       <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
//         <button
//           onClick={onOpen}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
//         >
//           Open Modal
//         </button>
//         <Modal isOpen={isOpen} onClose={onClose}>
//           <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//             Hello, Im a Modal!
//           </h1>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Component;
