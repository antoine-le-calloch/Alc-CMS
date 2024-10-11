"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/solid";

type Page = {
    title: string;
};

const PagesPage = () => {
    const [pages, setPages] = useState([])
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        async function fetchPosts() {
            let res = await fetch('/api/pages')
            let data = await res.json()
            setPages(data)
            if(data.length == 0)
                setMessage('No pages created yet !')
        }
        fetchPosts()
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center py-2">
                <h2>
                    List
                </h2>
                <Link href="/admin/dashboard/pages/new" 
                      className="rounded bg-blue-300 hover:bg-blue-400 py-1 px-2">
                    New
                </Link>
            </div>
            <div className="flex flex-col border-t border-gray-500">
                { pages.length === 0 ? (
                    <div className="my-4 text-center">{message}</div>
                ) : (
                    pages.map((post: Page, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 p-4">
                            <div className="font-bold">{post.title}</div>
                            <PlusIcon className="h-4 w-4 ml-2 text-gray-500" />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};

export default PagesPage;