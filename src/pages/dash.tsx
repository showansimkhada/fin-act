'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import User, { IUSER } from '@/lib/utils/models/userModel';
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate, stringAmt, sumAmt } from '@/lib/funcPage';
import BS, { IBS } from '@/lib/utils/models/bsModel';
import { useSelector } from 'react-redux';
import { lsUser } from '@/lib/redux';
import Navbars from "@/components/nav-bar";

type Props = {
    userData: IUSER[],
    bsData: IBS[]
}

export default function ({ userData, bsData }: Props) {
    const username = String(useSelector(lsUser));
    const [isClient, setIsClient] = useState(false);
    const router = useRouter()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        }
    });

    // For balance data entry
    const [amt, setAmt] = useState('0')
    const [today, setToday] = useState(formatDate(Date(), 0));
    const [fWI, setFWI] = useState('0')
    const [sWI, setSWI] = useState('0')
    const [ret, setRET] = useState('0')
    const [cB, setCB] = useState('0')
    const [wSP, setWSP] = useState('0')
    const [wSA, setWSA] = useState('0')
    const [oB, setOB] = useState('0')

    const dataUser = userData.filter((x) => {
        return x.username === username
    })

    const dataBs = bsData.filter((x) => {
        return x.username === username
    })

    var filtData = dataBs.reverse().slice(0, 5).reverse()
    const getCB = filtData.slice(4,5)
    const closingBalance = getCB.map((x) => {
        return x.closingBalance
    })

    useEffect(() => {
        setOB(String(closingBalance))
        setIsClient(true)
    }, [today])

    useEffect(() => {
        setWSP(() =>{
            let a = (parseFloat(String(fWI)) + parseFloat(String(sWI)) + parseFloat(String(ret)) + parseFloat(String(oB)) - parseFloat(String(cB))).toFixed(2)
            if (parseFloat(a) < 0) {
                return '0'
            } else {
                return String(parseFloat(a))
            }
        })
        setWSA(() =>{
            let a = (parseFloat(String(cB)) - parseFloat(String(oB)) - parseFloat(String(ret))).toFixed(2)
            if (parseFloat(a) < 0) {
                return '0'
            } else {
                return String(parseFloat(a))
            }
        })
    }, [fWI, sWI, ret, cB, wSA, wSP])

    const tableJSX = (
		<>
			<Navbars/>
			<form action={`api/bs/?username=${username}`} method="POST">
				<div className='dashboard'>
					<div className='dash-a'>
						<div className='label-a'>
							<label>
								Date
							</label>
							<label>
								{dataUser[0]?.firstname}'s WI
							</label>
							<label>
								{dataUser[0]?.sfirstname}'s WI
							</label>
							<label>
								Return
							</label>
							<label>
								Opening Balance
							</label>
							<label>
								Closing Balance
							</label>
							<label>
								Weekly Spent
							</label>
							<label>
								Weekly Save
							</label>
						</div>
						<div className='value-a'>
							<input type="date" name="bsDate" id="bsDate" className="w-100" value={today} onChange={(event) => {
								setToday(event.target.value)
							}}/>
							<input name="fWI" id="fWI" className="w-100" value={fWI} onChange={(event) => {
								let input = event.target.value
								if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setFWI(input);
							}}/>
							<input name="sWI" id="sWI" className="w-100" value={sWI} onChange={(event) => {
								let input = event.target.value
								if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setSWI(input);
							}}/>
							<input name="ret" id="ret" className="w-100" value={ret} onChange={(event) => {
								let input = event.target.value
								if(input.match(/^-?([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setRET(input);
							}}/>
							<input name="oB" id="oB" className="w-100 border-0 p-0" value={oB} readOnly/>
							<input name="cB" id="cB" className="w-100 border-0 p-0" value={cB} readOnly/>
							<input name="wSp" id="wSp" className="w-100 border-0 p-0" value={wSP} readOnly/>
							<input name="wSa" id="wSa" className="w-100 border-0 p-0" value={wSA} readOnly/>
						</div>
					</div>
					<div className='dash-b'>
						<div className='label-b'>
							<label>
								Amount
							</label>
							<label>
								Addition expression
							</label>
						</div>
						<div className='value-b'>
							<input id="amt" value={amt} onChange={(event) => {
								let input = event.target.value;
								if (input) {
									setAmt(input)
									let x = sumAmt(input);
									setCB(x)
								} else {
									setAmt('0')
									setCB('0')
								}
							}}/>
							<label>{stringAmt(amt)}</label>
						</div>
					</div>
					<input className="btn" type="submit" value="Submit"/>
				</div>
			</form>
		</>
    )

    return (
        <>
            {isClient ? tableJSX : ''}
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(a.year.toString() + '-' + a.month.toString() + '-' + a.date.toString()).getTime() - new Date(b.year.toString() + '-' + b.month.toString() + '-' + b.date.toString()).getTime()
    });
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = data.map((doc) => {
		const bsData = JSON.parse(JSON.stringify(doc))
		return bsData
    })

    /* find all the data in our database */
    const findUser = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = findUser.map((doc) => {
		const userData = JSON.parse(JSON.stringify(doc))
		return userData
    })
  
    return { props: { bsData: bsData, userData: userData } }
}