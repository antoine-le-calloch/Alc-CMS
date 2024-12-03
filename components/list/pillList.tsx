import React from 'react';
import Link from "next/link";
import PlusButton from "@/components/utils/button/plusButton";

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
                    <PlusButton/>
                </a>
            </div>
        </div>
    );
};

export default DashboardList;