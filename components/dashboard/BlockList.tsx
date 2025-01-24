import React from 'react';
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/16/solid";

interface BlockListProps {
    blocks: Block[];
    editBlockLink: string;
    addBlockLink: string;
}

const BlockList: React.FC<BlockListProps> = ({blocks, editBlockLink, addBlockLink}) => {

    const handleDragStart = (e: React.DragEvent<HTMLAnchorElement>, block: Block) => {
        e.dataTransfer.setData("blockId", String(block.id));
        e.dataTransfer.setData("blockTitle", block.title);
    };
    
    return (
        <div>
            <div className="flex flex-col">
                {blocks.length > 0 ? blocks.map((block: Block) => (
                        <Link key={block.id} href={`/admin/${editBlockLink}/${block.id}`} draggable={true} 
                              onDragStart={(e) => handleDragStart(e, block)}
                              className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-12 mb-2 zoom-on-hover">
                            {block.title}
                        </Link>
                )) : (
                    <div className="text-gray-500 bg-gray-100 opacity-50 border border-gray-500 rounded-lg py-2 px-12 mb-2 border-dashed">
                        No blocks
                    </div>
                )}
            </div>
            {addBlockLink && (
                <div className="py-1">
                    <a href={`/admin/${addBlockLink}`}>
                        <PlusIcon className="plus-icon-style h-6 w-6"/>
                    </a>
                </div>
            )}
        </div>
    );
};

export default BlockList;