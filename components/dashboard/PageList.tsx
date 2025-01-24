import React, {useState} from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline";

interface PageListProps {
    pages: Page[];
    editPageLink: string;
    addPageLink: string;
}

const PageList: React.FC<PageListProps> = ({pages, setPages, editPageLink, addPageLink}) => {
    const [pageExpanded, setPageExpanded] = useState<string | null>(null)

    return (
        <div>
            <div className="flex flex-col">
                {pages.length > 0 ? pages.map((page: Page) => (
                    <div key={page.id} className="flex flex-col items-center justify-between bg-gray-100 border
                            border-gray-300 rounded-lg mb-2 zoom-on-hover group px-3">
                        <Link href={`/admin/${editPageLink}/${page.id}`} className="py-2 px-12">
                            {page.title}
                        </Link>
                        <button onClick={() => setPageExpanded(page.id && pageExpanded !== page.id ? page.id : null)}>
                            <ArrowDownCircleIcon className={`${pageExpanded === page.id ? "h-5" : "h-0"} w-5 group-hover:h-5 duration-500`}/>
                        </button>
                        {pageExpanded === page.id && (
                            <div className="flex flex-col items-center mt-2">
                                {page.blocks.length > 0 ? page.blocks.map((block: Block) => (
                                    <div key={block.id} className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2">
                                        {block.title}
                                    </div>
                                )) : (
                                    <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                                        No blocks
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )): (
                    <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                        No pages
                    </div>
                )}
            </div>
            <div className="py-1">
                <a href={`/admin/${addPageLink}`}>
                    <PlusIcon className="plus-icon-style h-6 w-6"/>
                </a>
            </div>
        </div>
    );
};

export default PageList;