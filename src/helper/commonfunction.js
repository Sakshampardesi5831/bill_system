
export function generateInsertQuery(tableName, data) {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ");
    return `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  }

export const calculationForBill= (data)=>{
  let convertIntoKg = data.order_quantity * 1000;
    const totalPurchaseRate = convertIntoKg * data.purchase_rate;
    const totalTransPortationCost = convertIntoKg * data.transportation_cost;
    const advanceToFarmer = data.advance_to_farmer;
    const paymentToEmployee = data.payment_deduction;
    const TotalCost =
      totalPurchaseRate +
      totalTransPortationCost +
      paymentToEmployee +
      advanceToFarmer;
    const TotalSales = data.net_profit + TotalCost;
    const salesRate = TotalSales / convertIntoKg;
    return {TotalSales:TotalSales,salesRate:Number(salesRate.toFixed(2))}
}

export const convertValuesToNumbers=(data)=>{
  for (let key in data) {
    if (key !== "commodity") {
      data[key] = Number(data[key]);
    }
  }
  return data;
}
