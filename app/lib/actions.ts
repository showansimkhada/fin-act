'use server';

import { z } from 'zod';

import { signIn } from '@/app/actions/auth';
import { AuthError } from 'next-auth';

//  Begin USERS 
const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  sfirstname: z.string(),
  slastname: z.string(),
})

const UpdateUN = UserSchema.omit({
  _id: true,
  firstname: true,
  lastname: true,
  sfirstname: true,
  slastname: true,
  password: true,
})

export async function updateUN(formData: FormData) {
  const username = formData.get('username');
  const un = formData.get('newUsername');
  const update = UpdateUN.parse({
    username: un
  })
  // check for exisiting users if not then update else ask for different
  // const result = await updateUser(update)
}

const UpdateProfile = UserSchema.omit({
  _id: true,
  username: true,
  password: true,
})

export async function updateProfile(formData: FormData) {
  const parseProfile = UpdateProfile.parse({
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    sfirstname: formData.get('sfirstname'),
    slastname: formData.get('slastname'),
  })
}

const UpdatePass = UserSchema.omit({
  _id: true,
  username: true,
  firstname: true,
  lastname: true,
  sfirstname: true,
  slastname: true,
})

export async function updatePass(formData: FormData) {
  const newpass = formData.get('newpass');
  const confirmpass = formData.get('confirmpass');
  // if ( newpass === confirmpass) {
  //   const hash = bcrypt.hashSync(newpass, 12)
  //   const parsePass = UpdatePass.parse({
  //     password: hash,
  //   })
  // }
}
// End USERS

// Begin BS
const BsSchema = z.object({
  _id: z.string(),
  username: z.string(),
  year: z.number(),
  month: z.number(),
  date: z.number(),
  fWI: z.number(),
  sWI: z.number(),
  ret: z.number(),
  oB: z.number(),
  cB: z.number(),
  wSp: z.number(),
  wSa: z.number(), 
})

const CreateBS = BsSchema.omit({
  _id: true,
})
 
export async function createBS(formData: FormData) {
  const str = formData.get('bsDate')?.toString();
  const parseBS = CreateBS.parse({
    username: formData.get('username'),
    year: Number(str?.split('-')[0]),
    month: Number(str?.split('-')[1]),
    date: Number(str?.split('-')[2]),
    fWI: Number(formData.get('fWI')),
    sWI: Number(formData.get('sWI')),
    ret: Number(formData.get('ret')),
    oB: Number(formData.get('oB')),
    cB: Number(formData.get('cB')),
    wSp: Number(formData.get('wSp')),
    wSa: Number(formData.get('wSa')),
  })
  // const result = await postBS(parseBS);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}