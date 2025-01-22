import React from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";

interface PillListProps {
    items: Item[];
    itemLink: string;
}

const PillList: React.FC<PillListProps> = ({items, itemLink, addItemLink}) => {
    return (
        <div>
            <div className="flex flex-col">
                {items.length > 0 ? items.map((item: Item) => (
                        <Link key={item.id} href={`/admin/${itemLink}/${item.id}`}
                              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2 zoom-on-hover">
                            {item.title}
                        </Link>
                )) : (
                    <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                        No blocks
                    </div>
                )}
            </div>
            {addItemLink && (
                <div className="py-1">
                    <a href={`/admin/${addItemLink}`}>
                        <PlusIcon className="plus-icon-style h-6 w-6"/>
                    </a>
                </div>
            )}
        </div>
    );
};

export default PillList;