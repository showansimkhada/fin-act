import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/conn/mongoose';
import BS from '@/lib/utils/models/bsModel';

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
        if (type === 'deleteD') {
          let id = req.query.id
          const result = await BS.findByIdAndDelete(id)
          if (result) {
            res.redirect('/dash');
          } else {
            res.send(`could't delete`);
          }
        } else if (type === 'delete') {
          let id = req.query.id
          const result = await BS.findByIdAndDelete(id)
          if (result) {
            res.redirect('/bs');
          } else {
            res.send(`could't delete`);
          }
        } else {
          let str = req.body.bsDate.split('-');
          console.log(str);
          let year = Number(str[0]);
          let month = Number(str[1]);
          let date = Number(str[2]);
          let fWI = req.body.fWI;
          let sWI = req.body.sWI;
          let ret = req.body.ret;
          let oB = req.body.oB;
          let cB = req.body.cB;
          let wSp = req.body.wSp;
          let wSa = req.body.wSa;
          const data = new BS({
              username: username,
              year: year,
              month: month,
              date: date,
              fWI: fWI,
              sWI: sWI,
              return: ret,
              openingBalance: oB,
              closingBalance: cB,
              weeklySpent: wSp,
              weeklySave: wSa
          })
          const oldData = await BS.findOne({username: username, year: year, month: month, date: date});
          if (!oldData) {
              const result = await data.save()
              if (result) {
                res.redirect('/dash')
              } else {
                res.send('Error on saving old data')
              }
          } else {
              oldData.username = username
              oldData.year = year
              oldData.month = month
              oldData.date = date
              oldData.fWI = fWI
              oldData.sWI = sWI
              oldData.ret = ret
              oldData.oB = oB
              oldData.cB = cB
              oldData.wSp = wSp
              oldData.wSa = wSa
              const result = await oldData.save()
              if (result) {
                res.redirect('/dash')
              } else {
                res.send('Error on saving old data')
              }
          }
        }
      } catch (error) {
        console.log('some thing wrong')
        res.send(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
