import React, {useState} from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline";
import PillList from "@/components/list/PillList";

interface PageListProps {
    items: Item[];
    itemLink: string;
}

const PageList: React.FC<PageListProps> = ({items, itemLink}) => {
    const [itemExpanded, setItemExpanded] = useState<string | null>(null)

    return (
        <div>
            <div className="flex flex-col">
                {items.length > 0 ? items.map((item: Item) => (
                    <div key={item.id} className="flex flex-col items-center justify-between bg-gray-100 border
                            border-gray-300 rounded-lg mb-2 zoom-on-hover group px-3">
                        <Link href={`/admin/${itemLink}/edit/${item.id}`} className="py-2 px-12">
                            {item.title}
                        </Link>
                        <button onClick={() => setItemExpanded(itemExpanded === item.id ? null : item.id)}>
                            <ArrowDownCircleIcon className={`${itemExpanded === item.id ? "h-5" : "h-0"} w-5 group-hover:h-5 duration-500`}/>
                        </button>
                        {itemExpanded === item.id && (
                            <div className="flex flex-col items-center mt-2">
                                <PillList items={item.blocks} itemLink="blocks" addItemLink={null} />
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
                <a href={`/admin/${itemLink}/new`}>
                    <PlusIcon className="plus-icon-style h-6 w-6"/>
                </a>
            </div>
        </div>
    );
};

export default PageList;