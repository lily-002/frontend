import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

interface SelectOptionsProps {
    title?: string;
    selectedOption: string;
    setSelectedOption: (val: string) => void;
    options: string[];
    className?: string;
    top?: string;
}

const SelectOptions = ({options, selectedOption, title, setSelectedOption, className, top}: SelectOptionsProps) => {
    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <div tabIndex={0} onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
            className={`w-full cursor-pointer text-xs flex justify-between items-center gap-3 ${className}`}
            onClick={() => setShowDropdown(!showDropdown)}
        >
            <span>{selectedOption || title ||  "---Select option---"}</span>

            <CaretDown size={12} weight="bold" className={`${showDropdown ? "rotate-180" : ""} transition-all w-[12px] min-w-[12px]`} />

            {
                showDropdown ? (
                    <ul className={`w-full min-w-max max-h-[200px] overflow-y-auto bg-white text-[#333333] border rounded p-1 absolute right-0 z-10 ${top ?? "top-6"}`}>
                        {
                            options.map((option) => (
                                <li key={option} onClick={() => setSelectedOption(option)} className={`capitalize ${selectedOption === option ? "bg-primary text-white" : "hover:bg-sky-100"}  py-1 px-2 mb-1`}>{option}</li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}

export default SelectOptions;