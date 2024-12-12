import { FC } from "react";
import {PlusIcon} from "@heroicons/react/24/solid";

interface PlusButtonProps {
    className?: string;
}

const PlusButton: FC<PlusButtonProps> = ({ className }) => {
    return (
        <PlusIcon
            className={`h-6 w-6 inline-flex border border-black rounded-full rotate-on-hover ${className}`}
        />
    );
};

export default PlusButton;
