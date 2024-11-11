"use client";

import React, {useEffect, useState} from 'react';
import Button from "@/components/utils/button";

export default function EditPage({ params }: { params: { id: string } }) {
    const [page, setPage] = useState({ title: "" });

    useEffect(() => {
        async function fetchPage(id: string) {
            const response = await fetch(`/api/pages/${id}`);
            if (!response.ok) {throw new Error("An error occurred while fetching the data");}
            return response.json();
        }
        fetchPage(params.id)
            .then((data) => {
                setPage(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [params.id])

    const handleSubmit = async () => {
        const response = await fetch('/api/pages', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: params.id, title: page.title })
        });
        if (response.ok) {
            setPage({ title: "" });
            alert("Page successfully edited !");
        }else{
            console.log(response)
        }
    }
    
    return (
        <div>
            <div className="flex justify-between items-center py-2 mb-4">
                <h2>
                    Page edit
                </h2>
            </div>
            <div>
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        value={page.title}
                        onChange={(e) => setPage({ title: e.target.value })}
                        placeholder="Title"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <Button onClick={handleSubmit} type="submit">
                    Edit
                </Button>
            </div>
        </div>
    )
};