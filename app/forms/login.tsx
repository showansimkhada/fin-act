'use client';

import { Button } from '@/components/button';
import { useActionState } from 'react';
import { authenticate } from '@/api/auth';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )
	return (
    <>
    <div className='loginForm'>
      <form action={formAction}>
        <div className='inputContainer'>
          <label htmlFor="username">
            Username
          </label>
          <input
            type='text' id='username' name='username' autoCapitalize='none' required/>
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>
            Password
          </label>
          <input
            type='password' id='password' name='password' required/>
        </div>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
          <Button aria-disabled={isPending}>
            Log in
          </Button>
          <div
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <p className='errorMsg'>{errorMessage}</p>
              </>
            )}
          </div>
      </form>
    </div>
    </>
	)
}