import React from 'react';
import TopBar from "@/components/layout/TopBar";

export default function EditBlockLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <TopBar titleName={"Block edit"}/>
            <div className="container p-4">
                {children}
            </div>
        </section>
    );
}