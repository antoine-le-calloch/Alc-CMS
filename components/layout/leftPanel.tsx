import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

const LeftPanel = () => {
    return (
        <div className="flex flex-col justify-between items-center h-screen p-4 panel-color shadow-xl">
            <Link href={"/admin"}>
                <Image src="/logo/logo_ALC.png" alt="Logo" width={70} height={70}/>
            </Link>
            <div className="flex flex-col items-center gap-4 text-center text-xl mx-2">
                <Link href={"/admin/pages"}
                      className="relative hover:after:w-full after:absolute after:-bottom-0 after:left-0 after:bg-black 
                        after:h-0.5 after:transition-all after:duration-500 after:ease-in-out after:w-0">
                    PAGES
                </Link>
                <Link href={"/admin/components"}
                        className="relative hover:after:w-full after:absolute after:-bottom-0 after:left-0 after:bg-black 
                        after:h-0.5 after:transition-all after:duration-500 after:ease-in-out after:w-0">
                    COMPONENTS
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