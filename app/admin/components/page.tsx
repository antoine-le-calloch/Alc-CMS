"use client";

import React, {useEffect, useState} from 'react';
import List from "@/components/list";

type Item = {
    title: string;
    infos: string;
};

export default function ComponentsPage() {
    const [components, setComponents] = useState<Item[] | null>(null)
    
    useEffect(() => {
        async function fetchComponents() {
            let res = await fetch('/api/components')
            let data = await res.json()
            setComponents(data)
        }

        fetchComponents().then()
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
        if (components && response.ok) {
            setComponents(components.filter((comp: any) => comp.id !== id))
        } else {
            alert('Failed to delete component')
        }
    }

    return (
        <List items={components} newItemLink={'/admin/components/new'}/>
    )
};