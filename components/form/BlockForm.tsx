"use client";

import React, {useState} from "react";
import Link from "next/link";
import Button from "@/components/utils/button/Button";
import {saveBlock} from "@/components/services/SaveBlock";

interface BlockFormProps {
    blockToEdit: Block | null;
}

const BlockForm: React.FC<BlockFormProps> = ({ blockToEdit }) => {
    const [block, setBlock] = useState<Block>(blockToEdit || {
        title: '',
        data: ''
    });

    const handleSubmit = async () => {
        try {
            await saveBlock(block, !!blockToEdit);
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
                <div className="p-6">
                    <div className="text-sm">
                        Title
                    </div>
                    <input
                        type="text"
                        value={block.title}
                        onChange={(e) => setBlock({...block, title: e.target.value})}
                        placeholder="Title"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-[250px]
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="mb-4 px-3 py-2 bg-amber-50 rounded-xl shadow-md">
                <h2 className="font-bold text-lg m-0  text-gray-800">
                    Data
                </h2>
                <div className="p-6">
                    <input type="text"
                           value={block.data}
                           placeholder="Data"
                           onChange={(e) => setBlock({...block, data: e.target.value})} 
                           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-[250px]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
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
export default BlockForm;