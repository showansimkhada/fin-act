import { fetchLastBS } from "@/api/bs";
import { auth } from '@/api/auth'
import { Dash } from "@/forms/dash";
import { Suspense } from "react";
import { fetchDetails } from "@/api/users";

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const bs = await fetchLastBS(user);
  const username = await fetchDetails(user);
  const data = {
    username: bs.username,
    year: bs.year,
    month: bs.month,
    date: bs.date,
    fWI: bs.fWI,
    sWI: bs.sWI,
    return: bs.return,
    openingBalance: bs.openingBalance,
    closingBalance: bs.closingBalance,
    weeklySpent: bs.weeklySpent,
    weeklySave: bs.weeklySave,
  }
  return (
    <Suspense>
      <Dash data={{data, username}}/>
    </Suspense>
  )
}