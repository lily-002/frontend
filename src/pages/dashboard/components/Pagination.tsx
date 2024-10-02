
// interface PaginationProps {
//     className?: string;
// }

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react"

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = [1, 2, 3, 4, 5];

    const handleNext = () => {
        setCurrentPage((currentPage + 1) > 5 ? 1 : currentPage + 1);
    }

    const handlePrevious = () => {
        setCurrentPage((currentPage - 1) < 1 ? 5 : currentPage - 1);
    }

    return (
        <div className="flex justify-between items-center gap-4 flex-wrap text-xs overflow-x-scroll pb-2">
            <span className="whitespace-nowrap">Showing 10 of the 43 Results</span>

            <div className="flex justify-start items-center gap-4">
                <CaretLeft onClick={handlePrevious} size={16} weight="regular" className="cursor-pointer" />
                {
                    pages.map((page) => (
                        <span key={page} onClick={() => setCurrentPage(page)} className={`inline-block border rounded py-1 px-2 cursor-pointer ${page === currentPage ? "bg-primary text-white" : ""}`}>{page}</span>
                    ))
                }
                <CaretRight onClick={handleNext} size={16} weight="regular" className="cursor-pointer" />
            </div>
        </div>
    )
}

export default Pagination;