
"use client";
import React, { Fragment, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { billFormSchema } from "@/schema/billformschema";
import {
  calculationForBill,
  convertValuesToNumbers,
} from "@/helper/commonfunction";
import { SaveBillInformation, uploadImages } from "@/service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


const BillForm = () => {
  const [previewFormData, setPreviewFormData] = useState({});
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [previewLink, setPreviewLink] = useState("");
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      commodity: "",
      order_quantity: "",
      purchase_rate: "",
      transportation_cost: "",
      advance_to_farmer: "",
      payment_deduction: "",
      net_profit: "",
    },
  });
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImageUploadLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadImages(formData);
        setPreviewLink(response.url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image.");
      } finally {
        setIsImageUploadLoading(false);
      }
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      for (let key in data) {
        if (key !== "commodity") {
          data[key] = Number(data[key]);
        }
      }
      const calculationResult = calculationForBill(data);
      let billForm = {
        commodity: data.commodity,
        orderQuantity: data.order_quantity,
        purchaseRate: data.purchase_rate,
        transportationCost: data.transportation_cost,
        advanceToFarmer: data.advance_to_farmer,
        paymentDeduction: data.payment_deduction,
        netProfit: data.net_profit,
        totalCost: calculationResult.TotalSales,
        salesRate: calculationResult.salesRate,
        url: previewLink,
      };
      const saveBillFormValue = await SaveBillInformation(billForm);
      toast.success("Form submitted successFully!!!");
      methods.reset();
      router.push("/billdata");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleConfirmSubmit = () => {
    setPopoverOpen(false); // Close the popover
    methods.handleSubmit(onSubmit)(); // Submit the form
  };
  const handlePreviewSubmit = () => {
    const data = methods.getValues();
    console.log(data);
    const convertedValues = convertValuesToNumbers(data);
    const resultData = calculationForBill(convertedValues);
    setPreviewFormData({
      commodity: data.commodity,
      orderQuantity: data.order_quantity,
      purchaseRate: data.purchase_rate,
      transportationCost: data.transportation_cost,
      advanceToFarmer: data.advance_to_farmer,
      paymentDeduction: data.payment_deduction,
      netProfit: data.net_profit,
      totalCost: resultData.TotalSales,
      salesRate: resultData.salesRate,
    });
    setPopoverOpen(true);
  };

  return (
    <Fragment>
      <div className="bg-white shadow-md rounded-lg w-full  p-6 space-y-8 mx-auto mt-10 lg:w-[900px] md:w-[500px] sm:w-[400px] ">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Bill Form</h1>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {/* Flex Container for Two Sections */}
            <div className="flex flex-col md:flex-row md:space-x-6 lg:flex-row xl:flex-row">
              {/* First Section */}
              <div className="flex-1 space-y-4">
                <FormField
                  control={methods.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Upload you Images Here
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Upload Your Images Here"
                          onChange={(e) => {
                            field.onChange(e); // Update form field value
                            handleImageUpload(e); // Call image upload API
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {isImageUploadLoading ? (
                        <div className="flex items-center justify-start">
                          <Loader2 className="h-4 w-4 text-black animate-spin" />
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm px-2">
                            Your Uploaded Image is Here :-{" "}
                            <a
                              className="text-black font-bold"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`${previewLink}`}
                            >
                              {previewLink === "" ? "No Link" : "Link"}
                            </a>
                          </p>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="commodity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Commodity
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-black">
                            <SelectValue placeholder="Select Commodity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="Moog dal">Moog Dal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="order_quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Order Quantity (Tonnes)
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter order quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="purchase_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Purchase Rate
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter purchase rate"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Partition Line */}
              <div className="w-[2px] bg-gray-300"></div>
              {/* Second Section */}
              <div className="flex-1 space-y-4">
                <FormField
                  control={methods.control}
                  name="transportation_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Transportation Cost
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter transportation cost"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="advance_to_farmer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Advance to Farmer
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter advance to farmer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="payment_deduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Payment Deduction
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                          placeholder="Enter payment deduction"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={methods.control}
                  name="net_profit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Net Profit
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                          placeholder="Enter Net Profit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={methods.control}
                  name="total_bill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-gray-700">
                        Total Bill
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                          placeholder="Enter total bill amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>
            {/* Submit Button */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="w-full py-3 text-white rounded-md font-semibold hover:bg-black transition-all"
                  onClick={handlePreviewSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 text-white" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-[300px]  text-left bg-black ">
                <h2 className="text-white font-semibold">
                  Your Details With Total Amount{" "}
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold">
                    Selected Commodity :- {previewFormData.commodity}
                  </p>
                  <p className="text-white font-semibold">
                    Order Quantity :- {previewFormData.orderQuantity}{" "}
                  </p>
                  <p className="text-white font-semibold">
                    Purchase Rate :- {previewFormData.purchaseRate}
                  </p>
                  <p className="text-white font-semibold">
                    Transportation Cost :- {previewFormData.transportationCost}
                  </p>
                  <p className="text-white font-semibold">
                    Advance to Farmer :- {previewFormData.advanceToFarmer}
                  </p>
                  <p className="text-white font-semibold">
                    Payment Deduction :- {previewFormData.paymentDeduction}
                  </p>
                  <p className="text-white font-semibold">
                    Net Profit :- {previewFormData.netProfit}{" "}
                  </p>
                  <p className="text-white font-semibold">
                    Total Profit :- {previewFormData.totalCost}{" "}
                  </p>
                  <p className="text-white font-semibold">
                    Total Sales Rate :-RS {previewFormData.salesRate}/Kg
                  </p>
                </div>
                <p className=" text-white">Are you sure you want to submit?</p>
                <div className="mt-4 flex justify-around">
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleConfirmSubmit}
                  >
                    Yes
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => setPopoverOpen(false)}
                  >
                    No
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </form>
        </FormProvider>
      </div>
    </Fragment>
  );
};

export default BillForm;
{
  /* <Button
              type="submit"
              className="w-full py-3 text-white rounded-md font-semibold hover:bg-black transition-all"
            >
              Submit
            </Button> */
}
/**
     *  commodity,
      orderQuantity,
      purchaseRate,
      transportationCost,
      advanceToFarmer,
      paymentDeduction,
      netProfit,
      totalCost,
      salesRate,
     */
