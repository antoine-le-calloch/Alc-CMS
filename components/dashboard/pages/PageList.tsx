import React from 'react';
import {PlusIcon} from "@heroicons/react/16/solid";
import PageItem from "@/components/dashboard/pages/PageItem";

interface PageListProps {
    pages: Page[];
    editPageLink: string;
    addPageLink: string;
}

const PageList: React.FC<PageListProps> = ({pages, editPageLink, addPageLink}) => {
    return (
        <div>
            <div className="flex flex-col">
                {pages.length > 0 ? pages.map((page: Page) => (
                    <PageItem page={page} editPageLink={editPageLink} key={page.id}/>
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