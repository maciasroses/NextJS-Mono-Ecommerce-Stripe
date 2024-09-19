import type {
  CustomList,
  CustomProductsList,
  InventoryTransaction,
  Order,
  Product,
  ProductFile,
  ProductOnOrder,
  User,
} from "@prisma/client";

export interface IUser extends User {
  orders: IOrder[];
  customLists: ICustomList[];
}

export interface ICustomList extends CustomList {
  user: IUser;
  products: ICustomProductsList[];
}

export interface ICustomProductsList extends CustomProductsList {
  product: IProduct;
  customList: ICustomList;
}

export interface IProduct extends Product {
  files: IProductFile[];
  orders: IProductOnOrder[];
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

export interface IBaseLangPage {
  params: {
    lng: string;
  };
}

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
  message: string;
  errors?: {
    email?: string;
    password?: string;
  };
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
