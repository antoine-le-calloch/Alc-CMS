"use client";

import React, {useEffect, useState} from 'react';
import LinearList from "@/components/list/LinearList";

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
        <LinearList items={blocks} itemLink={'blocks'}/>
    )
};