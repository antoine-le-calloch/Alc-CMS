import React from 'react';
import LeftPanel from "@/components/layout/LeftPanel";

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