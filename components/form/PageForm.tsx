"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Button from "@/components/utils/button/Button";
import {savePage} from "@/components/services/SavePage";
import {PlusIcon, XMarkIcon} from "@heroicons/react/24/solid";
import Loading from "@/components/utils/Loading";
import {toast} from "react-toastify";

interface PageFormProps {
    pageToEdit: Page | null;
}

const PageForm: React.FC<PageFormProps> = ({ pageToEdit }) => {
    const [page, setPage] = useState<Page>(pageToEdit || {
        title: '',
        link: '',
        items: [],
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [itemsAndBlocksList, setItemsAndBlocksList] = useState<{ item: PageItem, block: Block | null }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchBlocks() {
            setLoading(true);
            try {
                let res = await fetch('/api/blocks')
                let data = await res.json()
                setBlocks(data)
            } catch (error: any) {
                console.error("Error:", error);
                alert(error.message);
            }
            setLoading(false);
        }
        fetchBlocks().then()
    }, [])

    useEffect(() => {
        if (blocks.length > 0) {
            setItemsAndBlocksList(page.items.map((item) => {
                const block = blocks.find(block => block.id === item.blockId) || null;
                return { item, block };
            }));
        }
    }, [blocks, page.items]);
    
    const addBlock = (block: Block) => {
        const newItem = {
            blockId: block.id,
            content: []
        };
        setPage({
            ...page,
            items: [...page.items, newItem]
        });
        setOpenPopup(false);
    };

    const handleSubmit = async () => {
        if (!page.title) {
            toast.error("Title is required");
            return;
        }
        if (!page.link) {
            toast.error("Link is required");
            return;
        }
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
            <div className="mb-2 px-3 py-2 bg-slate-50 rounded-xl shadow-md">
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
            <div className="mb-4 px-3 py-2 bg-slate-50 rounded-xl shadow-md">
                <h2 className="font-bold text-lg m-0 text-gray-800">
                    Content
                </h2>
                <div className="flex flex-col p-6">
                    <div>
                        {itemsAndBlocksList.map(({ item, block }, index) => (
                            <div key={index} className="border border-gray-300 bg-white rounded-lg p-2 mb-2">
                                {block?.title}
                                <div className="py-2 flex gap-2 items-center flex-wrap justify-between">
                                    {block?.variables.map((variable, index) => (
                                        <input type="text"
                                               key={variable}
                                               value={variable}
                                               placeholder="variable"
                                               onChange={(e) => { block.variables[index] = e.target.value }}
                                               className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-1/4 flex-1 min-w-[30%]
                                               focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => setOpenPopup(true)} type="button">
                            <PlusIcon className="plus-icon-style h-6 w-6"/>
                        </button>
                    </div>
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
            <div className={`${openPopup ? 'block' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black bg-opacity-50`}>
            <div className="absolute bg-white shadow-md max-w-lg w-full rounded-2xl
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="text-white bg-slate-900 w-full rounded-t-2xl">
                        <div className="text-lg font-bold text-center p-3">
                            Choose block
                        </div>
                        <button className="absolute right-2 top-2 font-bold zoom-on-hover"
                                onClick={() => setOpenPopup(false)}>
                            <XMarkIcon width={24} height={24}/>
                        </button>
                    </div>
                    <div className="flex justify-center flex-wrap gap-2 w-full p-4">
                        {loading ? <Loading/> : blocks.map((block) => (
                            <button key={block.id} onClick={() => addBlock(block)}
                                    className="border border-gray-300 shadow rounded-lg py-4 px-2 w-1/3 zoom-on-hover">
                                {block.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PageForm;