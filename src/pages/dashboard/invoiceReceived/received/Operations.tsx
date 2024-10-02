import { useState } from "react";

interface OperationsProps {
    className?: string;
}

const Operations = ({className}: OperationsProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [, setSelectedOption] = useState("");
    const options: string[] = [
        "Create Sales invoice",
        "Send to Archieve",
        "Retry response",
        "Marked as read",
        "Marked as unread",
        "Send invoice content to luca",
        "Inter-branch transfer"
    ]

    return (
        <div tabIndex={0} onBlur={() => setTimeout(() => setShowOptions(false), 200)} 
            className={`inline-block rounded-lg bg-[#238DC1] text-white py-1 px-3 cursor-pointer text-xs ${className}`}
            onClick={() => setShowOptions(!showOptions)}
        >
            <span>Operations</span>

            {
                showOptions ? (
                    <ul className="w-full min-w-max bg-white text-[#333333] border rounded p-1 absolute top-6 right-0 z-10">
                        {
                            options.map((option) => (
                                <li key={option} onClick={() => setSelectedOption(option)} className="capitalize hover:bg-sky-100 py-1 px-2 mb-1">{option}</li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}

export default Operations;