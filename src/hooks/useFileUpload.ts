import { useState } from "react";
import firebase from "../config/Firebase";

const useFileUpload = () => {
  const [fileUrl, setFileUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileExt, setFileExt] = useState("");

  // uploading files
  const uploadFiles = async (folder: string, file?: File) => {
    if (!file) return;
    setLoading(true);
    const ext = file.type.split("/")[1];
    setFileExt(ext);
    const { downloadUrl, uploadTask } = await firebase.uploadToStorage({
      file,
      folder,
    });
    const progress = Math.round(
      (uploadTask.task.snapshot.bytesTransferred /
        uploadTask.task.snapshot.totalBytes) *
        100
    );
    if (progress === 100) {
      setFileUrl(downloadUrl);
      setLoading(false);
      setProgress(progress);
    }
  };

  const deleteFile = async (fileName: string) => {
    await firebase.deleteFile(fileName);
    setFileUrl("");
  };

  return {
    fileUrl,
    loading,
    progress,
    uploadFiles,
    deleteFile,
    fileExt,
  };
};

export default useFileUpload;
