import React from 'react';

interface TopBarProps {
    titleName: string;
}

const TopBar: React.FC<TopBarProps> = ({titleName}) => {
    return (
        <div className="px-4 py-4 border-b border-gray-200 shadow-md mb-2 bg-white">
            <h1 className="font-bold uppercase">
                {titleName}
            </h1>
        </div>
    );
};

export default TopBar;