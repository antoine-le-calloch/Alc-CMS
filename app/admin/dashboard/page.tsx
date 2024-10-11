"use client";

import React from 'react';
import {TopBar} from "@/components";

const DashboardPage: React.FC = () => {
    return (
        <div>
            <TopBar titleName={"Dashboard"}/>
            <div className="container">
                <div className="p-4">
                    No content.
                </div>
            </div>
        </div>
    )
};

export default DashboardPage;