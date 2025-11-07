import { Restaurant, FoodItem } from '@/types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Burger Palace",
    image: "/assets/hotel1.jpg",
    rating: 4.5,
    deliveryTime: "25-30 min",
    category: "American"
  },
  {
    id: 2,
    name: "Pizza Heaven",
    image: "/assets/hotel2.avif",
    rating: 4.7,
    deliveryTime: "30-35 min",
    category: "Italian"
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "/assets/hotel3.avif",
    rating: 4.8,
    deliveryTime: "35-40 min",
    category: "Japanese"
  },
  {
    id: 4,
    name: "Taco Fiesta",
    image: "/assets/hotel4.avif",
    rating: 4.3,
    deliveryTime: "20-25 min",
    category: "Mexican"
  },
  {
    id: 5,
    name: "Curry House",
    image: "/assets/hotel5.avif",
    rating: 4.6,
    deliveryTime: "30-35 min",
    category: "Indian"
  },
  {
    id: 6,
    name: "Noodle Bar",
    image: "/assets/hotel6.webp",
    rating: 4.4,
    deliveryTime: "25-30 min",
    category: "Asian"
  }
];

export const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    price: 12.99,
    image: "/assets/burger.jpg",
    description: "Juicy beef patty with cheese, lettuce, and special sauce",
    category: "Burgers",
    rating: 4.5
  },
  {
    id: 2,
    name: "Margherita Pizza",
    price: 16.99,
    image: "/assets/pizza.jpg",
    description: "Fresh tomato sauce, mozzarella, and basil",
    category: "Pizza",
    rating: 4.7
  },
  {
    id: 3,
    name: "California Roll",
    price: 8.99,
    image: "/assets/sushi.jpg",
    description: "Crab, avocado, and cucumber roll",
    category: "Sushi",
    rating: 4.6
  },
  {
    id: 4,
    name: "Chicken Tacos",
    price: 10.99,
    image: "/assets/tacos.jpg",
    description: "Three soft tacos with grilled chicken and salsa",
    category: "Mexican",
    rating: 4.4
  },
  {
    id: 5,
    name: "Butter Chicken",
    price: 14.99,
    image: "/assets/butter.jpg",
    description: "Creamy tomato curry with tender chicken",
    category: "Indian",
    rating: 4.8
  },
  {
    id: 6,
    name: "Pad Thai",
    price: 13.99,
    image: "/assets/thai.jpg",
    description: "Stir-fried rice noodles with shrimp and peanuts",
    category: "Asian",
    rating: 4.5
  },
  {
    id: 7,
    name: "Caesar Salad",
    price: 9.99,
    image: "/assets/salad.jpg",
    description: "Fresh romaine with Caesar dressing and croutons",
    category: "Salads",
    rating: 4.3
  },
  {
    id: 8,
    name: "Chocolate Brownie",
    price: 6.99,
    image: "/assets/choc.jpg",
    description: "Warm chocolate brownie with ice cream",
    category: "Desserts",
    rating: 4.9
  }
];
