"use client";

import React, { useEffect, useState } from 'react';

import TopBar from "@/components/layout/TopBar";
import Loading from "@/components/utils/Loading";
import PageList from "@/components/dashboard/pages/PageList";
import BlockList from "@/components/dashboard/blocks/BlockList";
import { savePage } from "@/components/services/SavePage";

import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
    const [pages, setPages] = useState<Page[] | null>(null)
    const [blocks, setBlocks] = useState<Block[] | null>(null)
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        async function fetchPages() {
            let res = await fetch('/api/pages')
            let data = await res.json()
            setPages(data)
        }
        async function fetchBlocks() {
            let res = await fetch('/api/blocks')
            let data = await res.json()
            setBlocks(data)
        }
        fetchPages().then()
        fetchBlocks().then()
    }, [])
    
    const isDragFromPages = (e: React.DragEvent<HTMLDivElement>) =>  
        !!e.dataTransfer.getData("itemIndex");
    
    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemIndex = e.dataTransfer.getData("itemIndex");
        if (!itemIndex) return;
        
        const pageToUpdate = pages?.find((page: Page) => page.id === e.dataTransfer.getData("pageId"));
        if (!pageToUpdate) return;
        
        pageToUpdate.items = pageToUpdate.items.filter((_, index) => index !== parseInt(itemIndex));
        try {
            await savePage(pageToUpdate, true);
            toast.success("Block successfully deleted from the page");
        } catch (error: any) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    }
    
    return (
        <div>
            <TopBar titleName="Dashboard"/>
            <div className="relative">
                <div className={`${isDragOver ? "opacity-50" : "opacity-0"} absolute bg-gray-400 top-0 left-0 
                w-full h-full flex items-center justify-center`}
                     onDragEnter={(e) => setIsDragOver(isDragFromPages(e))}
                     onDragLeave={() => setIsDragOver(false)}
                     onDragOver={(e) => e.preventDefault()}
                     onDrop={onDrop}>
                    <TrashIcon className="h-10 w-10 text-gray-300"/>
                </div>
                <div className="container pt-6 background">
                    <div className="flex justify-around text-center">
                        <div className="flex flex-col items-center">
                            <h2 className="mb-4 font-bold">
                                PAGES
                            </h2>
                            <div className="z-10">
                                { pages === null || blocks === null ?
                                    <Loading/> : <PageList pages={pages} blocks={blocks} editPageLink="pages/edit" addPageLink="pages/new"/>
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className="mb-4 font-bold">
                                BLOCKS
                            </h2>
                            <div className="z-10">
                                {blocks === null ?
                                    <Loading/> : <BlockList blocks={blocks} editBlockLink="blocks/edit" addBlockLink="blocks/new"/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};