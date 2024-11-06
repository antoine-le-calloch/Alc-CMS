"use client";

import React, {useEffect, useState} from 'react';
import List from "@/components/list";

type Page = {
    id: number;
    title: string;
};

export default function PagesPage() {
    const [pages, setPages] = useState([])

    useEffect(() => {
        async function fetchPages() {
            let res = await fetch('/api/pages')
            let data = await res.json()
            setPages(data)
        }
        fetchPages()
    }, [])

    return (
        <List items={pages} newItemLink={'/admin/pages/new'}/>
    )
};