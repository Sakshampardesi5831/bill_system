import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
//const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH || "", "public/uploads");
const UPLOAD_DIR = path.resolve("/tmp/uploads");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
export async function POST(request) {
  try {
    let fileName = null;
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const body = Object.fromEntries(formData);
      const file = body.file || null;

      if (file instanceof Blob) {
        const buffer = Buffer.from(await file.arrayBuffer());

        if (!fs.existsSync(UPLOAD_DIR)) {
          fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }
        const originalFileName = file.name;
        const fileExtension = path.extname(originalFileName);
        fileName = `${uuidv4()}${fileExtension}`;
        fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
      }
    }
    const imageUrl = await uploadToCloudinaryAndDelete({
      path: path.join(UPLOAD_DIR, fileName),
    });
    console.log(imageUrl);

    return NextResponse.json({
      message: "Image Upload SuccessFully",
      name: fileName || "No file uploaded",
      url: imageUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail to Upload", data: error });
  }
}
function uploadToCloudinaryAndDelete(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: "samples" },
      (error, result) => {
        console.log(result);
        if (error) {
          console.log(error);
          reject(error);
        } else {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully");
            }
          });
          resolve(result.url);
        }
      }
    );
  });
}
