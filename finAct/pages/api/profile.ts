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
        let username = req.query.username;
        let type = req.query.type;
        const user = await User.findOne({username: username})
        if (type === 'details') {
          let newUsername = req.body.newUsername;
          const exist = await User.findOne({username: newUsername})
          if (exist) {
            res.send('Username Exists Please Choose another')
          } else {
            user.usernmae = newUsername
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
              res.send('Error saving data')
            }
          }
        } else if (type === 'opener') {
          user.mo = Boolean(req.body.mo);
          user.mos = Boolean(req.body.mos);
          const data = await user.save()
          if (data) {
            res.redirect('/profile')
          } else {
            res.send('Error saving opener status')
          }
        }else if (type === 'password') {
          let oldpass = req.body.oldpass
          if (bcrypt.compareSync(oldpass || "", user.password)) {
            let newpass = req.body.newpass
            let confirmpass = req.body.confirmpass
            if (newpass === confirmpass) {
              let hasPass = bcrypt.hashSync(newpass, 12)
              user.password = hasPass
              const data = await user.save()
              if (data) {
                res.redirect('/profile')
              } else {
                res.send('Error saving password')
              }
            } else {
              res.send(`Didn't match both password`)
            }
          }
        }
      } catch (error) {
        res.send(error)
      }
      break
    default:
      console.log(method)
      res.status(400).json({ success: false })
      break
  }
}