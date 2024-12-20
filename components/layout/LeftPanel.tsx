import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

const LeftPanel = () => {
    return (
        <div className="flex flex-col justify-between items-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 h-screen p-4 shadow-xl w-[180px]">
            <Link href={"/admin"}
                  className="hover:scale-110 duration-700 ease-in-out">
                <Image src="/logo/logo_alc.png" alt="Logo" width={70} height={70}/>
            </Link>
            <div className="flex flex-col items-center gap-y-4 text-center text-xl mx-2 font-bold">
                <Link href={"/admin/pages"}
                      className="border-2 border-transparent rounded-full p-3
                      hover:border-white duration-500 ease-in-out">
                    PAGES
                </Link>
                <Link href={"/admin/blocks"}
                      className="border-2 border-transparent rounded-full p-3
                      hover:border-white duration-500 ease-in-out">
                    BLOCKS
                </Link>
            </div>
            <div className="h-[70px] flex items-center">
                <Link href={"/admin/settings"}>
                    <Cog6ToothIcon className="size-7 rotate-on-hover"/>
                </Link>
            </div>
        </div>
    );
};

export default LeftPanel;