import { TrashIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import useFileUpload from "../../../hooks/useFileUpload";
import { extractFileNameFromLink } from "../../../utils";

interface Props {
  id: string;
  setProductMediaUrl: (url: string) => void;
  isEditing?: boolean;
  originalUrl?: string;
}

const ProductMediaInput = ({
  id,
  setProductMediaUrl,
  isEditing,
  originalUrl,
}: Props) => {
  const [imageLink, setImageLink] = useState<string>();
  const [file, setFile] = useState<File>();
  const { loading, fileUrl, uploadFiles, deleteFile } = useFileUpload();
  const init = useRef({ setProductMediaUrl });

  useEffect(() => {
    const { setProductMediaUrl } = init.current;
    if (isEditing && originalUrl) {
      setProductMediaUrl(originalUrl as string);
      setImageLink(originalUrl);
      const newFile = new File(
        [],
        extractFileNameFromLink(originalUrl as string, "media")
      );
      setFile(newFile);
    }
  }, [isEditing, originalUrl]);

  useEffect(() => {
    const { setProductMediaUrl } = init.current;
    if (!loading && fileUrl) {
      setImageLink(fileUrl);
      setProductMediaUrl(fileUrl);
    }
  }, [loading, fileUrl]);

  const onFileInputChange = async (
    e: { target: { files: any } },
    folder: string
  ) => {
    setFile(e.target.files[0]);
    await uploadFiles(folder, e.target.files[0]);
  };

  return (
    <>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 "
            >
              <p className="text-center">Upload a file</p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only hidden"
                onChange={async (e: any) => {
                  await onFileInputChange(
                    e,
                    `${id}/media/${e?.target?.files[0]?.name}`
                  );
                }}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {imageLink && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 mt-3">
          <div className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <img
                src={imageLink}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75"
              />
            </div>

            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
              {file?.name}
            </p>
            <span
              className="md cursor-pointer hover:opacity-80 text-xs flex items-center justify-start"
              onClick={(e) => {
                deleteFile(`${id}/media/${file?.name}`);
                setProductMediaUrl("");
                setFile(undefined);
              }}
            >
              <TrashIcon className="mr-2 text-red-500 h-4 w-4" />{" "}
            </span>
          </div>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 mt-3">
          <div className="relative">
            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <div className="flex w-10 h-7 justify-center items-center">
                <AiOutlineLoading className="h-6 w-6 animate-spin mx-auto text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductMediaInput;
