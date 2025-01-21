"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import useUploadPdf from "./useUploadPdf";

function UploadPdfDialog({ children }) {
    const {
        file,
        fileName,
        loading,
        error,
        onFileSelect,
        onUploadButton,
        setFileName,
        setOpen,
        open
    } = useUploadPdf();

    return (
        <Dialog open={open}>
            <DialogTrigger asChild onClick={()=>setOpen(true)} className="w-full">{children}</DialogTrigger>
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
                            <Loader2Icon className="animate-spin h-5 w-5" />
                        ) : (
                            'Upload PDF'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UploadPdfDialog;