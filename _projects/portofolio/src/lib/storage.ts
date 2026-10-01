import fs from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export interface UploadResult {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export async function saveUploadedFile(file: File): Promise<UploadResult> {
  // 1. Validation
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error(
      `Unsupported file type: ${file.type}. Allowed formats: JPG, JPEG, PNG, WEBP, SVG.`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds 10MB limit: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
  }

  // 2. Sanitize and build unique filename
  const extension = path.extname(file.name) || `.${file.type.split("/")[1] || "png"}`;
  const baseName = path
    .basename(file.name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);

  const uniqueFileName = `${baseName}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${extension}`;

  // 3. Optional Remote Cloud Storage Adapter (Supabase / S3 / Cloudinary)
  if (process.env.STORAGE_URL && process.env.STORAGE_KEY) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadEndpoint = `${process.env.STORAGE_URL}/object/portfolio-media/${uniqueFileName}`;
      const res = await fetch(uploadEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STORAGE_KEY}`,
          "Content-Type": file.type,
        },
        body: buffer,
      });

      if (res.ok) {
        return {
          fileName: uniqueFileName,
          fileUrl: `${process.env.STORAGE_URL}/object/public/portfolio-media/${uniqueFileName}`,
          fileType: file.type,
          fileSize: file.size,
        };
      }
    } catch (err) {
      console.warn("Cloud storage upload fallback to local storage:", err);
    }
  }

  // 4. Default Persistent Local Storage in public/uploads/
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filePath = path.join(uploadsDir, uniqueFileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return {
    fileName: uniqueFileName,
    fileUrl: `/uploads/${uniqueFileName}`,
    fileType: file.type,
    fileSize: file.size,
  };
}

export async function deleteUploadedFile(fileUrl: string): Promise<boolean> {
  try {
    if (fileUrl.startsWith("/uploads/")) {
      const fileName = path.basename(fileUrl);
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);
      await fs.unlink(filePath).catch(() => {});
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
