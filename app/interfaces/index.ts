import type {
  CustomList,
  CustomProductsList,
  InventoryTransaction,
  Order,
  Product,
  ProductFile,
  ProductOnOrder,
  StockReservation,
  User,
} from "@prisma/client";

export interface IUser extends User {
  orders: IOrder[];
  customLists: ICustomList[];
  stockReservations: IStockReservation[];
}

export interface ICustomList extends CustomList {
  user: IUser;
  products: ICustomProductsList[];
}

export interface ICustomListList {
  customLists: ICustomList[];
  totalPages: number;
}

export interface ICustomProductsList extends CustomProductsList {
  product: IProduct;
  customList: ICustomList;
}

export interface IStockReservation extends StockReservation {
  user: IUser;
  product: IProduct;
}

export interface IProduct extends Product {
  files: IProductFile[];
  orders: IProductOnOrder[];
  stockReservations: IStockReservation[];
  customProductsList: ICustomProductsList[];
  inventoryTransactions: IInventoryTransaction[];
}

export interface IProductList {
  products: IProduct[];
  totalPages: number;
}

export interface IProductFile extends ProductFile {
  product: IProduct;
}

export interface IOrder extends Order {
  user: IUser;
  products: IProductOnOrder[];
}

export interface IOrderList {
  orders: IOrder[];
  totalPages: number;
}

export interface IProductOnOrder extends ProductOnOrder {
  order: IOrder;
  product: IProduct;
}

export interface IInventoryTransaction extends InventoryTransaction {
  product: IProduct;
}

export interface ICartItem {
  id: string;
  name: string;
  file: string;
  price: number;
  quantity: number;
}

export interface IProductForEmail {
  name: string;
  file: string;
  price: number;
  quantity: number;
}

export interface IOrderInfoForEmail {
  email: string;
  order: IOrder;
  products: IProductForEmail[];
  totalInCents: number;
}

export interface IBaseLangPage {
  params: {
    lng: string;
  };
}

export type LanguageTypeForSchemas = "en" | "es";

export interface IRegisterState {
  message: string;
  errors?: {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export interface ILoginState {
  message: {
    en: string;
    es: string;
  };
  errors?: {
    email?: string;
    password?: string;
  };
}

export interface IUpdateMyMainInfo {
  message: {
    en: string;
    es: string;
  };
  errors?: {
    username?: string;
    email?: string;
  };
}

export interface ICustomListState {
  message: string;
  errors?: {
    name?: string;
  };
}

export interface IAddProductToCustomList {
  message: string;
  errors?: {
    productId?: string;
    customListId?: string;
  }[];
}

export interface IProductSearchParams {
  q?: string;
  id?: string;
  slug?: string;
  page?: string | number;
  limit?: string | number;
  allData?: boolean;
  priceTo?: string | number;
  category?: string;
  priceFrom?: string | number;
  quantityTo?: string | number;
  quantityFrom?: string | number;
  isAdminRequest?: boolean;
}

export interface IOrderSearchParams {
  id?: string;
  page?: string | number;
  limit?: string | number;
  userId?: string;
  allData?: boolean;
}

export interface ICustomListSearchParams {
  id?: string;
  name?: string;
  userId?: string;
  page?: string | number;
  limit?: string | number;
  allData?: boolean;
  isForFav?: boolean;
}

export interface IGenericIcon {
  size?: string;
  customClass?: string;
  strokeWidth?: number;
}
