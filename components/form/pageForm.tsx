import React from "react";

interface PageFormProps {
    page: Page;
    setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const pageForm: React.FC<PageFormProps> = ({page, setPage}) => {
    return (
        <div>
            <div className="flex flex-col mb-4">
                <div className="font-bold text-sm">
                    Title
                </div>
                <input
                    type="text"
                    value={page.title}
                    onChange={(e) => setPage({...page, title: e.target.value})}
                    placeholder="Title"
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-[250px]
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
            </div>
            <div className="flex flex-col mb-4">
                <div className="font-bold text-sm">
                    Content
                </div>
                <div>
                    {page.blocks.map((block, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-2 mb-2">
                            {block.name}
                        </div>
                    ))}
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}
export default pageForm;