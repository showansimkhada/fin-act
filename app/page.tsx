import AcmeLogo from '@/app/ui/acme-logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
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
