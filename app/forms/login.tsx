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
    <div className='flex flex-col bg-amber-50 p-8 rounded-2xl w-2xs h-60 items-center justify-center'>
			<form action={formAction}>
				<div className='relative'>
					<label className='absolute top-1 left-2.5 z-10' htmlFor="username">
						Username
					</label>
					<input className='w-full bg-white p-1.5 pt-6 rounded-2xl mb-0.5 rounded-br-xs rounded-bl-xs'
            type='text' id='username' name='username' autoCapitalize='none' required/>
				</div>
				<div className='relative'>
					<label className='absolute top-1 left-2.5 z-10' htmlFor='password'>
						Password
					</label>
					<input className='w-full bg-white p-1.5 pt-6 rounded-2xl mb-2.5 rounded-tl-xs rounded-tr-xs'
            type='password' id='password' name='password' required/>
				</div>
        <input type='hidden' name='redirectTo' value={callbackUrl} />
          <Button className='rounded-2xl bg-blue-500 w-full h-8 hover:bg-orange-300' aria-disabled={isPending}>
            Log in
          </Button>
          <div
            className=''
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage && (
              <>
                <p className='text-red-400 mt-2.5 mb-2.5 mr-1.5 ml-1.5 text-center'>{errorMessage}</p>
              </>
            )}
          </div>
			</form>
    </div>
    </>
	)
}