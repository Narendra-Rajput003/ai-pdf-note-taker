"use client"

import { useState } from "react";

function PdfViewer({ fileUrl }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    if (!fileUrl) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-gray-100 text-red-500">
                <p>PDF URL not available. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="relative h-[90vh]">
            {/* Loading Indicator */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <p className="text-gray-500">Loading PDF...</p>
                </div>
            )}

            {/* PDF Iframe */}
            <iframe
                title="PDF Viewer"
                height="100%"
                width="100%"
                src={`${fileUrl}#toolbar=0`}
                className="h-full"
                onLoad={handleLoad}
            />
        </div>
    );
}

export default PdfViewer;
