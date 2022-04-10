import { CogIcon, TrashIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import useFileUpload from "../../../hooks/useFileUpload";
import useGetProductFile from "../../../hooks/useGetProductFile";
import { extractFileNameFromLink } from "../../../utils";

interface Props {
  productName?: string;
  setProductFileUrl: (url: string) => void;
  setProductName: (name: string) => void;
  id: string;
  setExt?: (ext: string) => void;
  isEditing?: boolean;
  fileId?: string;
}

const ProductFileInput = ({
  id,
  productName,
  setProductFileUrl,
  setProductName,
  setExt,
  isEditing,
  fileId,
}: Props) => {
  const [fileLink, setFileLink] = useState<string>();
  const [file, setFile] = useState<File>();
  const fileInput = useRef<HTMLInputElement>(null);
  const { loading, fileUrl, uploadFiles, deleteFile } = useFileUpload();
  const {
    loading: fileLoading,
    productFile,
    error,
  } = useGetProductFile(fileId);
  const init = useRef({ setProductFileUrl, setExt, setFile, setProductName });

  useEffect(() => {
    const { setProductFileUrl } = init.current;
    if (!loading && fileUrl) {
      setProductFileUrl(fileUrl as string);
      setFileLink(fileUrl as string);
    }
  }, [loading, fileUrl]);

  useEffect(() => {
    const { setExt, setFile, setProductName, setProductFileUrl } = init.current;
    if (productFile && !fileLoading) {
      setProductFileUrl(fileId as string);
      setFileLink(productFile.fileUrl);
      const filename = extractFileNameFromLink(productFile.fileUrl, "product");
      setProductName(filename);
      const newFile = new File([], filename);
      setFile(newFile);
      setExt && setExt(productFile.ext as string);
    }

    if (error) {
      setProductName("Error occured loading file");
      setFile(undefined);
    }
  }, [productFile, error, fileLoading, fileId]);

  const pickFile = () => {
    if (fileInput?.current) fileInput?.current.click();
  };

  const onFileInputChange = async (
    e: { target: { files: any } },
    folder: string
  ) => {
    setFile(e.target.files[0]);
    await uploadFiles(folder, e.target.files[0]);
    setExt && setExt(e.target.files[0]?.name?.split(".")[1]);
  };

  return (
    <div className="mt-1 flex items-center">
      <span className="p-2 bg-gray-100 text-sm rounded-sm mr-1 flex items-center">
        {productName}
        {fileLink && (
          <span
            className="cursor-pointer hover:opacity-80 text-xs flex items-center justify-start"
            onClick={(e) => {
              deleteFile(`${id}/product/${file?.name}`);
              setProductName("Product file deleted!");
              setFile(undefined);
            }}
          >
            <TrashIcon className="ml-2 text-red-500 h-4 w-4" />
          </span>
        )}
      </span>

      {(loading || fileLoading) && (
        <span className="p-2 bg-gray-100 text-sm rounded-sm text-green-300">
          <CogIcon className="h-6 w-6 animate-spin" />
        </span>
      )}

      <button
        type="button"
        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={pickFile}
      >
        Upload
        <input
          type="file"
          className="hidden sr-only"
          ref={fileInput as React.LegacyRef<HTMLInputElement>}
          onChange={async (e: any) => {
            await onFileInputChange(
              e,
              `${id}/product/${e?.target?.files[0]?.name}`
            );
            setProductName(e?.target?.files[0]?.name);
          }}
        />
      </button>
    </div>
  );
};

export default ProductFileInput;
