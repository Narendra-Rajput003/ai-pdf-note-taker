"use client";
import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import uuid4 from "uuid4";

export default function useUploadPdf() {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const InsertFileToDB = useMutation(api.fileStorage.AddFileToDB);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const embeddDocument = useAction(api.myAction.ingest);

    const { user } = useUser();
    const fileId = uuid4();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [error, setError] = useState("");

    const onFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Please select a valid PDF file.");
            setFile(null);
        }
    };

    const onUploadButton = async () => {
        if (!file || !fileName) {
            setError("Please select a file and enter a file name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            if (!result.ok) {
                throw new Error("Failed to upload file.");
            }

            const { storageId } = await result.json();
            const fileUrl = await getFileUrl({ storageId });

            await InsertFileToDB({
                fileId,
                storageId,
                fileName: fileName ? fileName : "",
                fileUrl,
                createdBy: user?.primaryEmailAddress?.emailAddress,
            });

            const ApiResponse = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);

            await embeddDocument({
                splitText: ApiResponse.data.result,
                fileId,
            });

         setOpen(false);
        } catch (err) {
            setError("An error occurred while uploading the file. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        file,
        fileName,
        loading,
        error,
        onFileSelect,
        onUploadButton,
        setFileName,
        setOpen,
        open
    };
}