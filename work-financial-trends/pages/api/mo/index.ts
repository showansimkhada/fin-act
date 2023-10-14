import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/conn/mongoose'
import MO from '@/lib/utils/models/moModel'
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
        const data = await MO.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: data })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        let username = req.query.username;
        let date = req.body.moDate;
        let weekday = req.body.weekday;
        let spot = req.body.spot;
        let fShift = req.body.fShift;
        let sShift = req.body.sShift;
        let tShift = req.body.tShift;
        let total = req.body.total;
        const data = new MO({
            username: username,
            date: date,
            weekday: weekday,
            spot: spot,
            fShift: fShift,
            sShift: sShift,
            tShift: tShift,
            total: total
        })
        const oldData = await MO.findOne({username: username, date: date});
        if (!oldData) {
            const result = await data.save()
            if (result) {
              console.log('Saved data')
              redirect('/homeMO')
            } else {
              console.log('Error on saving old data')
            }
        } else {
            oldData.username = username
            oldData.date = date
            oldData.weekday = weekday
            oldData.spot = spot
            oldData.fShift = fShift
            oldData.sShift = sShift
            oldData.tShift = tShift
            oldData.total = total
            const result = await oldData.save()
            if (result) {
              console.log('Saved data')
              redirect('/homeMO')
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