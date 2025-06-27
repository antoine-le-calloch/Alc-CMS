import React from 'react';

interface TopBarProps {
    titleName: string;
}

const TopBar: React.FC<TopBarProps> = ({titleName}) => {
    return (
        <div className="relative h-20">
            <div className="fixed left-36 right-0 border-b h-20 shadow-md flex items-center justify-left z-20 px-6
            border-gray-200 bg-white">
                <h1 className="font-bold uppercase">
                    {titleName}
                </h1>
            </div>
        </div>
    );
};

export default TopBar;
