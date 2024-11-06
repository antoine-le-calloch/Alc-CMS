"use client";

import React, {useEffect, useState} from 'react';
import {TopBar} from "@/components";
import DashboardList from "@/components/dashboard/dashboardList";
import Loading from "@/components/utils/loading";

export default function AdminPage() {
    const [pages, setPages] = useState(null)
    const [components, setComponents] = useState(null)

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
                        { pages === null ? 
                            <Loading/> : <DashboardList items={pages} plusLink={"/admin/pages/new"}/>
                        }
                    </div>
                    <div>
                        <h1 className="mb-4">
                            COMPONENTS
                        </h1>
                        { components === null ?
                            <Loading/> : <DashboardList items={components} plusLink={"/admin/components/new"}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};