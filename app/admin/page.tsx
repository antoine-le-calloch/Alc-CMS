"use client";

import React, {useEffect, useState} from 'react';
import {TopBar} from "@/components";
import {PlusIcon} from "@heroicons/react/24/solid";

export default function AdminPage() {
    const [pages, setPages] = useState([])
    const [components, setComponents] = useState([])

    useEffect(() => {
        async function fetchPages() {
            let res = await fetch('/api/pages')
            let data = await res.json()
            setPages(data)
        }
        async function fetchComponents() {
            let res = await fetch('/api/components')
            let data = await res.json()
            setComponents(data)
        }
        fetchPages()
        fetchComponents()
    }, [])
    
    return (
        <div>
            <TopBar titleName={"Dashboard"}/>
            <div className="container pt-6">
                <div className="flex justify-around text-center">
                    <div>
                        <h1 className="mb-4">
                            PAGES
                        </h1>
                        <div>
                            {
                                pages.map((page: any, index: number) => (
                                    <div key={index} className="border border-gray-200 rounded-lg py-2 px-12 mb-2">
                                        {page.title}
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <a href={"/admin/page/create"}>
                                <PlusIcon className="h-5 w-5 inline-block mr-2"/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-4">
                            COMPONENTS
                        </h1>
                        <div>
                            {
                                components.map((component: any, index: number) => (
                                    <div key={index} className="border border-gray-200 rounded-lg py-2 px-12 mb-2">
                                        {component.title}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};