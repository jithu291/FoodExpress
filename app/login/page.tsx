import { Navigation } from '@/components/common/Navigation';
import { Footer } from '@/components/common/Footer';
import { LoginForm } from '@/components/common/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main >
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}