import React from 'react';
import {LeftPanel} from "@/components";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {  
    return (
        <section>
            <div className="flex">
                <LeftPanel/>
                <div className="flex flex-col w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}