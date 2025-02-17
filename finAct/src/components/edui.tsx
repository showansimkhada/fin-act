import { formatDate } from "@/lib/funcPage";
import { IBS } from "@/lib/utils/models/bsModel";
import { IUSER } from "@/lib/utils/models/userModel";
import { ObjectId } from "mongoose";
import { Form } from "react-bootstrap";

export default function EDUI(str: ObjectId, data: IBS, dataUser: IUSER[], editInput: boolean) {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center mt-5 pt-2 w-100'>
            <Form action={`api/bs/?type=deleteD&id=${str}`} method='post' className="border border-5">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-between align-content-between">
                        <label className="border border-1 px-4">Date</label>
                        <label className="border border-1 px-4">{dataUser[0]?.firstname}'s WI</label>
                        <label className="border border-1 px-4">{dataUser[0]?.sfirstname}'s WI</label>
                        <label className="border border-1 px-4">Return</label>
                        <label className="border border-1 px-4">Opening Balance</label>
                        <label className="border border-1 px-4">Closing Balance</label>
                        <label className="border border-1 px-4">Weekly Spent</label>
                        <label className="border border-1 px-4">Weekly Save</label>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-content-between">
                        <input value={formatDate(data.year.toString() + '/' + data.month.toString() + '/' + data.date.toString(), 1)} readOnly={editInput}/>
                        <input value={data.fWI.toString()} readOnly={editInput}/>
                        <input value={data.sWI.toString()} readOnly={editInput}/>
                        <input value={data.return.toString()} readOnly={editInput}/>
                        <input value={data.openingBalance.toString()} readOnly={editInput}/>
                        <input value={data.closingBalance.toString()} readOnly={editInput}/>
                        <input value={data.weeklySpent.toString()} readOnly={editInput}/>
                        <input className="d-flex flex-row justify-content-between" value={data.weeklySave.toString()} readOnly={editInput}/>
                    </div>
                </div>
                <div className='d-flex flex-row justify-content-center'>
                    <input className='btn btn-warning w-25' type='button' value='Edit'/>
                    <input className='btn btn-success w-75'type='button' value='Save'/>
                    <input className='btn btn-danger w-25' type='submit' value='Delete'/>
                </div>
            </Form>
        </div>
    )
}