import { Navigation } from '@/components/common/Navigation';
import { Footer } from '@/components/common/Footer';
import { MenuGrid } from '@/components/common/MenuGrid';

export default function MenuPage() {
  return (
    <div className="min-h-screen ">
      <Navigation />
      <main className="py-">
        <MenuGrid />
      </main>
      <Footer />
    </div>
  );
}