import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

interface AppState {
  cart: CartItem[];
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AppState = {
  cart: [],
  user: null,
  isAuthenticated: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(cartItem => cartItem.id !== action.payload.id);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('cart');

    },
    initializeState: (state) => {
      const savedCart = localStorage.getItem('cart');
      const savedUser = localStorage.getItem('user');
      
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isAuthenticated = true;
      }
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  login, 
  logout, 
  initializeState 
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;