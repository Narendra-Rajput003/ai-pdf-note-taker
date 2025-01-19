"use client";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {AddFileToDB, getFileUrl} from "@/convex/fileStorage";
import uuid4 from "uuid4";
import {useUser} from "@clerk/nextjs";

function UploadPdf({children}) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const InsertFileToDB = useMutation(api.fileStorage.AddFileToDB);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);

    const {user} = useUser();
    const fileId=uuid4()
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
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

            const {storageId} = await result.json();


            const fileUrl = await getFileUrl({storageId:storageId});

            //insert url into db

            const resp= await InsertFileToDB({
                fileId:fileId,
                storageId:storageId,
                fileName: fileName ? fileName : "",
                fileUrl:fileUrl,
                createdBy:user?.primaryEmailAddress?.emailAddress,

            })

        } catch (err) {
            setError("An error occurred while uploading the file. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-10">
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Upload PDF File</DialogTitle>
                        <DialogDescription className="mt-2">
                            <div className="space-y-4">
                                <h2 className="text-sm font-medium">Select a file to upload</h2>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={onFileSelect}
                                        className="p-2 border rounded-lg"
                                        aria-label="Select PDF file"
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">File Name *</label>
                                    <Input
                                        placeholder="Enter file name"
                                        value={fileName}
                                        onChange={(e) => setFileName(e.target.value)}
                                        required
                                        className="w-full"
                                        aria-label="Enter file name"
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="w-full sm:w-auto">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={onUploadButton}
                            disabled={loading}
                            className="w-full sm:w-auto"
                        >
                            {loading ? (
                                <Loader2Icon className="animate-spin h-5 w-5"/>
                            ) : (
                                'Upload PDF'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UploadPdf;