'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFromCart, updateQuantity } from '@/lib/store';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartContent() {
    const { cart } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                <ShoppingBag className="w-24 h-24 text-slate-400 mb-6" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                    Your cart is empty
                </h2>
                <p className="text-slate-400 mt-3 mb-8">
                    Add some delicious items to get started!
                </p>
                <Link href="/menu">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.05]">
                        Browse Menu
                    </Button>
                </Link>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/3 left-10 w-8 h-8 bg-emerald-400/15 rounded-full blur-md"
            />
            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-1/4 right-16 w-10 h-10 bg-sky-400/15 rounded-full blur-md"
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 text-center"
                >
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                        Shopping Cart
                    </h1>
                    <p className="text-slate-400">
                        Review your items and proceed to checkout
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-md hover:shadow-emerald-500/20 transition-all duration-300">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/10 to-emerald-700/20 rounded-lg border border-emerald-400/20 flex items-center justify-center">
                                            <ShoppingBag className="w-6 h-6 text-emerald-400" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-white">{item.name}</h3>
                                            <p className="text-emerald-400 font-bold">${item.price}</p>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            id: item.id,
                                                            quantity: item.quantity - 1,
                                                        })
                                                    )
                                                }
                                                className="border-slate-500 text-black hover:text-white hover:bg-slate-700/60"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>

                                            <span className="w-8 text-center font-medium text-slate-200">
                                                {item.quantity}
                                            </span>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            id: item.id,
                                                            quantity: item.quantity + 1,
                                                        })
                                                    )
                                                }
                                                className="border-slate-500 text-black hover:text-white hover:bg-slate-700/60"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="border-red-500/40 text-red-400 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-md hover:shadow-emerald-500/20 transition-all duration-300">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4 text-white">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-3 text-slate-300">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Fee</span>
                                            <span>$2.99</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax (8%)</span>
                                            <span>${(totalPrice * 0.08).toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-slate-600/50 pt-3">
                                            <div className="flex justify-between text-lg font-bold text-white">
                                                <span>Total</span>
                                                <span>
                                                    ${(totalPrice + 2.99 + totalPrice * 0.08).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/checkout" className="block mt-6">
                                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.03]">
                                            Proceed to Checkout
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
