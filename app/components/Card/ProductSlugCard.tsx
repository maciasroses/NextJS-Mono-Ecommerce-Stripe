"use client";

import Image from "next/image";
import { cn } from "@/app/utils/cn";
import AddCustomList from "../CustomList/AddCustomList";
import { useCart, useModal } from "@/app/hooks";
import formatCurrency from "@/app/utils/format-currency";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeftChevron, RightChevron, XMark } from "@/public/icons";
import type { ICustomList, IProduct } from "@/app/interfaces";
import AddToCart from "../AddToCart";

interface IProductSlugCard {
  lng: string;
  userId: string;
  myLists: ICustomList[];
  product: IProduct;
  isFavorite: boolean;
}

const ProductSlugCard = ({
  lng,
  userId,
  product,
  myLists,
  isFavorite,
}: IProductSlugCard) => {
  const zoomRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const { isOpen, onOpen, onClose } = useModal();
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomBoxPosition, setZoomBoxPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedImage(product.files[0].url);
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    const zoomBoxX = e.pageX - left - 75;
    const zoomBoxY = e.pageY - top - 75;

    const clampedX = Math.max(0, Math.min(zoomBoxX, width - 150));
    const clampedY = Math.max(0, Math.min(zoomBoxY, height - 150));

    setZoomPosition({ x, y });
    setZoomBoxPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleNextImage = () => {
    const currentIndex = product.files.findIndex(
      (file) => file.url === selectedImage
    );
    const nextIndex = currentIndex + 1;
    setSelectedImage(
      nextIndex < product.files.length
        ? product.files[nextIndex].url
        : product.files[0].url
    );
  };

  const handlePreviousImage = () => {
    const currentIndex = product.files.findIndex(
      (file) => file.url === selectedImage
    );
    const previousIndex = currentIndex - 1;
    setSelectedImage(
      previousIndex >= 0
        ? product.files[previousIndex].url
        : product.files[product.files.length - 1].url
    );
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        leftArrowRef.current &&
        !(leftArrowRef.current as HTMLElement).contains(event.target as Node) &&
        rightArrowRef.current &&
        !(rightArrowRef.current as HTMLElement).contains(event.target as Node)
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

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/80 p-5 md:p-10 flex justify-center">
          <div className="size-full relative max-w-[1440px]">
            <div className="absolute w-full flex justify-between items-start">
              <p className="text-gray-200 bg-black/50 py-1 px-3 rounded-full">
                {product.files.findIndex((file) => file.url === selectedImage) +
                  1}
                {" / "}
                {product.files.length}
              </p>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200"
              >
                <XMark />
              </button>
            </div>
            <div className="size-full flex gap-2 justify-between items-center">
              <button
                ref={leftArrowRef}
                onClick={handlePreviousImage}
                className="text-white hover:text-gray-200"
              >
                <LeftChevron />
              </button>
              <div className="h-[80%] flex items-center">
                <Image
                  width={600}
                  height={600}
                  src={selectedImage}
                  alt={product.name}
                  className="size-full object-contain"
                />
              </div>
              <button
                ref={rightArrowRef}
                onClick={handleNextImage}
                className="text-white hover:text-gray-200"
              >
                <RightChevron />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex gap-4 w-full md:w-1/3 h-full justify-center md:justify-start">
          <div className="flex flex-col gap-2">
            {product.files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "size-16 border border-gray-300 cursor-pointer hover:border-blue-500 p-1",
                  selectedImage === file.url && "border-blue-500"
                )}
              >
                <Image
                  width={64}
                  height={64}
                  src={file.url}
                  alt={product.name}
                  className="size-full object-contain"
                  onMouseEnter={() => setSelectedImage(file.url)}
                />
              </div>
            ))}
          </div>
          <div
            ref={zoomRef}
            onClick={onOpen}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-96 flex justify-center border border-gray-300 cursor-pointer md:cursor-zoom-in relative"
          >
            {selectedImage && (
              <Image
                priority
                width={100}
                height={100}
                alt={product.name}
                src={selectedImage}
                className="size-auto object-contain"
              />
            )}
            <div
              className="hidden md:block absolute border border-black bg-black opacity-40"
              style={{
                width: "150px",
                height: "150px",
                left: `${zoomBoxPosition.x}px`,
                top: `${zoomBoxPosition.y}px`,
                visibility:
                  zoomPosition.x === 0 && zoomPosition.y === 0
                    ? "hidden"
                    : "visible",
              }}
            ></div>
          </div>
        </div>
        <div className="relative w-full md:w-2/3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col md:gap-4">
                <h1 className="text-2xl md:text-5xl lg:text-9xl font-bold">
                  {product.name}
                </h1>
                <p className="text-lg md:text-2xl lg:text-5xl">
                  {formatCurrency(product.priceInCents / 100, "MXN")}
                </p>
                <p className="text-base md:text-xl lg:text-4xl">
                  {product.description}
                </p>
              </div>
              <AddCustomList
                lng={lng}
                userId={userId}
                myLists={myLists}
                productId={product.id}
                isFavorite={isFavorite}
              />
            </div>
            <AddToCart product={product} />
          </div>
          <div
            className="hidden md:block absolute top-0 right-0 size-full max-h-[600px] pointer-events-none"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "150%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              visibility:
                zoomPosition.x === 0 && zoomPosition.y === 0
                  ? "hidden"
                  : "visible",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProductSlugCard;
