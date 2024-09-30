'use client'
import React, { Fragment } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Delete, Trash } from "lucide-react";
const AllFormData = ({data,deleteBill,setDeleteBill}) => {
  return (
    <Fragment>
       <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="bg-white rounded-md">
        <AccordionTrigger className="text-2xl font-bold p-3">{data.commodity}</AccordionTrigger>
        <AccordionContent className="p-2">
          <div className="flex flex-col">
             <img className="w-full h-60 p-3 rounded-md" src={data.url} alt="image_url" />
            <p className="text-[18px] font-bold"> Order Quantity: {data.orderQuantity} In Tonnes</p>
            <p className="text-[18px] font-bold"> Purchase Rate: {data.purchaseRate}</p>
            <p className="text-[18px] font-bold"> Payment Deduction : {data.paymentDeduction}</p>
            <p className="text-[18px] font-bold"> Advance to Farmer :{data.paymentDeduction}</p>
            <p className="text-[18px] font-bold"> Net Profit: {data.netProfit}</p>
            <p className="text-[18px] font-bold"> Total Cost : {data.totalCost}</p>
            <p className="text-[18px] font-bold"> Sales Rate: {data.salesRate.toFixed(2)}</p>
          </div>
          <div className="w-full p-2 flex justify-end">
             <Trash
              onClick={() => setDeleteBill(data.id)}
             />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </Fragment>
  );
};

export default AllFormData;
