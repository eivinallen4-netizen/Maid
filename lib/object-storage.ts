export interface ObjectStorageConfig {
  bucket?: string;
  region?: string;
}

export async function uploadToStorage(key: string, data: any): Promise<string> {
  return key;
}

export async function getStorageUrl(key: string): Promise<string> {
  return key;
}

export async function deleteStoredObject(key: string): Promise<void> {
  // noop
}

export async function uploadPhotoFileToStorage(file: File, path: string): Promise<string> {
  return path;
}

export function toPublicObjectUrl(path: string): string {
  return path;
}
