import { Navigation } from '@/components/common/Navigation';
import { Footer } from '@/components/common/Footer';
import { CartContent } from '@/components/common/CartContent';

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-">
        <CartContent />
      </main>
      <Footer />
    </div>
  );
}