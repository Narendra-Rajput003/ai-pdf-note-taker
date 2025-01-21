"use client";
import UploadPdfDialog from "./UploadPdfDialog";

function UploadPdf({ children }) {
    return (
        <div className="p-4 ">
            <UploadPdfDialog>{children}</UploadPdfDialog>
        </div>
    );
}

export default UploadPdf;