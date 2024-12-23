"use client";

import Form from "./Form";
import Image from "next/image";
import { useAuth } from "@/app/shared/hooks";

const MainInfo = ({ lng }: { lng: string }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full md:w-1/2 flex flex-col overflow-hidden rounded-lg dark:bg-gray-800 dark:text-gray-100 shadow-lg dark:shadow-gray-800 ">
      <div className="mb-8 bg-gray-200 dark:bg-gray-600">
        <div className="flex h-32 items-end justify-center">
          <div className="-mb-12 rounded-full bg-gray-200 p-2 dark:bg-gray-600">
            <Image
              src={user?.image as string}
              width={80}
              height={80}
              priority
              alt="User Profile"
              className="inline-block size-20 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="grow p-5 text-center relative">
        <Form lng={lng} />
      </div>
    </div>
  );
};

export default MainInfo;
