"use client";

import React, {useEffect, useState} from 'react';
import List from "@/components/list";

export default function BlocksPage() {
    const [blocks, setBlocks] = useState(null)
    
    useEffect(() => {
        async function fetchBlocks() {
            let res = await fetch('/api/blocks')
            let data = await res.json()
            setBlocks(data)
        }

        fetchBlocks().then()
    }, [])

    return (
        <List items={blocks} newItemLink={'/admin/blocks/new'}/>
    )
};