import { Nav } from '@/pages/components/Nav'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BS() {
    
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

