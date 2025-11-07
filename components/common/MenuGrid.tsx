'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { foodItems } from '@/data/mockData';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CartItem } from '@/lib/store';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { RootState } from '@/lib/store';

export function MenuGrid() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.app);

  const handleAddToCart = (item: typeof foodItems[0]) => {
    if (!isAuthenticated) {
      toast("Please login to add items to cart", {
        description: "You need to be logged in to make a purchase.",
        action: {
          label: "Login",
          onClick: () => {
            window.location.href = "/login"; 
          },
        },
      });
      return;
    }

    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));

    toast.success("Added to Cart!", {
      description: `${item.name} has been added successfully.`,
    });
  };

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-16 w-8 h-8 bg-sky-400/15 rounded-full blur-sm"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-slate-300 text-lg">
            Discover our delicious selection of dishes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {foodItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
                <div className="h-48 relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span className="text-lg font-bold text-emerald-400">${item.price}</span>
                    </div>

                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-slate-700/50 text-slate-200 text-xs px-2 py-1 rounded-lg">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-300">{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center space-x-2 py-2 rounded-xl shadow-md shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.03]"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
