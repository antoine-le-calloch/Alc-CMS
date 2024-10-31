import React from 'react';
import {LeftPanel} from "@/components";

export default function AdminLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex">
            <LeftPanel/>
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    );
}