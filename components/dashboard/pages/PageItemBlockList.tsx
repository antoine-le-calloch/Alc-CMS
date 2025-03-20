import React, { useState } from 'react';
import { savePage } from "@/components/services/SavePage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

interface PageItemBlockLIstProps {
    page: Page;
    blocks: Block[];
}

const PageItemBlockLIst: React.FC<PageItemBlockLIstProps> = ({page, blocks}) => {
    const router = useRouter();
    const [previewIndex, setPreviewIndex] = useState<number>(0);
    const [titleDragged, setTitleDragged] = useState<string | null>();
    
    const onDragEnter = (e: any) => {
        e.preventDefault();
        setTitleDragged(e.dataTransfer.getData("blockTitle"));
    }
    
    const onDragOver = (e: any, index: number | null) => {
        e.preventDefault();
        if (!titleDragged) setTitleDragged(e.dataTransfer.getData("blockTitle"));
        
        if (index === null) {
            setPreviewIndex(0);
            return;
        }
        
        const {top, bottom} = e.currentTarget.getBoundingClientRect();
        const mid = (top + bottom) / 2;
        const cursorPosition = e.clientY;
        
        if (cursorPosition > mid && previewIndex !== index + 1) {
            setPreviewIndex(index + 1);
        }else if (cursorPosition <= mid && previewIndex !== index) {
            setPreviewIndex(index);
        }
    }
    
    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const blockId = e.dataTransfer.getData("blockId");
        if (blockId && previewIndex !== null) {
            const newPageItem: PageItem = {
                blockId: blockId,
                content: []
            }
            const updatedItemList = [...page.items.slice(0, previewIndex), newPageItem, ...page.items.slice(previewIndex)];
            try {
                await savePage({...page, items: updatedItemList}, true);
                toast.success("Block successfully added to the page");
                router.refresh();
            } catch (error: any) {
                console.error("Error:", error);
                toast.error(error.message);
            }
            setTitleDragged(null);
        }else{
            toast.error("No dragged block information");
        }
    }
    
    const onDragStart = async ( e: React.DragEvent<HTMLDivElement>, index: number) => {
        if (page.id) {
            e.dataTransfer.setData("pageId", page.id);
            e.dataTransfer.setData("itemIndex", index.toString());
        }
    }

    return (
        <div className="flex flex-col items-center my-2 w-full" onDrop={(e) => onDrop(e)}
             onDragEnter={(e => onDragEnter(e))} onDragExit={() => setTitleDragged(null)}>
            {page.items.length > 0 ? page.items.map((item: PageItem, index: number) => (
                <div key={index} className="w-3/4">
                    {titleDragged && previewIndex === index && 
                        // Display placeholder when dragging a block over the list
                        <div className="bg-gray-100 border border-dashed border-gray-300 text-gray-400 rounded-lg py-4 mb-2">
                            {titleDragged}
                        </div>
                    }
                    <div draggable={true} key={index}
                         onDragOver={(e) => onDragOver(e, index)}
                         onDragStart={(e) => onDragStart(e, index)}
                         className="bg-gray-100 border border-gray-300 rounded-lg py-4 mb-2 cursor-grab zoom-on-hover duration-200 relative">
                        <div className="absolute left-1 top-0.5 text-xs text-gray-400">{index}</div>
                        {blocks.find((block: Block) => block.id === item.blockId)?.title}
                    </div>
                    {titleDragged && previewIndex === index + 1 && index === page.items.length - 1 &&
                        // Display placeholder when dragging a block after the last item of the list
                        <div className="bg-gray-100 border border-dashed border-gray-300 text-gray-400 rounded-lg py-4 mb-2">
                            {titleDragged}
                        </div>
                    }
                </div>
            )) :
                <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed w-3/4"
                     onDragOver={(e) => onDragOver(e, null)}>
                    { titleDragged ? titleDragged : "No blocks"}
                </div>
            }
        </div>
    );
};

export default PageItemBlockLIst;