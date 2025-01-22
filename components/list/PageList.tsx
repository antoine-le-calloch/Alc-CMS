import React from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline";

interface PageListProps {
    items: Item[];
    itemLink: string;
}

const PageList: React.FC<PageListProps> = ({items, itemLink}) => {
    return (
        <div>
            <div className="flex flex-col">
                {items.length > 0 && items.map((item: Item) => (
                    <div key={item.id} className="flex flex-col items-center justify-between bg-gray-100 border
                            border-gray-300 rounded-lg mb-2 zoom-on-hover group">
                        <Link href={`/admin/${itemLink}/edit/${item.id}`} className="py-2 px-12">
                            {item.title}
                        </Link>
                        <button>
                            <ArrowDownCircleIcon className="w-5 h-0 group-hover:h-5 duration-500"/>
                        </button>
                    </div>
                ))}
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