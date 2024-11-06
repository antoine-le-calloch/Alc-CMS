import React from 'react';
import {PlusIcon} from "@heroicons/react/24/solid";

type Item = {
    title: string;
}

interface DashboardListProps {
    items: Item[];
    plusLink: string;
}

const DashboardList: React.FC<DashboardListProps> = ({items, plusLink}) => {
    return (
        <div>
            <div>
                {items.length > 0 ?
                    items.map((item: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-lg py-2 px-12 mb-2">
                            {item.title}
                        </div>
                    )) : <div>No items</div>
                }
            </div>
            <div>
                <a href={plusLink}>
                    <PlusIcon className="h-5 w-5 inline-block border border-black rounded-full"/>
                </a>
            </div>
        </div>
    );
};

export default DashboardList;