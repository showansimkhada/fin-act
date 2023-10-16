import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/conn/mongoose'
import MO from '@/lib/utils/models/moModel'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
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
              res.redirect('/dashMO')
            } else {
              res.send('Error on saving old data')
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
              res.redirect('/dashMO')
            } else {
              res.send('Error on saving old data')
            }
        }
      } catch (error) {
        res.send(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}