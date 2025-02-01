import React, {useState} from 'react';
import Link from "next/link";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline";
import PageItemBlockList from "@/components/dashboard/pages/PageItemBlockList";

interface PageItemProps {
    page: Page;
    editPageLink: string;
}

const PageItem: React.FC<PageItemProps> = ({page, editPageLink}) => {
    const [pageExpanded, setPageExpanded] = useState<boolean>(false)

    return (
        <div key={page.id} className="flex flex-col items-center justify-between bg-gray-100 border
                border-gray-300 rounded-lg mb-2 zoom-on-hover group px-3">
            <Link href={`/admin/${editPageLink}/${page.id}`} className="py-2 px-12">
                {page.title}
            </Link>
            <button onClick={() => setPageExpanded(!pageExpanded)}>
                <ArrowDownCircleIcon className={`${pageExpanded? "h-5" : "h-0"} w-5 group-hover:h-5 duration-500`}/>
            </button>
            {pageExpanded && 
                <PageItemBlockList page={page}/>
            }
        </div>
    );
};

export default PageItem;