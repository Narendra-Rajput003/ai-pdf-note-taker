"use client";

import { useParams } from "next/navigation";
import WorkSpaceHeader from "@/app/workspace/_components/WorkSpace_Header";
import PdfViewer from "@/app/workspace/_components/Pdf_Viewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "@/app/workspace/_components/TextEditor";
import {GetFileInfo} from "@/convex/fileStorage";

function WorkSpace() {
    const { fileId } = useParams();

    // Fetch file info using `useQuery`
    const data = useQuery(api.fileStorage.GetFileInfo, { fileId });

    // Handle loading and error states
    if (!fileId) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg text-red-500">
                    Invalid file ID. Please check the URL and try again.
                </p>
            </div>
        );
    }

    if (data === undefined) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg">Loading file details...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg text-red-500">
                    Failed to fetch file details. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Workspace Header */}
            <WorkSpaceHeader />

            {/* Main Content */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Editor Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Text Editor</h2>
                        <TextEditor />
                    </div>

                    {/* PDF Viewer Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">PDF Viewer</h2>
                        <PdfViewer fileUrl={data?.fileUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkSpace;
