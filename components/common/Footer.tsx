import { Utensils } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        
        <Link
          href="/"
          className="flex items-center space-x-3 group justify-center sm:justify-start"
        >
          <div className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent">
              FoodExpress
            </span>
            <span className="text-sm text-slate-400">Taste. Delivered.</span>
          </div>
        </Link>

        <p className="text-gray-400 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} <span className="text-gray-300 font-semibold">FoodExpress</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
