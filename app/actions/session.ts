// import 'server-only'

// import { SignJWT, jwtVerify } from 'jose';
// import { SessionPayload } from '@/lib/definitions';
// import { cookies } from 'next/headers';
// import { cache } from 'react';
// import { redirect } from 'next/navigation';
// import { auth } from '@/actions/auth';

// const secretKey = process.env.AUTH_SECRET;
// const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: SessionPayload) {
//   // return new SignJWT(payload)
//   //   .setProtectedHeader({ alg: 'HS256' })
//   //   .setIssuedAt()
//   //   .setExpirationTime('7d')
//   //   .sign(encodedKey)
// }

// export async function decrypt(payload: SessionPayload) {
//   // try {
//   //   const { payload } = await jwtVerify(session, encodedKey, {
//   //     algorithms: ['HS256'],
//   //   })
//   //   return payload
//   // } catch (error) {
//   //   console.log('Failed to verify session')
//   // }
// }
 
// export const verifySession = cache(async () => {
//   // const cookie = await auth()
//   // // const session = await decrypt(cookie)
 
//   // if (!cookie?.user?.name) {
//   //   redirect('/login')
//   // }
 
//   // return { isAuth: true, user: cookie.user.name }
// })

// export async function updateSesion() {
//   // const session = ((await cookies()).get('session'))?.value;
//   // const payload = await decrypt(session);
//   // if (!session || !payload ) {
//   //   return null
//   // }

//   // const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   // const cookieStore = await cookies()
//   // cookieStore.set('session', session, {
//   //   httpOnly: true,
//   //   secure: true,
//   //   expires: expires,
//   //   sameSite: 'lax',
//   //   path: '/',
//   // })
// }
 
// export async function deleteSession() {
//   const cookieStore = await cookies()
//   cookieStore.delete('session')
// }