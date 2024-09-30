import {z} from 'zod';
export const billFormSchema = z.object({
  commodity: z.string().nonempty("Commodity is required"),
  order_quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Order Quantity must be a positive number",
    }),
  purchase_rate: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Purchase Rate must be a positive number",
    }),
  transportation_cost: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Transportation Cost must be zero or a positive number",
    }),
  advance_to_farmer: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Advance to Farmer must be zero or a positive number",
    }),
  payment_deduction: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Payment Deduction must be zero or a positive number",
    }),
  net_profit: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Net Profit must be zero or a positive number",
    }),
});
