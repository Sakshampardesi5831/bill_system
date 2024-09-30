import { NextResponse } from "next/server";
import { connection } from "@/models/connect";
export async function GET(request) {
    try {
        const mysqlConnection=await connection();
        const sql=`SELECT id as id, user_commodity as commodity,order_quantity as orderQuantity,purchase_rate as purchaseRate,
         transportation_cost as transportationCost,advance_to_farmer as advanceToFarmer,payment_deduction as paymentDeduction,
         net_profit as netProfit,total_cost_profit as totalCost,sales_rate as salesRate,image_url as url
        FROM bill_details`
        const resultData = await mysqlConnection.execute(sql);
        return NextResponse.json({ message: "Fetch SuccessFully",result:resultData[0] });
    } catch (error) {
        return NextResponse.error({ error: error.message }, { status: 500 });
    }
}