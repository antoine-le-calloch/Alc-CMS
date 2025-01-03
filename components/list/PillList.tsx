import React from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";

interface PillListProps {
    items: Item[];
    itemLink: string;
}

const PillList: React.FC<PillListProps> = ({items, itemLink}) => {
    return (
        <div>
            <div className="flex flex-col">
                {items.length > 0 && items.map((item: Item) => (
                        <Link key={item.id} href={`/admin/${itemLink}/edit/${item.id}`}
                              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2 zoom-on-hover">
                            {item.title}
                        </Link>
                ))}
            </div>
            <div className="py-1">
                <a href={`/admin/${itemLink}/new`}>
                    <PlusIcon className="plus-icon-style"/>
                </a>
            </div>
        </div>
    );
};

export default PillList;