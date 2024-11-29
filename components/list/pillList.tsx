import React from 'react';
import {PlusIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

type Item = {
    id: number;
    title: string;
}

interface DashboardListProps {
    items: Item[];
    itemLink: string;
}

const DashboardList: React.FC<DashboardListProps> = ({items, itemLink}) => {
    return (
        <div>
            <div className="flex flex-col">
                {items.length > 0 && items.map((item: Item) => (
                        <Link key={item.id} className="border border-gray-300 rounded-lg py-2 px-12 mb-2 
                        hover:scale-105 hover:shadow-md transition duration-500"
                                href={`/admin/${itemLink}/edit/${item.id}`}>
                            {item.title}
                        </Link>
                ))}
            </div>
            <div>
                <a href={`/admin/${itemLink}/new`}>
                    <PlusIcon className="h-6 w-6 inline-flex border border-black rounded-full 
                    hover:rotate-[180deg] hover:scale-110 transition duration-500"
                   />
                </a>
            </div>
        </div>
    );
};

export default DashboardList;