"use client";

import React, {useState} from 'react';
import Button from "@/components/Button";

export default function EditPage({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("")
    
    const handleSubmit = async () => {
        const response = await fetch('/api/pages', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: params.id, title })
        });
        if (response.ok) {
            setTitle("");
            alert("Page successfully edited !");
        }else{
            console.log(response)
        }
    }
    
    return (
        <div>
            <div className="flex justify-between items-center py-2 mb-4">
                <h2>
                    New page creation
                </h2>
            </div>
            <div>
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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