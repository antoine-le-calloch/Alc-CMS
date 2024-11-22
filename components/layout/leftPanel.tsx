import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

const LeftPanel = () => {
    return (
        <div className="flex flex-col justify-between items-center h-screen p-4 panel-color shadow-xl w-[180px]">
            <Link href={"/admin"}
                  className="hover:scale-110 duration-700 ease-in-out">
                <Image src="/logo/logo_ALC.png" alt="Logo" width={70} height={70}/>
            </Link>
            <div className="flex flex-col items-center gap-y-8 text-center text-xl mx-2">
                <Link href={"/admin/pages"}
                      className="hover:text-gray-800 duration-500 ease-in-out">
                    PAGES
                </Link>
                <Link href={"/admin/blocks"}
                      className="hover:text-gray-800 duration-500 ease-in-out">
                    BLOCKS
                </Link>
            </div>
            <div className="h-[70px] flex items-center">
                <Link href="/">
                    <Cog6ToothIcon className="size-6"/>
                </Link>
            </div>
        </div>
    );
};

export default LeftPanel;