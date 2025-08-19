import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form';

export default async function Page() {
  return (
    <main className="">
      <Suspense>
        <LoginForm/>
      </Suspense>
    </main>
  );
}
