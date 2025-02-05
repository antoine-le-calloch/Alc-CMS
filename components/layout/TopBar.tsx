import React from 'react';

interface TopBarProps {
    titleName: string;
}

const TopBar: React.FC<TopBarProps> = ({titleName}) => {
    return (
        <div className="relative h-20">
            <div className="fixed border-b w-full shadow-md h-20 flex items-center justify-left px-4 z-20
            border-gray-200 bg-white">
                <h1 className="font-bold uppercase">
                    {titleName}
                </h1>
            </div>
        </div>
    );
};

export default TopBar;