'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut, Utensils, Home } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function Navigation() {
  const { isAuthenticated, user, cart } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    dispatch(logout());
    router.push('/')
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/menu', label: 'Menu', icon: Utensils },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${isActive
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
      }`;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FoodExpress
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClass(item.href)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated && (
              <Link
                href="/cart"
                className={getLinkClass('/cart')}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium ml-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="md:hidden relative p-2">
                  <ShoppingCart className="w-6 h-6 text-slate-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white  transition-all duration-200 px-6">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>


      </div>
    </nav>
  );
}