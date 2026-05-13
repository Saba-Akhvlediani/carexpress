import { AuthForm } from '@/components/inkwell/AuthForm';

export const metadata = { title: 'Create account' };

export default function RegisterPage() {
  return <AuthForm initialMode="register" />;
}
