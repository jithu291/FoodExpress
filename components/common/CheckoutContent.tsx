'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, clearCart } from '@/lib/store';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  cardNumber: z.string().regex(/^[0-9]{6}$/, 'Card number must be 6 digits'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function CheckoutContent() {
  const { cart } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  });

  const handlePlaceOrder = async (data: CheckoutForm) => {
    const isValid = await trigger();
    if (!isValid) return;

    setIsProcessing(true);

    setTimeout(() => {
      dispatch(clearCart());
      setIsProcessing(false);
      setIsDialogOpen(false); 
      reset(); 
      toast.success('Order placed successfully!');
      router.push('/');
    }, 2000);
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      reset();
    }
  };

  if (cart.length === 0) {
    return (
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4"
        >
          🛒 Your Cart is Empty
        </motion.h2>
        <p className="text-slate-400 mb-6 text-center max-w-md">
          Looks like you haven't added anything yet. Explore our menu and find something you'll love!
        </p>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 py-2 shadow-md shadow-emerald-500/25"
          onClick={() => router.push('/menu')}
        >
          Browse Menu
        </Button>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 min-h-screen relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-16 w-8 h-8 bg-sky-400/15 rounded-full blur-sm"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 border border-white/10 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 backdrop-blur-md overflow-hidden">
                  <CardContent className="flex items-center p-4 sm:p-6 gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-emerald-400 font-medium mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            <Card className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Order Summary</h3>

                <div className="space-y-3 text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-4 text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-500/25"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Place Order
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] bg-slate-900/95 border border-white/10 text-white backdrop-blur-lg rounded-2xl shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold text-emerald-400 text-center">
                        Enter Payment Details
                      </DialogTitle>
                      <DialogDescription className="text-slate-400 text-center">
                        Fill your details and confirm your order securely.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handlePlaceOrder)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            {...register('name')}
                            placeholder="John Doe"
                            className="bg-slate-800/60 border-white/10 text-white"
                          />
                          {errors.name && (
                            <p className="text-red-400 text-sm">{errors.name.message}</p>
                          )}
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            {...register('phone')}
                            placeholder="9876543210"
                            className="bg-slate-800/60 border-white/10 text-white"
                          />
                          {errors.phone && (
                            <p className="text-red-400 text-sm">{errors.phone.message}</p>
                          )}
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            {...register('cardNumber')}
                            placeholder="1234567890123456"
                            className="bg-slate-800/60 border-white/10 text-white"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-400 text-sm">{errors.cardNumber.message}</p>
                          )}
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button 
                            className="text-black" 
                            variant="outline" 
                            type="button"
                            onClick={() => reset()}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          {isProcessing ? 'Processing...' : 'Confirm & Pay'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}