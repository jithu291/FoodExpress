export interface Restaurant {
    id: number;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    category: string;
  }
  
  export interface FoodItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    rating: number;
  }
  
  export interface LoginForm {
    email: string;
    password: string;
  }