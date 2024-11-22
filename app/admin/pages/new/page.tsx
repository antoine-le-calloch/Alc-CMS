"use client";

import React, {useState} from 'react';
import Button from "@/components/utils/button";

export default function NewPagePage() {
    const [title, setTitle] = useState("")
    
    const handleSubmit = async () => {
        const response = await fetch('/api/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        });
        if (response.ok) {
            setTitle("");
            alert("New page successfully created !");
        }else{
            console.log(response)
        }
    }
    
    return (
        <div>
            <div>
                <div className="flex flex-col mb-4">
                    <div>
                        Title
                    </div>
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
                    Create
                </Button>
            </div>
        </div>
    )
};