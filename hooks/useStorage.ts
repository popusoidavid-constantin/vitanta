import { id, storage } from "@/appwrite";
import { HookResponse } from "@/models/types";
import { useCallback } from "react";

const useStorage = () => {
  const uploadFile = useCallback(
    async (bucket_id: string, fileUri: string, name?: string, size?: number, type?: string): Promise<HookResponse> => {
      try {
        const file = {
          name: name ? name : new Date().toISOString(),
          type: type ? type : "image/png",
          size: size ? size : 0,
          uri: fileUri,
        };

        const response = await storage.createFile(bucket_id, id.unique(), file);

        return {
          success: true,
          message: "Image uploaded successfully!",
          data: response.$id,
        };
      } catch (error: any) {
        console.log("Error uploading file", error);
        return {
          success: false,
          message: error.message,
          data: null,
        };
      }
    },
    []
  );

  const getImageView = useCallback(async (bucketId: string, fileId: string): Promise<HookResponse> => {
    try {
      const response = await storage.getFileViewURL(bucketId, fileId);

      return {
        success: true,
        message: "Success!",
        data: response.href,
      };
    } catch (error: any) {
      console.log("Error Getting the file preview: ", error);
      return {
        success: false,
        message: "Beim Abrufen der Bildvorschau ist ein Fehler aufgetreten.",
        data: null,
      };
    }
  }, []);

  return { uploadFile, getImageView };
};

export default useStorage;
