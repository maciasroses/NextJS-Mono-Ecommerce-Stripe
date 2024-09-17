import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/app/services/user/controller";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    default: "Admin",
  },
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  if (session?.role !== "ADMIN") redirect("/");

  return <>{children}</>;
};

export default AdminLayout;
