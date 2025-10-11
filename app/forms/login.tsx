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
    <div className='loginContainer'>
			<form action={formAction}>
				<div className='relative'>
					<label className='floatLabel' htmlFor="username">
						Username
					</label>
					<input className='floatInput'
            type='text' id='username' name='username' autoCapitalize='none' required/>
				</div>
				<div className='relative'>
					<label className='floatLabel' htmlFor='password'>
						Password
					</label>
					<input className='floatInput'
            type='password' id='password' name='password' required/>
				</div>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
          <Button className='loginBtn' aria-disabled={isPending}>
            Log in
          </Button>
          <div
            className=''
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