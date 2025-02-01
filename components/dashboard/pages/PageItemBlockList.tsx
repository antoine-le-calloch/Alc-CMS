import React, {useState} from 'react';
import {savePage} from "@/components/services/SavePage";

interface PageItemBlockLIstProps {
    page: Page;
}

const PageItemBlockLIst: React.FC<PageItemBlockLIstProps> = ({page}) => {
    const [previewIndex, setPreviewIndex] = useState<number | null>(null);
    const [blockDragged, setBlockDragged] = useState<Block | null>(null);

    const onDragOver = (e: any) => {
        e.preventDefault();
        const { top, bottom } = e.target.getBoundingClientRect();
        const middle = (top + bottom) / 2;
        const offset = e.clientY - middle;
        
        if (!blockDragged){
            setBlockDragged({
                id: e.dataTransfer.getData("blockId"),
                title: e.dataTransfer.getData("blockTitle")
            })
        }
        
        setPreviewIndex(offset > 0 ? page.blocks.length - 1 : 0);
    }
    
    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (blockDragged && previewIndex !== null) {
            const updatedBlockList = [...page.blocks.slice(0, previewIndex), blockDragged, ...page.blocks.slice(previewIndex)];
            try {
                await savePage({...page, blocks: updatedBlockList}, true);
                window.location.href = '/admin/';
            } catch (error: any) {
                console.error("Error:", error);
                alert(error.message);
            }
            setPreviewIndex(null);
        }
    }
    
    const onDragStart = async ( e: React.DragEvent<HTMLDivElement>, index: number) => {
        if (page.id) {
            e.dataTransfer.setData("pageId", page.id);
            e.dataTransfer.setData("blockIndex", index.toString());
        }
    }

    return (
        <div className="flex flex-col items-center mt-2" onDragOver={onDragOver} onDrop={(e) => onDrop(e)}
         onDragLeave={() => setPreviewIndex(null)}>
            {page.blocks.length > 0 ? page.blocks.map((block: Block, index: number) => (
                <div key={index}>
                    {blockDragged && previewIndex === index &&
                        <div className="bg-gray-100 border border-dashed border-gray-300 text-gray-400 rounded-lg py-2 px-12 mb-2">
                            {blockDragged.title}
                        </div>
                    }
                    <div draggable={true} onDragStart={(e) => onDragStart(e, index)} key={index} 
                         className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2 cursor-grab hover:scale-105 duration-200 relative">
                        <div className="absolute left-1 top-0.5 text-xs text-gray-400">{index}</div>
                        {block.title}
                    </div>
                </div>
            )) : (
                <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                    No blocks
                </div>
            )}
        </div>
    );
};

export default PageItemBlockLIst;