import React from 'react';
import {TopBar} from "@/components";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {  
    return (
        <section>
            <TopBar titleName={"Components creation"}/>
            <div className="container p-4">
                {children}
            </div>
        </section>
    );
}