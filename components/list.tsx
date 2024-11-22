import React from "react";
import Link from "next/link";
import {MinusCircleIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import Loading from "@/components/utils/loading";
import Button from "@/components/utils/button";

type Item = {
    title: string;
    infos: string;
};

interface ListProps {
    items: Item[] | null;
    newItemLink: string;
}

const List: React.FC<ListProps> = ({items, newItemLink}) => {
    return (
        <div>
            <div className="flex justify-between items-center py-2">
                <h2>
                    List
                </h2>
                <Link href={newItemLink}
                      className="rounded bg-blue-300 hover:bg-blue-400 py-1 px-2">
                    New
                </Link>
            </div>
            <div className="flex flex-col border-t border-gray-500">
                { items === null || items.length === 0 ? (
                    <div className="flex justify-center my-4">
                        { items === null ? <Loading/> : <div>No data</div>}
                    </div>
                ) : (
                    items.map((item: Item, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 p-4">
                            <div className="font-bold">{item.title}</div>
                            <div className="font-bold">{item.infos}</div>
                            <div className="flex items-center">
                                <Button onClick={() => {
                                }} className="bg-transparent border-none">
                                    <PencilSquareIcon className="h-6 w-6 ml-2 text-blue-400"/>
                                </Button>
                                <Button onClick={() => {
                                }} className="bg-transparent border-none">
                                    <MinusCircleIcon className="h-6 w-6 ml-2 text-red-400"/>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default List;