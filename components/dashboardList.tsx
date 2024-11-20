import React from 'react';
import {PlusIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

type Item = {
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
                {items.length > 0 ?
                    items.map((item: any, index: number) => (
                        <Link key={index} className="border border-gray-200 rounded-lg py-2 px-12 mb-2 
                        hover:scale-110 hover:border-blue-300 transition duration-500"
                                href={`/admin/${itemLink}/edit/${item.id}`}>
                            {item.title}
                        </Link>
                    )) : <div>No items</div>
                }
            </div>
            <div>
                <a href={`/admin/${itemLink}/new`}>
                    <PlusIcon className="h-5 w-5 inline-block border border-black rounded-full"/>
                </a>
            </div>
        </div>
    );
};

export default DashboardList;