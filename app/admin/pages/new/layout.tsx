import React from 'react';
import TopBar from "@/components/layout/TopBar";

export default function DashboardLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <TopBar titleName={"Page creation"}/>
            <div className="container p-4">
                {children}
            </div>
        </section>
    );
}