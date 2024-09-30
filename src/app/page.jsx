"use client";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import BillForm from "./_components/bill-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-start min-h-screen  bg-black p-5">
        <div className="w-full p-4 flex justify-between items-center">
          <h2 className="text-white text-3xl font-bold">Submit Bill Form</h2>
          <Button
            onClick={() => router.push("/billdata")}
            className="bg-white text-black text-xl font-bold hover:bg-white"
          >
            Go to Saved Form
          </Button>
        </div>
        <Separator className="bg-white mb-2" />
        <BillForm />
      </div>
    </Fragment>
  );
};

export default HomePage;
