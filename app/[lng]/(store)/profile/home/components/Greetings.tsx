"use client";

import { useAuth } from "@/app/shared/hooks";

const Greetings = ({ lng }: { lng: string }) => {
  console.log(lng);
  const { user } = useAuth();

  return <h1 className="text-4xl">Hello, {user?.username}</h1>;
};

export default Greetings;
