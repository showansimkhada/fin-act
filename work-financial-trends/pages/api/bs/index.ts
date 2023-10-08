import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/conn/mongoose'
import BS from '@/lib/utils/models/bsModel'
import { redirect } from 'next/navigation'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const data = await BS.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        let username = req.query.username;
        let bsDate = req.body.bsDate;
        let fWI = req.body.fWI;
        let sWI = req.body.sWI;
        let ret = req.body.ret;
        let oB = req.body.oB;
        let cB = req.body.cB;
        let wSp = req.body.wSp;
        let wSa = req.body.wSa;
        const data = new BS({
            username: username,
            date: bsDate,
            fWE: fWI,
            sWE: sWI,
            return: ret,
            openingBalance: oB,
            closingBalance: cB,
            weeklySpent: wSp,
            weeklySave: wSa
        })
        const oldData = await BS.findOne({username: username, bsDate: bsDate});
        if (!oldData) {
            const result = await data.save()
            if (result) {
              console.log('Saved data')
              redirect('/homeBS')
            } else {
              console.log('Error on saving old data')
            }
        } else {
            oldData.username = username
            oldData.bsDate = bsDate
            oldData.fWI = fWI
            oldData.sWI = sWI
            oldData.ret = ret
            oldData.oB = oB
            oldData.cB = cB
            oldData.wSp = wSp
            oldData.wSa = wSa
            const result = await oldData.save()
            if (result) {
              console.log('Saved data')
              redirect('/homeBS')
            } else {
              console.log('Error on saving old data')
            }
        }
      } catch (error) {
        console.log(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}