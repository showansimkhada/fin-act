import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/conn/mongoose'
import User from '@/lib/utils/models/userModel'
import bcrypt from 'bcrypt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        console.log(req.query)
        let username = req.query.username;
        let type = req.query.type;
        const user = await User.findOne({username: username})
        if (type === 'username') {

        } else if (type === 'details') {
          let firstname = req.body.firstname;
          let lastname = req.body.lastname;
          let sfirstname = req.body.sfirstname;
          let slastname = req.body.slastname;
          user.firstname = firstname;
          user.lastname = lastname;
          user.sfirstname = sfirstname;
          user.slastname = slastname;
          const data = await user.save();
          if (data) {
            res.redirect('/profile')
          } else {
            console.log('Error updating profile details')
          }
        } else if (type === 'account') {
          let array = user.account
          let accType = req.query.array
          if (array.includes(accType)) {
            console.log('Type already exists')
          } else {
            array.push(accType)
            user.account = array
            const data = await user.save()
            if (data) {
              res.redirect('/profile')
            } else {
              console.log('Error saving data')
            }
          }
        } else if (type === 'accountRem') {
          let accType = req.query.array
          let array = user.account
          if (array.includes(accType)) {
            let index = array.indexOf(accType)
            array.splice(index, 1)
            user.account = array
            const data = await user.save()
            if (data) {
              res.redirect('/profile')
            } else {
              console.log('Error removing acount type')
            }
          } else {
            console.log(`Couldn't found account type`)
          }
        } else if (type === 'password') {
          let oldpass = req.body.oldpass
          if (bcrypt.compareSync(oldpass || "", user.password)) {
            let newpass = req.body.newpass
            let confirmpass = req.body.confirmpass
            if (newpass === confirmpass) {
              let hasPass = bcrypt.hashSync(newpass, 12)
              user.password = hasPass
              const data = await user.save()
              if (data) {
                res.redirect('/')
              } else {
                console.log('Error saving password')
              }
            } else {
              console.log(`Didn't match both password`)
            }
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