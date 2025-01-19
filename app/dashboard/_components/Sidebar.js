import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Layout, Shield} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import UploadPdf from "@/app/dashboard/_components/UploadPdf";


function  Sidebar() {
    return (
        <div className="shadow-md h-screen p-7">
        <Image src={'/logo.svg'} alt="logo" height={120} width={170} />


            <div className="mt-10">

                <UploadPdf>
                    <Button className="w-full"> +  Upload PDF</Button>
                </UploadPdf>
                <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <Layout/>
                    <h2>WorkSpace</h2>
                </div>


                <div className="flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <Shield/>
                    <h2>Upgrade</h2>
                </div>
            </div>

            <div className="absolute bottom-24 w-[80%]">
                <Progress value={30} />
                <p className="text-sm mt-1">2 out of 5 Pdf Uploaded</p>
                <p className="text-sm mt-2 text-gray-400">Upgrade to Upload more PDF</p>
            </div>

        </div>
    )
}

export default Sidebar;