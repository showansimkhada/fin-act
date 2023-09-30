import { Nav } from '@/features/components/Nav'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSession } from 'next-auth/react'

export default function BS() {
    const { data: session, status } = useSession()
    console.log(session)
    if (status) {
        console.log('true')
    }
    return (
        <div>
            <Nav/>
            <div className="table-responsive-sm" style={{marginTop: "60px"}}>
                <table id="bsOutput" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Firstname</th>
                            <th>Second Name</th>
                            <th>Return</th>
                            <th>Opening Balance</th>
                            <th>Closing Balance</th>
                            <th>Weekly Spent</th>
                            <th>Weekly Save</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

