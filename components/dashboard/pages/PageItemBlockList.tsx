import React, {useState} from 'react';
import {savePage} from "@/components/services/SavePage";

interface PageItemBlockLIstProps {
    page: Page;
}

const PageItemBlockLIst: React.FC<PageItemBlockLIstProps> = ({page}) => {
    const [previewIndex, setPreviewIndex] = useState<number>(0);
    const [blockDragged, setBlockDragged] = useState<Block | null>(null);
    
    const onDragEnter = (e: any) => {
        e.preventDefault();
        setBlockDragged({
            id: e.dataTransfer.getData("blockId"),
            title: e.dataTransfer.getData("blockTitle")
        });
        console.log(blockDragged);
    }
    
    const onDragOver = (e: any, index: number) => {
        e.preventDefault();
        if (!blockDragged){
            setBlockDragged({
                id: e.dataTransfer.getData("blockId"),
                title: e.dataTransfer.getData("blockTitle")
            });
        }
        if (previewIndex !== index) {
            console.log(index);
            setPreviewIndex(index);
        }
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
            setBlockDragged(null);
        }
    }
    
    const onDragStart = async ( e: React.DragEvent<HTMLDivElement>, index: number) => {
        if (page.id) {
            e.dataTransfer.setData("pageId", page.id);
            e.dataTransfer.setData("blockIndex", index.toString());
        }
    }

    return (
        <div className="flex flex-col items-center mt-2" onDrop={(e) => onDrop(e)}
             onDragEnter={(e => onDragEnter(e))} onDragExit={() => setBlockDragged(null)}>
            {page.blocks.length > 0 ? page.blocks.map((block: Block, index: number) => (
                <div key={index}>
                    {blockDragged && previewIndex === index &&
                        <div className="bg-gray-100 border border-dashed border-gray-300 text-gray-400 rounded-lg py-2 px-12 mb-2">
                            {blockDragged.title}
                        </div>
                    }
                    <div draggable={true}  key={index}
                         onDragOver={(e) => onDragOver(e, index)} onDragStart={(e) => onDragStart(e, index)}
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