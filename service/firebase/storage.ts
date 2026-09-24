import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./config";

/**
 * Upload a file to Firebase Storage and return the public download URL.
 */
export async function uploadFile(
  path: string,
  file: File | Blob
): Promise<{ url: string | null; error?: string }> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    console.error(`Storage upload error (${path}):`, message);
    return { url: null, error: message };
  }
}

/**
 * Delete a file from Firebase Storage.
 */
export async function deleteFile(
  path: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Delete failed";
    console.error(`Storage delete error (${path}):`, message);
    return { success: false, error: message };
  }
}
