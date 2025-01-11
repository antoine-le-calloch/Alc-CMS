import React from 'react';
import TopBar from "@/components/layout/TopBar";

export default function ListBlocksLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <TopBar titleName={"Blocks management"}/>
            <div className="container p-4">
                {children}
            </div>
        </section>
    );
}