import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMe } from "@/app/shared/services/user/controller";
import type { IUser } from "@/app/shared/interfaces";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin",
  },
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const me = (await getMe()) as IUser;
  if (!me || me.role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
};

export default AdminLayout;
