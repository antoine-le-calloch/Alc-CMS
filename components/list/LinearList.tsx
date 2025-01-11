import React from "react";
import Link from "next/link";
import {MinusCircleIcon, PencilSquareIcon} from "@heroicons/react/24/solid";
import Loading from "@/components/utils/Loading";
import Button from "@/components/utils/button/Button";

interface ListProps {
    items: Item[] | null;
    itemLink: string;
}

const LinearList: React.FC<ListProps> = ({items, itemLink}) => {
    
    const handleDelete = (name: string, id: string, itemLink: string) => async () => {
        if (!confirm(`Are you sure you want to delete ${name} from ${itemLink}?`)) {
            return;
        }
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${itemLink}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
        } catch (error: any) {
            console.error("Error:", error);
            alert(error.message);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center py-2">
                <h2>
                    List
                </h2>
                <Link href={`admin/${itemLink}/new`}
                      className="rounded bg-blue-300 hover:bg-blue-400 py-1 px-2">
                    New
                </Link>
            </div>
            <div className="flex flex-col border-t-2 border-gray-600 px-1">
                { items === null || items.length === 0 ? (
                    <div className="flex justify-center my-4">
                        { items === null ? <Loading/> : <div>No data</div>}
                    </div>
                ) : (
                    items.map((item: Item, index: number) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-400 p-4">
                            <div className="font-bold">{item.title}</div>
                            <div className="font-bold">{item.info}</div>
                            <div className="flex items-center">
                                <Link href={`admin/${itemLink}/edit/${item.id}`}>
                                    <Button className="bg-transparent border-none">
                                        <PencilSquareIcon className="h-6 w-6 ml-2 text-blue-400"/>
                                    </Button>
                                </Link>
                                <Button onClick={handleDelete(item.title, item.id, itemLink)} className="bg-transparent border-none">
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

export default LinearList;