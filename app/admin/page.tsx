"use client";

import React, {useEffect, useState} from 'react';
import TopBar from "@/components/layout/TopBar";
import Loading from "@/components/utils/Loading";
import PageList from "@/components/dashboard/PageList";
import BlockList from "@/components/dashboard/BlockList";
import {savePage} from "@/components/services/SavePage";

export default function HomePage() {
    const [pages, setPages] = useState<Page[] | null>(null)
    const [blocks, setBlocks] = useState<Block[] | null>(null)
    const [dragOver, setDragOver] = useState(false);

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
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!e.dataTransfer.getData("blockIndex")) return;
        setDragOver(true);
    }
    
    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const blockIndex = e.dataTransfer.getData("blockIndex");
        const pageToUpdate = pages?.find((page: Page) => page.id === e.dataTransfer.getData("pageId"));
        if (!blockIndex || !pageToUpdate) return;
        
        pageToUpdate.blocks = pageToUpdate.blocks.filter((_: Block, index: number) => index !== parseInt(blockIndex));
        try {
            await savePage(pageToUpdate, true);
            window.location.href = '/admin/';
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message);
        }
    }
    
    return (
        <div>
            <TopBar titleName={"Dashboard"}/>
            <div className={`container pt-6 background ${dragOver ? "bg-gray-700" : ""}`} onDrop={onDrop} onDragOver={onDragOver}>
                <div className="flex justify-around text-center">
                    <div className="flex flex-col items-center">
                        <h2 className="mb-4 font-bold">
                            PAGES
                        </h2>
                        { pages === null ? 
                            <Loading/> : <PageList pages={pages} editPageLink="pages/edit" addPageLink="pages/new" blocks={blocks}/>
                        }
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="mb-4 font-bold">
                            BLOCKS
                        </h2>
                        {blocks === null ?
                            <Loading/> : <BlockList blocks={blocks} editBlockLink="blocks/edit" addBlockLink="blocks/new"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};