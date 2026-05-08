// AWS S3 / Cloudflare R2 storage configuration for the admin-core system.

export interface StorageConfig {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  region?: string;
  endpoint?: string;
}

/**
 * Get storage configuration from environment variables.
 */
export function getStorageConfig(): StorageConfig {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_S3_BUCKET || process.env.R2_BUCKET_NAME;
  const region = process.env.AWS_REGION || "us-east-1";
  const endpoint = process.env.R2_ENDPOINT;

  if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error(
      "Storage configuration incomplete. Check your .env file for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and bucket name."
    );
  }

  return { accessKeyId, secretAccessKey, bucketName, region, endpoint };
}

/**
 * Check if storage is configured.
 */
export function isStorageConfigured(): boolean {
  return (
    Boolean(process.env.AWS_ACCESS_KEY_ID) &&
    Boolean(process.env.AWS_SECRET_ACCESS_KEY) &&
    Boolean(process.env.AWS_S3_BUCKET || process.env.R2_BUCKET_NAME)
  );
}

/**
 * Allowed file types for uploads.
 */
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
];

/**
 * Maximum file size in bytes (10 MB).
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * S3 signed URL expiration time in seconds.
 */
export const SIGNED_URL_EXPIRATION = 3600; // 1 hour
