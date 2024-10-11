import React from 'react';
    
interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
                                           onClick,
                                           type = 'button',
                                           disabled = false,
                                           className = '',
                                           children
                                       }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
            >
            {children}
        </button>
    );
};

export default Button;