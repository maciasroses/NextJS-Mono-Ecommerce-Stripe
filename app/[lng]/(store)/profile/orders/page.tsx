import { Suspense } from "react";
import { OrdersList } from "./components";
import { useTranslation } from "@/app/i18n";
import { getMyOrders } from "@/app/shared/services/order/controller";
import { OrdersListSkeleton, Pagination } from "@/app/shared/components";
import type {
  IOrderList,
  IBaseLangPage,
  IOrderSearchParams,
} from "@/app/shared/interfaces";

interface IProfileOrdersPage extends IBaseLangPage {
  searchParams?: IOrderSearchParams;
}

const ProfileOrdersPage = async ({
  searchParams,
  params: { lng },
}: IProfileOrdersPage) => {
  const { t } = await useTranslation(lng, "profile");
  const { title } = JSON.parse(t("orders"));

  const { page = "1" } = searchParams || {};

  const searchParamsForList = {
    page,
  };

  const { totalPages } = (await getMyOrders(searchParamsForList)) as IOrderList;

  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <Suspense key={page} fallback={<OrdersListSkeleton />}>
        <OrdersList lng={lng} searchParams={searchParamsForList} />
      </Suspense>
      <Pagination lng={lng} totalPages={totalPages} />
    </>
  );
};

export default ProfileOrdersPage;
