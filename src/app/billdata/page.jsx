"use client";
import React, { Fragment, useEffect, useState } from "react";
import AllFormData from "./_components/allFormData";
import { deleteBillDetails, getAllBillDetails } from "@/service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const BillData = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [billAllData, setBillAllData] = useState([]);
  const [deleteBill, setDeleteBill] = useState();
  const getAllBillSystemData = async () => {
    setLoading(true);
    try {
      const result = await getAllBillDetails();
      console.log(result);
      if (result.status === 200) {
        setBillAllData(result.data.result);
        setLoading(false);
      } else {
        setBillAllData([]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteBillData = async () => {
    try {
      const result = await deleteBillDetails(deleteBill);
      if (result.status === 200) {
        toast.success(result.message);
        getAllBillSystemData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (deleteBill) {
      deleteBillData();
    }
  }, [deleteBill]);
  useEffect(() => {
    getAllBillSystemData();
  }, []);
  return (
    <Fragment>
      <div className=" w-full  bg-black p-5 flex flex-wrap  justify-start gap-2">
        <div className="w-full p-4 flex justify-between items-center">
          <h2 className="text-white text-3xl font-bold">All Saved Bill</h2>
          <Button
            onClick={() => router.push("/")}
            className="bg-white text-black text-xl font-bold hover:bg-white"
          >
            Back to Form
          </Button>
        </div>
        <Separator className="bg-white mb-2" />
        {loading ? (
          <div className="p-4 flex justify-center item-center">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        ) : billAllData.length > 0 ? (
          billAllData.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <AllFormData
                data={item}
                setDeleteBill={setDeleteBill}
                deleteBill={deleteBill}
              />
            </div>
          ))
        ) : (
          <div className="text-white font-bold text-2xl">
            <h2>No Form is Filled</h2>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BillData;
