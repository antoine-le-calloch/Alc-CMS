import React from 'react';

interface TopBarProps {
    titleName: string;
}

const TopBar: React.FC<TopBarProps> = ({titleName}) => {
    return (
        <div className="px-4 py-2 border-b border-gray-200 shadow-md">
            <div className="font-bold">
                {titleName}
            </div>
        </div>
    );
};

export default TopBar;