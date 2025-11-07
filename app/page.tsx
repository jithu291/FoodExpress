import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { Navigation } from '@/components/common/Navigation';
import { RestaurantGrid } from '@/components/common/RestaurantGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <RestaurantGrid />
      </main>
      <Footer />
    </div>
  );
}