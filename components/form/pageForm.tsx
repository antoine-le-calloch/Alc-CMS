"use client";

import React, {useState} from "react";
import PlusButton from "@/components/utils/button/plusButton";
import Button from "@/components/utils/button";

interface PageFormProps {
    pageToEdit: Page;
}

const PageForm: React.FC<PageFormProps> = ({ pageToEdit }) => {
    const [page, setPage] = useState<Page>(pageToEdit);
    
    const handleSubmit = async () => {
        await fetch(`/api/pages/${page.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(page)
        })
    }
    
    return (
        <div>
            <div className="flex mb-4">
                <div className="w-1/2">
                    <div className="font-bold text-sm">
                    Title
                    </div>
                    <input
                        type="text"
                        value={page.title}
                        onChange={(e) => setPage({...page, title: e.target.value})}
                        placeholder="Title"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-[250px]
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <div>
                    <div className="font-bold text-sm">
                        Link
                    </div>
                    <input
                        type="text"
                        value={page.link}
                        onChange={(e) => setPage({...page, link: e.target.value})}
                        placeholder="Link"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-[250px]
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="flex flex-col mb-4">
                <div className="font-bold text-sm">
                    Content
                </div>
                <div>
                    {page.blocks && page.blocks.map((block, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-2 mb-2">
                            {block.name}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    <PlusButton/>
                </div>
            </div>
            <Button onClick={handleSubmit} type="submit">
                Save
            </Button>
        </div>
    );
}
export default PageForm;