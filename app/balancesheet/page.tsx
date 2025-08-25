import { fetchBS } from '@/api/bs'
import { fetchDetails } from '@/api/users';
import { formatDate } from '@/lib/utils';
import { auth } from '@/api/auth';

export default async function Page() {
  const session = await auth();
  const user = session?.user?.name;
  const me = await fetchDetails(user!);
  const bs = await fetchBS(user);
  return (
    <>
      <table>
        <thead>
          <tr className='bg-amber-200'>
            <th className='border border-solid border-red-500'>Date</th>
            <th className='border border-solid border-red-500'>{me?.firstname}'s WI</th>
            <th className='border border-solid border-red-500'>{me?.sfirstname}'s WI</th>
            <th className='border border-solid border-red-500'>Return</th>
            <th className='border border-solid border-red-500'>Opening Balance</th>
            <th className='border border-solid border-red-500'>Closing Balance</th>
            <th className='border border-solid border-red-500'>Weekly Spent</th>
            <th className='border border-solid border-red-500'>Weekly Save</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(odd)]:bg-white'>
          {bs?.map((x) => (
            <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.fWI}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.sWI}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.return}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.openingBalance}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.closingBalance}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.weeklySpent}</td>
              <td className='p-[2px] text-right border border-solid border-orange-500'>{x.weeklySave}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className='p-[2px] text-right border border-solid border-orange-500'>{'Total'}</td>
            <td className='p-[2px] text-right border border-solid border-orange-500'>{'fweTotal'}</td>
            <td className='p-[2px] text-right border border-solid border-orange-500'>{'sweTotal'}</td>
            <td className='p-[2px] text-right border border-solid border-orange-500'></td>
            <td className='p-[2px] text-right border border-solid border-orange-500'></td>
            <td className='p-[2px] text-right border border-solid border-orange-500'></td>
            <td className='p-[2px] text-right border border-solid border-orange-500'>{'wspTotal'}</td>
            <td className='p-[2px] text-right border border-solid border-orange-500'>{'wsaTotal'}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

// import Navbars from '@/components/nav-bar'

// import BS, { IBS } from '@/lib/utils/models/bsModel'
// import User, { IUSER } from '@/lib/utils/models/userModel'
// import dbConnect from '@/lib/utils/conn/mongoose';
// import { formatDate } from '@/lib/funcPage';
// import { lsUser } from '@/lib/redux';

// import { GetServerSideProps } from 'next';
// import React from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// type Props = {
//     bsData: IBS[] ,
//     userData: IUSER[]
// }

// export default function( {bsData, userData}: Props) {
//     const [isClient, setIsClient] = useState(false);
//     const router = useRouter()
//     useSession({
//         required: true,
//         onUnauthenticated() {
//             router.push('/')
//         }
//     })
//     const username = String(useSelector(lsUser))
//     const dataBS = bsData.filter((x) => {
//         return x.username === username
//     })
//     const dataUser = userData.filter((x) => {
//         return x.username === username
//     })
//     const [data] = useState(dataBS);
//     const fweTotal = dataBS.reduce((c, x) => c + Number(x.fWI), 0).toFixed(2);
//     const sweTotal = dataBS.reduce((c, x) => c + Number(x.sWI), 0).toFixed(2);
//     const wspTotal = dataBS.reduce((c, x) => c + Number(x.weeklySpent), 0).toFixed(2);
//     const wsaTotal = dataBS.reduce((c, x) => c + Number(x.weeklySave), 0).toFixed(2);
//     useEffect (() => {
//         setIsClient(true)
//     })

//     const dataTable = (
// 		<>
// 			<div className='bs-container'>
// 				<table>
// 					<thead>
// 						<tr>
// 							<th>Date</th>
// 							<th>{isClient? dataUser[0]?.firstname: ''}'s WI</th>
// 							<th>{isClient? dataUser[0]?.sfirstname: ''}'s WI</th>
// 							<th>Return</th>
// 							<th>Opening Balance</th>
// 							<th>Closing Balance</th>
// 							<th>Weekly Spent</th>
// 							<th>Weekly Save</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{isClient? data.map((x) => (
// 							<tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
// 								<td className='border border-solid caret-amber-50'>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
// 								<td className='border border-solid caret-amber-50'>{x.fWI.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.sWI.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.return.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.openingBalance.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.closingBalance.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.weeklySpent.toString()}</td>
// 								<td className='border border-solid caret-amber-50'>{x.weeklySave.toString()}</td>
// 							</tr>
//                    		 )): ''}
// 					</tbody>
// 					<tfoot>
// 						{isClient ? 
// 							<tr>
// 								<td className='border border-solid caret-amber-50'>{'Total'}</td>
// 								<td className='border border-solid caret-amber-50'>{fweTotal}</td>
// 								<td className='border border-solid caret-amber-50'>{sweTotal}</td>
// 								<td className='border border-solid caret-amber-50'></td>
// 								<td className='border border-solid caret-amber-50'></td>
// 								<td className='border border-solid caret-amber-50'></td>
// 								<td className='border border-solid caret-amber-50'>{wspTotal}</td>
// 								<td className='border border-solid caret-amber-50'>{wsaTotal}</td>
// 							</tr>
// 						: ''}
// 					</tfoot>
// 				</table>
// 			</div>
// 		</>
//     )

//     return (
// 		<>
//             <Navbars/>
//             {dataTable}
//         </>
//     )
// }

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//     await dbConnect()
//     /* find all the data in our database */
//     const findBS = await BS.find({})
//     const data = findBS.sort((a, b) => {
//         return new Date(
// 			a.year.toString() + '-' + a.month.toString() + '-'
// 			+ a.date.toString()).getTime() - new Date(b.year.toString()
// 			+ '-' + b.month.toString() + '-' + b.date.toString()
// 		).getTime()
//     });
  
//     /* Ensures all objectIds and nested objectIds are serialized as JSON data */
//     const bsData = data.map((doc) => {
// 		const pet = JSON.parse(JSON.stringify(doc))
// 		return pet
//     })

//     /* find all the data in our database */
//     const results = await User.find({})
  
//     /* Ensures all objectIds and nested objectIds are serialized as JSON data */
//     const userData = results.map((doc) => {
// 		const pet = JSON.parse(JSON.stringify(doc))
// 		return pet
//     })
  
//     return { props: { bsData: bsData, userData: userData } }
// }