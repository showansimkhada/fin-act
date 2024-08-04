import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/utils/conn/mongoose'
import MO, { IMO } from '@/lib/utils/models/moModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const usernames = String(req.query.username).split(',');
        let type = req.query.type
        if (type === 'deleteD') {
          let id = req.query.id
          const result = await MO.findByIdAndDelete(id)
          if (result) {
            res.redirect('/dash');
          } else {
            res.send(`could't delete`);
          }
        } else if (type === 'delete') {
          let id = req.query.id
          const result = await MO.findByIdAndDelete(id)
          if (result) {
            res.redirect('/mo');
          } else {
            res.send(`could't delete`);
          }
        } else {
          let n = usernames.length;
          if (n === 2) {
            // for two openers
            let firstUN = usernames[0];
            let firstdate = req.body.firstmoDate;
            let firstweekday = req.body.firstweekday;
            let firstspot = req.body.firstspot;
            let firstfShift = req.body.firstfShift;
            let firstsShift = req.body.firstsShift;
            let firsttShift = req.body.firsttShift;
            let firsttotal = req.body.firsttotalM;
            const first = new MO({
              username: firstUN,
              date: firstdate,
              weekday: firstweekday,
              spot: firstspot,
              fShift: firstfShift,
              sShift: firstsShift,
              tShift: firsttShift,
              total: firsttotal
            })
            let secondUN = usernames[1];
            let seconddate = req.body.secondmoDate;
            let secondweekday = req.body.secondweekday;
            let secondspot = req.body.secondspot;
            let secondfShift = req.body.secondfShift;
            let secondsShift = req.body.secondsShift;
            let secondtShift = req.body.secondtShift;
            let secondtotal = req.body.secondtotalM;
            const second = new MO({
              username: secondUN,
              date: seconddate,
              weekday: secondweekday,
              spot: secondspot,
              fShift: secondfShift,
              sShift: secondsShift,
              tShift: secondtShift,
              total: secondtotal
            })
            const fOD = await MO.findOne({username: firstUN, date: firstdate});
            const sOD = await MO.findOne({username: secondUN, date: seconddate});
            // if both data not found
            if (!fOD && !sOD) {
              if (firstspot > 0 && secondspot > 0) {
                const resultA = await first.save()
                const resultB = await second.save()
                if (resultA && resultB) {
                  res.redirect('/dash');
                } else {
                  res.send('Error on saving old data')
                }
              } else {
                if (firstspot > 0) {
                  const resultA = await first.save()
                  if (resultA) {
                    res.redirect('/dash');
                  } else {
                    res.send('Error on saving first opener data')
                  }
                } else if (secondspot > 0) {
                  const resultB = await second.save()
                  if (resultB) {
                    res.redirect('/dash');
                  } else {
                    res.send('Error on saving old data')
                  }
                } else {
                  res.send('Check spot fields')
                }
              }
            } else {
              // if found one and not another
              if (fOD && sOD) {
                console.log('found both existing')
                fOD.username = firstUN
                fOD.date = firstdate
                fOD.weekday = firstweekday
                fOD.spot = firstspot
                fOD.fShift = firstfShift
                fOD.sShift = firstsShift
                fOD.tShift = firsttShift
                fOD.total = firsttotal
                sOD.username = secondUN
                sOD.date = seconddate
                sOD.weekday = secondweekday
                sOD.spot = secondspot
                sOD.fShift = secondfShift
                sOD.sShift = secondsShift
                sOD.tShift = secondtShift
                sOD.total = secondtotal
                if (firstspot > 0 && secondspot > 0) {
                  const resultA = await fOD.save()
                  const resultB = await sOD.save()
                  if (resultA && resultB) {
                    res.redirect('/dash');
                  } else {
                    res.send('Error on saving old data')
                  }
                } else {
                  res.send('4th last Check spot fields')
                }
              } else if (fOD && !sOD) {
                fOD.username = firstUN
                fOD.date = firstdate
                fOD.weekday = firstweekday
                fOD.spot = firstspot
                fOD.fShift = firstfShift
                fOD.sShift = firstsShift
                fOD.tShift = firsttShift
                fOD.total = firsttotal
                if (firstspot > 0 && secondspot > 0) {
                  const resultA = await fOD.save()
                  const resultB = await second.save()
                  if (resultA && resultB) {
                    res.redirect('/dash');
                  } else {
                    res.send('Error on saving old data')
                  }
                } else if (firstspot > 0) {
                  const result = await fOD.save();
                  if (result) {
                    res.redirect('/dash')
                  } else {
                    res.send('Error on saving old data')
                  }
                } else {
                  res.send('4th last Check spot fields')
                }
              } else if (!fOD && sOD) {
                sOD.username = secondUN
                sOD.date = seconddate
                sOD.weekday = secondweekday
                sOD.spot = secondspot
                sOD.fShift = secondfShift
                sOD.sShift = secondsShift
                sOD.tShift = secondtShift
                sOD.total = secondtotal
                if (firstspot > 0 && secondspot > 0) {
                  const resultA = await first.save()
                  const resultB = await sOD.save()
                  if (resultA && resultB) {
                    res.redirect('/dash');
                  } else {
                    res.send('Error on saving old data')
                  }
                } else if (secondspot > 0) {
                  const result = await sOD.save();
                  if (result) {
                    res.redirect('/dash')
                  } else {
                    res.send('Error on saving old data')
                  }
                } else {
                  res.send('4th last Check spot fields')
                }
              }
            }
          } else {
            // for single opener
            let date = req.body.moDate;
            let weekday = req.body.weekday;
            let spot = req.body.spot;
            let fShift = req.body.fShift;
            let sShift = req.body.sShift;
            let tShift = req.body.tShift;
            let total = req.body.totalM;
            const data = new MO({
                username: usernames[0],
                date: date,
                weekday: weekday,
                spot: spot,
                fShift: fShift,
                sShift: sShift,
                tShift: tShift,
                total: total
            })
            const oldData = await MO.findOne({username: usernames[0], date: date});
            if (!oldData) {
              if (spot > 0) {
                const result = await data.save()
                if (result) {
                  res.redirect('/dash')
                } else {
                  res.send('Error on saving old data')
                }
              } else {
                res.send('2nd last Check spot field')
              }
            } else {
              oldData.username = usernames[0]
              oldData.date = date
              oldData.weekday = weekday
              oldData.spot = spot
              oldData.fShift = fShift
              oldData.sShift = sShift
              oldData.tShift = tShift
              oldData.total = total
              if (spot > 0) {
                const result = await oldData.save()
                if (result) {
                  res.redirect('/dash')
                } else {
                  res.send('Error on saving old data')
                }
              } else {
                res.send('last Check spot field')
              }
            }
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

