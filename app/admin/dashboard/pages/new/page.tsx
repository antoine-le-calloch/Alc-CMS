"use client";

import React, {useState} from 'react';
import Button from "@/components/Button";

const NewPagePage = () => {
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
                    Create
                </Button>
            </div>
        </div>
    )
};

export default NewPagePage;