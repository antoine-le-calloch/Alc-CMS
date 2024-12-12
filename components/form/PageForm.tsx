"use client";

import React, {useState} from "react";
import Button from "@/components/utils/button/Button";
import {savePage} from "@/components/services/SavePage";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";

interface PageFormProps {
    pageToEdit: Page | null;
}

const PageForm: React.FC<PageFormProps> = ({ pageToEdit }) => {
    const [page, setPage] = useState<Page>(pageToEdit || {
        title: '',
        link: '',
        blocks: []
    });
    
    const addBlock = () => {
        setPage({
            ...page,
            blocks: [
                ...page.blocks,
                {
                    name: 'New block',
                    data: {}
                }
            ]
        });
    };

    const handleSubmit = async () => {
        try {
            await savePage(page, !!pageToEdit);
            window.location.href = '/admin/';
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    return (
        <div>
            <div className="mb-2 px-3 py-2 bg-amber-50 rounded-xl shadow-md">
                <h2 className="font-bold text-lg m-0 text-gray-800">
                    Header
                </h2>
                <div className="flex p-6">
                    <div className="w-1/2">
                        <div className="text-sm">
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
                        <div className="text-sm">
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
            </div>
            <div className="mb-4 px-3 py-2 bg-amber-50 rounded-xl shadow-md">
                <h2 className="font-bold text-lg m-0  text-gray-800">
                    Content
                </h2>
                <div className="flex flex-col p-6">
                    <div>
                        {page.blocks && page.blocks.map((block, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-2 mb-2">
                                {block.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={addBlock} type="button">
                            <PlusIcon className="plus-icon-style"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-around">
                <Link href={'/admin/'}>
                    <Button type="button" className="bg-red-500">
                        Cancel
                    </Button>
                </Link>
                <Button onClick={handleSubmit} type="submit" className="bg-green-500">
                    Save
                </Button>
            </div>
        </div>
    );
}
export default PageForm;