import {UserButton} from "@clerk/nextjs";
import Image from "next/image";


function  WorkSpaceHeader() {
    return (
        <div className="flex justify-between shadow-lg p-5">
            <Image src={'/logo.svg'} alt="logo" width={170} height={170}/>
            <UserButton/>
        </div>
    )
}
export  default WorkSpaceHeader;