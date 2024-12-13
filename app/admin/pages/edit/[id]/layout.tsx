import React from 'react';
import TopBar from "@/components/layout/TopBar";

export default function EditPageLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <TopBar titleName={"Page edit"}/>
            <div className="container p-4">
                {children}
            </div>
        </section>
    );
}