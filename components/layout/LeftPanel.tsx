import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

const LeftPanel = () => {
    return (
        <div className="min-w-36 h-screen">
            <div className="fixed shadow-xl w-36 h-screen hover:w-40 duration-500 ease-in-out z-30
            bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <div className="flex flex-col justify-between items-center p-4 h-full">
                    <Link href={"/admin"}
                          className="zoom-on-hover">
                        <Image src="/logo/logo_alc.png" alt="Logo" width={70} height={47}/>
                    </Link>
                    <div className="flex flex-col items-center gap-y-4 text-center text-xl mx-2 font-bold">
                        <Link href={"/admin/"}
                              className="border-2 border-transparent rounded-full p-3
                              hover:border-white duration-500 ease-in-out">
                            HOME
                        </Link>
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
            </div>
        </div>
    );
};

export default LeftPanel;
