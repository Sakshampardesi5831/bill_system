import { axiosInstance } from "./apiConfig";
import { ApiServiceConfig } from "./apiService";
export async function SaveBillInformation(data) {
  try {
    const result = await axiosInstance.post(
      ApiServiceConfig.saveBillDetails,
      data
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllBillDetails() {
  try {
    const result = await axiosInstance.get(ApiServiceConfig.getAllBillDetails);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function uploadImages(file) {
  try {
    const result = await axiosInstance.post(ApiServiceConfig.uploadImages, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {url:result.data.url,message:result.data.message};
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBillDetails(id) {
  try {
    const result = await axiosInstance.get(`${ApiServiceConfig.deleteBills}/${id}`);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}