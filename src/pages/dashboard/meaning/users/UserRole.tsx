/* eslint-disable @typescript-eslint/no-explicit-any */
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";

interface UserRoleProps {
    className?: string;
    top?: string;
}


const UserRole = ({className, top}: UserRoleProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const options: string[] = [
        "Company User",
        "Company User -> Meaning Authorization",
        "Company User -> Sent Invoice Send Authorization"
    ];

    const handleParentClick = (ev: any) => {
        const target = (ev.target as HTMLDivElement);
        
        if(target.className.includes("userRole")){
            return setShowDropdown(!showDropdown);
        }
    }

    // const handleBlur = (ev: any) => {
    //     const target = ev.target as HTMLDivElement;
    // }

    return (
        <div 
            // tabIndex={0}
            // onBlur={handleBlur}
            className={`userRole w-full cursor-pointer text-xs flex justify-between items-center gap-3 ${className}`}
            onClick={handleParentClick}
        >
            <span onClick={() => setShowDropdown(!showDropdown)} className="roleChild">Select role for user</span>

            <CaretDown size={12} weight="bold" className={`roleChild ${showDropdown ? "rotate-180" : ""} transition-all w-[12px] min-w-[12px]`} />

            {
                showDropdown ? (
                    <ul className={`roleChild w-full min-w-max bg-white text-[#333333] border rounded p-1 absolute top-6 right-0 z-10 ${top}`}>
                        {
                            options.map((option) => (
                                <label key={option} htmlFor={option} className="roleChild">
                                    <li  className={`roleChild capitalize hover:bg-sky-100  py-1 px-2 mb-1 flex justify-start items-center gap-2`}>
                                        <input
                                            type="checkbox"
                                            id={option}
                                            className="roleChild w-[14px] h-[14px] text-nowrap accent-primary"
                                        />
                                        <span className="roleChild">{option}</span>
                                    </li>
                                </label>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}

export default UserRole;