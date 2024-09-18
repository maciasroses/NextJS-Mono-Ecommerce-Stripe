"use client";

import Image from "next/image";
import { cn } from "@/app/utils/cn";
import { useEffect, useRef, useState } from "react";
import type { IProduct } from "@/app/interfaces";
import formatCurrency from "@/app/utils/format-currency";
import { useCart } from "@/app/hooks/useCart";

const ProductSlugCard = ({ product }: { product: IProduct }) => {
  const zoomRef = useRef(null);
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

    const zoomBoxX = e.pageX - left - 50;
    const zoomBoxY = e.pageY - top - 50;

    const clampedX = Math.max(0, Math.min(zoomBoxX, width - 100));
    const clampedY = Math.max(0, Math.min(zoomBoxY, height - 100));

    setZoomPosition({ x, y });
    setZoomBoxPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 0, y: 0 });
  };

  const { cart, addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      file: product.files[0].url,
      price: product.priceInCents,
      quantity: 1,
    });
  };

  const currentQuantityProduct =
    cart.find((item) => item.id === product.slug)?.quantity ?? 0;

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex gap-4 w-full md:w-1/3 justify-center md:justify-start">
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
        {selectedImage && (
          <div
            ref={zoomRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="border border-gray-300 w-full cursor-pointer md:cursor-zoom-in relative"
          >
            <Image
              priority
              width={600}
              height={600}
              alt={product.name}
              src={selectedImage}
              className="size-full object-cover"
            />
            <div
              className="hidden md:block absolute border border-black bg-black opacity-40"
              style={{
                width: "100px",
                height: "100px",
                left: `${zoomBoxPosition.x}px`,
                top: `${zoomBoxPosition.y}px`,
                visibility:
                  zoomPosition.x === 0 && zoomPosition.y === 0
                    ? "hidden"
                    : "visible",
              }}
            ></div>
          </div>
        )}
      </div>
      <div className="relative w-full md:w-2/3">
        <div className="flex flex-col md:flex-row gap-2 justify-between">
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
          <button
            onClick={
              currentQuantityProduct < product.maximumQuantityPerOrder &&
              currentQuantityProduct < product.quantity
                ? handleAddToCart
                : () => {}
            }
            className={cn(
              "text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none h-full",
              currentQuantityProduct < product.maximumQuantityPerOrder &&
                currentQuantityProduct < product.quantity
                ? "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed text-gray-600 dark:bg-gray-700 dark:text-gray-200"
            )}
          >
            {currentQuantityProduct < product.maximumQuantityPerOrder &&
            currentQuantityProduct < product.quantity
              ? "Add to cart"
              : "Max quantity reached"}
          </button>
        </div>
        <div
          className="hidden md:block absolute top-0 right-0 w-full h-[800px] pointer-events-none"
          style={{
            backgroundImage: `url(${selectedImage})`,
            backgroundSize: "200%",
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            visibility:
              zoomPosition.x === 0 && zoomPosition.y === 0
                ? "hidden"
                : "visible",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductSlugCard;
