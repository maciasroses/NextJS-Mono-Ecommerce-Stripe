import type {
  User,
  Cart,
  Order,
  Review,
  Address,
  Product,
  CartItem,
  Promotion,
  CustomList,
  ReviewFile,
  ProductFile,
  Notification,
  DiscountCode,
  PaymentMethod,
  ProductOnOrder,
  ProductVariant,
  StockReservation,
  CustomProductsList,
  InventoryTransaction,
} from "@prisma/client";

export interface IUser extends User {
  cart?: ICart;
  orders: IOrder[];
  reviews: IReview[];
  addresses: IAddress[];
  customLists: ICustomList[];
  notifications: INotification[];
  paymentMethods: IPaymentMethod[];
  stockReservations: IStockReservation[];
}

export interface INotification extends Notification {
  user: IUser;
}

export interface ICustomList extends CustomList {
  user: IUser;
  products: ICustomProductsList[];
}

export interface ICustomProductsList extends CustomProductsList {
  product: IProductVariant;
  customList: ICustomList;
}

export interface IProduct extends Product {
  reviews: IReview[];
  files: IProductFile[];
  variants: IProductVariant[];
}

export interface IProductVariant extends ProductVariant {
  product: IProduct;
  orders: IProductOnOrder[];
  cartItems: ICartItemPrisma[];
  stockReservations: IStockReservation[];
  customProductsList: ICustomProductsList[];
  inventoryTransactions: IInventoryTransaction[];
}

export interface IProductFile extends ProductFile {
  product: IProduct;
}

export interface IProductOnOrder extends ProductOnOrder {
  order: IOrder;
  product: IProductVariant;
}

export interface IStockReservation extends StockReservation {
  user: IUser;
  product: IProductVariant;
}

export interface IOrder extends Order {
  user: IUser;
  address?: IAddress;
  promotion?: IPromotion;
  payment?: IPaymentMethod;
  products: IProductOnOrder[];
  discountCode?: IDiscountCode;
}

export interface IInventoryTransaction extends InventoryTransaction {
  product: IProductVariant;
}

export interface IPaymentMethod extends PaymentMethod {
  user: IUser;
  orders: IOrder[];
}

export interface IAddress extends Address {
  user: IUser;
  orders: IOrder[];
}

export interface IReview extends Review {
  user: IUser;
  product: IProduct;
  files: IReviewFile[];
}

export interface IReviewFile extends ReviewFile {
  comment: IReview;
}

export interface IPromotion extends Promotion {
  orders: IOrder[];
  discountCodes: IDiscountCode[];
}

export interface IDiscountCode extends DiscountCode {
  orders: IOrder[];
  promotion: IPromotion;
}

export interface ICart extends Cart {
  user: IUser;
  items: ICartItemPrisma[];
}

export interface ICartItemPrisma extends CartItem {
  product: IProductVariant;
  cart: ICart;
}
// END OF MODELS FROM PRISMA

export type LanguageTypeForSchemas = "en" | "es";

export interface ICartItem {
  id: string;
  name: string;
  file: string;
  price: number;
  quantity: number;
  maximumQuantityPerOrder: number;
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

export interface ICustomListList {
  customLists: ICustomList[];
  totalPages: number;
}

export interface IProductList {
  products: IProduct[];
  totalPages: number;
}

export interface IProductVariantList {
  products: IProductVariant[];
  totalPages: number;
}

export interface IOrderList {
  orders: IOrder[];
  totalPages: number;
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

export interface IProductVariantSearchParams {
  q?: string;
  id?: string;
  sku?: string;
  slug?: string;
  size?: string;
  page?: string | number;
  color?: string;
  limit?: string | number;
  allData?: boolean;
  category?: string;
  quantityTo?: string | number;
  quantityFrom?: string | number;
  isAdminRequest?: boolean;
  priceInCentsTo?: string | number;
  priceInCentsFrom?: string | number;
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

export interface IAddressState {
  message: string;
  errors?: {
    fullName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phoneNumber?: string;
    additionalInfo?: string;
  };
}

export interface IAddressesList {
  addresses: IAddress[];
  totalPages: number;
}

export interface IAddressSearchParams {
  id?: string;
  userId?: string;
  page?: string | number;
  limit?: string | number;
  allData?: boolean;
}

export interface IPaymentMethodState {
  message: string;
  errors?: {
    stripePaymentMethodId?: string;
    last4Digits?: string;
    brand?: string;
    expiryMonth?: string;
    expiryYear?: string;
  };
}

export interface IPaymentMethodList {
  paymentMethods: IPaymentMethod[];
  totalPages: number;
}

export interface IPaymentMethodSearchParams {
  id?: string;
  userId?: string;
  isActive?: boolean;
  page?: string | number;
  limit?: string | number;
  allData?: boolean;
}
