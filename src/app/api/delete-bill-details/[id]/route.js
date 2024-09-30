import { NextResponse } from "next/server";
import { connection } from "@/models/connect";
export async function GET(request,{params}) {
    try {
        const {id}=params;
        const mysqlConnection=await connection();
        const sql=`DELETE FROM bill_details WHERE id=${Number(id)}`
        const resultData = await mysqlConnection.execute(sql);
        return NextResponse.json({ message: "Deleted SuccessFully"},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}