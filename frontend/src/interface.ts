export interface ApiResponse {
  success: boolean;
  message: string;
  products?: ProductsTypes[];
}

export interface UserApiResponse {
  success: boolean;
  message: string;
  user?: [];
  accessToken?: string;
  refreshToken?: string;
  loggedInUser?: [];
}

export interface ProductsTypes {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: { id: string; name: string };
  images: [];
}

export interface RegisterTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}
export interface LoginTypes {
  email: string;
  password: string;
}
