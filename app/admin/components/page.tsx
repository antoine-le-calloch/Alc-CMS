"use client";

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {MinusCircleIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import Button from "@/components/utils/button";

type Component = {
    id: string;
    title: string;
    html: string;
};

export default function ComponentsPage() {
    const [components, setComponents] = useState([])
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        async function fetchComponents() {
            let res = await fetch('/api/components')
            let data = await res.json()
            setComponents(data)
            if (data.length == 0)
                setMessage('No components created yet !')
        }

        fetchComponents()
    }, [])
    
    const editComp = async () => {
    }
    
    const deleteComp = async (id: string) => {
        const response = await fetch('/api/components', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            setComponents(components.filter((comp: Component) => comp.id !== id))
        } else {
            alert('Failed to delete component')
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center py-2">
                <h2>
                    List
                </h2>
                <Link href={`/admin/components/new`}
                      className="rounded bg-blue-300 hover:bg-blue-400 py-1 px-2">
                    New
                </Link>
            </div>
            <div className="flex flex-col border-t border-gray-500">
                {components.length === 0 ? (
                    <div className="my-4 text-center">{message}</div>
                ) : (
                    components.map((component: Component, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 p-4">
                            <div className="font-bold">{component.title}</div>
                            <div className="font-bold">{component.html}</div>
                            <div className="flex items-center">
                                <Button onClick={() => editComp()} className="bg-transparent border-none">
                                    <PencilSquareIcon className="h-6 w-6 ml-2 text-blue-400"/>
                                </Button>
                                <Button onClick={() => deleteComp(component.id)} className="bg-transparent border-none">
                                    <MinusCircleIcon className="h-6 w-6 ml-2 text-red-400"/>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
};