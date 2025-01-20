"use client";

import React, {useState} from "react";
import Link from "next/link";
import Button from "@/components/utils/button/Button";
import {saveBlock} from "@/components/services/SaveBlock";
import {PlusIcon} from "@heroicons/react/24/solid";
import {TrashIcon} from "@heroicons/react/24/outline";

interface BlockFormProps {
    blockToEdit: Block | null;
}

const BlockForm: React.FC<BlockFormProps> = ({ blockToEdit }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [block, setBlock] = useState<Block>(blockToEdit || {
        title: '',
        variables: []
    });
    
    const addVariable = () => {
        setBlock({...block, variables: [...block.variables, "variable" + (block.variables.length + 1)]});
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDrop = (e: React.DragEvent<SVGSVGElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const index = parseInt(e.dataTransfer.getData('text/plain'));
        setBlock({...block, variables: block.variables.filter((_, i) => i !== index)});
    };

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
            <div className="mb-2 px-3 py-2 bg-slate-50 rounded-xl shadow-md">
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
            <div className="mb-4 px-3 py-2 bg-slate-50 rounded-xl shadow-md">
                <h2 className="font-bold text-lg m-0 text-gray-800">
                    Variables
                </h2>
                <div className="p-6">
                    <div className="flex gap-2">
                        {block.variables.length ? block.variables.map((variable, index) => (
                            <div draggable="true" className="border rounded-2xl bg-white flex group px-3 py-1.5 text-sm cursor-grab" 
                                 key={index} onDragStart={(e) => handleDragStart(e, index)}>
                                {variable}
                            </div>
                        )) : <div className="border border-gray-400 border-dashed rounded-2xl px-3 py-1.5 text-sm">
                            No variables
                        </div>}
                        <button onClick={addVariable} type="button">
                            <PlusIcon className="plus-icon-style h-5 w-5"/>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center mb-3">
                    <TrashIcon className={`h-6 w-6 text-red-500 duration-500 ${isDragOver ? 'scale-125' : ''}`}
                               onDragEnter={() => setIsDragOver(true)}
                                 onDragLeave={() => setIsDragOver(false)}
                               onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}/>
                </div>
            </div>
            <div className="flex justify-around">
                <Link href={'/admin/'}>
                    <Button type="button" className="bg-red-500 text-white">
                        Cancel
                    </Button>
                </Link>
                <Button onClick={handleSubmit} type="submit" className="bg-green-500 text-white">
                    Save
                </Button>
            </div>
        </div>
    );
}
export default BlockForm;