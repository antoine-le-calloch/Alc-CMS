"use client";

import React, {useEffect, useState} from 'react';
import TopBar from "@/components/layout/TopBar";
import PillList from "@/components/list/PillList";
import Loading from "@/components/utils/Loading";
import PageList from "@/components/list/PageList";

export default function HomePage() {
    const [pages, setPages] = useState(null)
    const [blocks, setBlocks] = useState(null)

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
    
    return (
        <div>
            <TopBar titleName={"Dashboard"}/>
            <div className="container pt-6">
                <div className="flex justify-around text-center">
                    <div className="flex flex-col items-center">
                        <h2 className="mb-4 font-bold">
                            PAGES
                        </h2>
                        { pages === null ? 
                            <Loading/> : <PageList items={pages} itemLink="pages"/>
                        }
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="mb-4 font-bold">
                            BLOCKS
                        </h2>
                        {blocks === null ?
                            <Loading/> : <PillList items={blocks} itemLink="blocks"/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};