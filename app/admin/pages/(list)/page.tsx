"use client";

import React, {useEffect, useState} from 'react';
import LinearList from "@/components/list/linearList";

export default function PagesPage() {
    const [pages, setPages] = useState(null)

    useEffect(() => {
        async function fetchPages() {
            let res = await fetch('/api/pages')
            let data = await res.json()
            setPages(data)
        }
        fetchPages().then()
    }, [])

    return (
        <LinearList items={pages} newItemLink={'/admin/pages/new'}/>
    )
};