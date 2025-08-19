import { formatDate } from "../lib/utils";
import { BS, User } from "../lib/definitions";
import { ObjectId } from "mongodb";

export default function EDUI(str: ObjectId, data: BS, dataUser: User[], editInput: boolean) {
    return (
        <div>
            <form action={`api/bs/?type=deleteD&id=${str}`} method='post'>
                <div>
                    <div>
                        <label>Date</label>
                        <label>{dataUser[0]?.firstname}'s WI</label>
                        <label>{dataUser[0]?.sfirstname}'s WI</label>
                        <label>Return</label>
                        <label>Opening Balance</label>
                        <label>Closing Balance</label>
                        <label>Weekly Spent</label>
                        <label>Weekly Save</label>
                    </div>
                    <div>
                        <input value={formatDate(data.year.toString() + '/' + data.month.toString() + '/' + data.date.toString(), 1)} readOnly={editInput}/>
                        <input value={data.fWI.toString()} readOnly={editInput}/>
                        <input value={data.sWI.toString()} readOnly={editInput}/>
                        <input value={data.return.toString()} readOnly={editInput}/>
                        <input value={data.openingBalance.toString()} readOnly={editInput}/>
                        <input value={data.closingBalance.toString()} readOnly={editInput}/>
                        <input value={data.weeklySpent.toString()} readOnly={editInput}/>
                        <input value={data.weeklySave.toString()} readOnly={editInput}/>
                    </div>
                </div>
                <div>
                    <input type='button' value='Edit'/>
                    <input type='button' value='Save'/>
                    <input type='submit' value='Delete'/>
                </div>
            </form>
        </div>
    )
}