import { NextResponse } from "next/server";
import { connection } from "@/models/connect";
import { generateInsertQuery } from "@/helper/commonfunction";
export async function POST(request) {
  try {
    const reqJsonObject = await request.json();
    const savingObject = {
      user_commodity: reqJsonObject.commodity,
      order_quantity: reqJsonObject.orderQuantity,
      purchase_rate: reqJsonObject.purchaseRate,
      transportation_cost: reqJsonObject.transportationCost,
      advance_to_farmer: reqJsonObject.advanceToFarmer,
      payment_deduction: reqJsonObject.paymentDeduction,
      net_profit: reqJsonObject.netProfit,
      total_cost_profit: reqJsonObject.totalCost,
      sales_rate: reqJsonObject.salesRate,
      image_url: reqJsonObject.url,
    };
    const sql = generateInsertQuery("bill_details", savingObject);
    const values = Object.values(savingObject);
    console.log(sql, values);
    const mysqlConnection = await connection();
    const resultData = await mysqlConnection.execute(sql, values);
    return NextResponse.json({
      message: "Bill details saved successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
