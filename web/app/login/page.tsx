import { AuthForm } from '@/components/inkwell/AuthForm';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return <AuthForm initialMode="signin" />;
}
