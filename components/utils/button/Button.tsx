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
            className={`px-4 py-2 bg-blue-500 font-semibold rounded-lg shadow-md
                zoom-on-hover focus ${className}`}>
            {children}
        </button>
    );
};

export default Button;