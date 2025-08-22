import LoginForm from '@/forms/login';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <>
      <Suspense>
        <LoginForm/>
      </Suspense>
    </>
  );
}
