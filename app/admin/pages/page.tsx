"use client";

import React, {useEffect, useState} from 'react';
import List from "@/components/list";

type Item = {
    title: string;
    infos: string;
};

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
        <List items={pages} newItemLink={'/admin/pages/new'}/>
    )
};