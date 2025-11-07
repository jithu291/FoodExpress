import { Navigation } from '@/components/common/Navigation';
import { Footer } from '@/components/common/Footer';
import { CheckoutContent } from '@/components/common/CheckoutContent';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="">
        <CheckoutContent />
      </main>
      <Footer />
    </div>
  );
}