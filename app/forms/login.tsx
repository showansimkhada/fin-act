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
    <div className=''>
			<form action={formAction}>
				<div className=''>
					<label className='' htmlFor="username">
						Username
					</label>
					<input className=''
            type='text' id='username' name='username' autoCapitalize='none' required/>
				</div>
				<div className='relative'>
					<label className='' htmlFor='password'>
						Password
					</label>
					<input className=''
            type='password' id='password' name='password' required/>
				</div>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
          <Button className='' aria-disabled={isPending}>
            Log in
          </Button>
          <div
            className=''
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <p className=''>{errorMessage}</p>
              </>
            )}
          </div>
			</form>
    </div>
    </>
	)
}