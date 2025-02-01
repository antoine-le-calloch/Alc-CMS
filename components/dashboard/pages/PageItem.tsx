import React, {useState} from 'react';
import Link from "next/link";
import {ArrowDownCircleIcon} from "@heroicons/react/24/outline";
import {savePage} from "@/components/services/SavePage";

interface PageItemProps {
    pages: Page[];
    page: Page;
    editPageLink: string;
    blocks: Block[] | null;
}

const PageItem: React.FC<PageItemProps> = ({pages, page, editPageLink, blocks}) => {
    const [pageExpanded, setPageExpanded] = useState<string | null>(null)
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);

    const onDragOver = (e: any, pageId: string | undefined) => {
        e.preventDefault();
        const { top, bottom } = e.target.getBoundingClientRect();
        const middle = (top + bottom) / 2;
        const offset = e.clientY - middle;
        
        if (!previewIndex) {
            const pageToUpdate = pages.find((page: Page) => page.id === pageId);
            const blockToAdd = blocks?.find((block: Block) => block.id === e.dataTransfer.getData("blockId"));
            if (pageToUpdate && blockToAdd){
                setPreviewIndex(offset > 0 ? pageToUpdate.blocks.length : 0);
                pageToUpdate.blocks = previewIndex === 1 ? [...pageToUpdate.blocks, blockToAdd] : [blockToAdd, ...pageToUpdate.blocks];
            }
        }else if (offset !== previewIndex) {
            const pageToUpdate = pages.find((page: Page) => page.id === pageId);
            if (pageToUpdate) {
                const blockToAdd = pageToUpdate.blocks[previewIndex];
                pageToUpdate.blocks[previewIndex] = pageToUpdate.blocks[offset > 0 ? pageToUpdate.blocks.length - 1 : 0]
                setPreviewIndex(offset > 0 ? pageToUpdate.blocks.length - 1 : 0);
                pageToUpdate.blocks[previewIndex] = blockToAdd;
            }
        }
    }
    
    const onDrop = async (e: React.DragEvent<HTMLDivElement>, pageId: string | undefined) => {
        e.preventDefault();
        const blockToAdd = blocks?.find((block: Block) => block.id === e.dataTransfer.getData("blockId"));
        const pageToUpdate = pages.find((page: Page) => page.id === pageId);
        if (blockToAdd && pageToUpdate) {
            pageToUpdate.blocks.push(blockToAdd);
            try {
                await savePage(pageToUpdate, true);
                window.location.href = '/admin/';
            } catch (error: any) {
                console.error("Error:", error);
                alert(error.message);
            }
        }
    }
    
    const onDragStart = async ( e: React.DragEvent<HTMLDivElement>, 
                                pageId: string | undefined,
                                index: number) => {
        if (pageId === undefined) return;
        e.dataTransfer.setData("pageId", pageId);
        e.dataTransfer.setData("blockIndex", index.toString());
    }

    return (
        <div key={page.id} className="flex flex-col items-center justify-between bg-gray-100 border
                border-gray-300 rounded-lg mb-2 zoom-on-hover group px-3">
            <Link href={`/admin/${editPageLink}/${page.id}`} className="py-2 px-12">
                {page.title}
            </Link>
            <button onClick={() => setPageExpanded(page.id && pageExpanded !== page.id ? page.id : null)}>
                <ArrowDownCircleIcon className={`${pageExpanded === page.id ? "h-5" : "h-0"} w-5 group-hover:h-5 duration-500`}/>
            </button>
            {pageExpanded === page.id && (
                <div className="flex flex-col items-center mt-2" onDragOver={onDragOver} onDrop={(e) => onDrop(e, page.id)}>
                    {page.blocks.length > 0 ? page.blocks.map((block: Block, index: number) => (
                        <div draggable={true} onDragStart={(e) => onDragStart(e, page.id, index)} key={index} 
                             className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2 cursor-grab hover:scale-105 duration-200 relative">
                            <div className="absolute left-1 top-0.5 text-xs text-gray-400">{index}</div>
                            {block.title}
                        </div>
                    )) : (
                        <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                            No blocks
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PageItem;