"use client";

import React, {useEffect, useState} from 'react';
import List from "@/components/list";

type Component = {
    id: string;
    title: string;
    html: string;
};

export default function ComponentsPage() {
    const [components, setComponents] = useState([])
    useEffect(() => {
        async function fetchComponents() {
            let res = await fetch('/api/components')
            let data = await res.json()
            setComponents(data)
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
        <List items={components} newItemLink={'/admin/components/new'}/>
    )
};