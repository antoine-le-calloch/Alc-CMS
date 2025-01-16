"use client";

import React, {useState} from "react";
import Link from "next/link";
import Button from "@/components/utils/button/Button";
import {saveBlock} from "@/components/services/SaveBlock";
import {PlusIcon} from "@heroicons/react/24/solid";

interface BlockFormProps {
    blockToEdit: Block | null;
}

const BlockForm: React.FC<BlockFormProps> = ({ blockToEdit }) => {
    const [block, setBlock] = useState<Block>(blockToEdit || {
        title: '',
        html: '',
        variables: []
    });
    
    const addVariable = () => {
        let newVariable = "variable" + (block.variables.length + 1);
        setBlock({...block, variables: [...block.variables, newVariable]});
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
                    Data
                </h2>
                <div className="p-6 pt-2">
                    <div className="flex gap-1 text-sm mb-2">
                        {block.variables.length ? block.variables.map((variable) => (
                            <button onClick={() => setBlock({...block, variables: block.variables.filter((v) => v !== variable)})}
                            type="button" className="border rounded-2xl bg-white px-2 py-1 relative" key={variable}>
                                {variable}
                                <div className="absolute left-0 top-0 w-full h-full rounded-2xl bg-gray-300
                                flex justify-center items-center font-bold text-xl opacity-0 hover:opacity-100 duration-200">
                                    <div className="h-1 w-3/12 bg-black"/>
                                </div>
                            </button>
                        )) : <div className="border border-gray-400 border-dashed rounded-2xl px-2 py-1">No
                            variables</div>}
                        <button onClick={addVariable} type="button">
                            <PlusIcon className="plus-icon-style h-5 w-5"/>
                        </button>
                    </div>
                    <textarea
                       value={block.html}
                       placeholder="Html"
                       onChange={(e) => setBlock({...block, html: e.target.value})}
                       className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
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