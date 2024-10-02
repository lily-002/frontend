import { User, X } from "@phosphor-icons/react";
interface AddRecordProps {
        id: number | string;
      showRecord: boolean; 
      handleCloseRecord: () => void;
    }


const TABLE_ROW = ["Name", "Email", "Phone", "Notes"]
const AddRecord = ({ showRecord,handleCloseRecord}:AddRecordProps) => {
    return (
        <div className={`w-full h-screen overflow-y-scroll md:bg-[#00000080] transition-all ${showRecord ? "fixed" : "hidden"}  top-0 left-0 z-50`}>
            <div className="bg-white w-full md:w-[30%] h-[300vh] transition-all float-right">
                <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
                    <span className="flex items-center gap-2">
                        <User color="green" size={20} />
                        <h1 className="text-md font-semibold text-sm">Add Supplier/Customer Name </h1>
                    </span>

                    <X size={20} onClick={handleCloseRecord} className="cursor-pointer" />
                </div>
                <div className="p-5 space-y-3">
                    <label className="block font-semibold p-2 space-x-2 text-primary w-full border-b border-primary" htmlFor="">
                   SUPPLIER-CUSTOMER INFORMATION
                    </label>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Supplier/Customer Name*
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Mohammed" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Supplier Code*
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Mohammed" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Tax Office
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="123456" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Tax Number*
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="123456789" />
                    </div>

                    <label className="block font-semibold p-3 text-primary w-full border-b border-primary" htmlFor="">
                        PAYMENT INFORMATION FOR PUBLIC BILLS
                    </label>

                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Payment method
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Promissory note signed by a third party" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Payment Channel
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Mohammed" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Payment Account Number
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0987654321" />
                    </div>

                    <label className="block font-semibold p-3 text-primary w-full border-b border-primary" htmlFor="">
                        COMMUNICATION INFORMATION
                    </label>

                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Country
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Turkey" />
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            City*
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="konya" />
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Post code
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="654321" />
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            phone
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0987654321" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            address
                        </label>
                        <input className="w-full border  border-[#D9D9D9] rounded p-5 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="" />
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Mobile Number for Notification
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="+90(5__) ___-____" />
                    </div>

                    <div className="p-2 gap-2">
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Outgoing E-invoice SMS Notification</p>
                        </span>
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Sms notification enabled for sent e-archive invoice</p>
                        </span>
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Email notification enabled for sent e-archive invoice</p>
                        </span>
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Email
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="_" />
                    </div>
                    <div className="p2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Web Url
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="_" />
                    </div>

                    <label className="block font-semibold p-3 text-primary w-full border-b border-primary" htmlFor="">
                        E-DELIVERY NOTE INFORMATION
                    </label>

                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            GIB Mailbox Label *
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="" />
                    </div>
                    <label className="block font-semibold p-3 text-primary w-full border-b border-primary" htmlFor="">
                        E-ACCOUNTING
                    </label>

                    <div className="p-2 space-x-3 flex">
                        <span>
                            <label htmlFor="" className="block font-semibold mb-1">
                                Debt
                            </label>
                            <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0,00" />
                        </span>

                        <span>
                            <label htmlFor="" className="block font-semibold mb-1">
                                Credit
                            </label>
                            <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0,00" />
                        </span>
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Number of Days for Debt Postponement
                        </label>
                        <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0,00" />
                    </div>
                    <div className="flex items-center space-x-2 space-y-6 p-2">
                        <div className="">
                            <label htmlFor="" className="block font-semibold mb-1">
                                Credit Limit Amount
                            </label>
                            <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="0,00" />
                        </div>

                        <select className="border p-2 border-[#D9D9D9] rounded  focus:outline-primary focus:border-primary transition-all" name="" id="">
                            <option value="">USD </option>
                            <option value="">EUR </option>
                            <option value="">TRY </option>
                            <option value="">INR </option>
                            <option value="">GBP </option>
                        </select>
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Expense Type
                        </label>
                        <select className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all">
                            <option value="">Service production expenses </option>
                            <option value="">Marketing expenses</option>
                            <option value="">Bank expenses</option>
                            <option value="">Taxes</option>
                            <option value="">General and administrative expenses</option>
                        </select>
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="block font-semibold mb-1">
                            Expense Sub Type
                        </label>
                        <select className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all">
                            <option value="">Choose</option>
                            <option value="">Service production expenses </option>
                            <option value="">Marketing expenses</option>
                            <option value="">Bank expenses</option>
                            <option value="">Taxes</option>
                            <option value="">General and administrative expenses</option>
                        </select>
                    </div>

                    <div className="p-2 gap-2">
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Do not track product movements</p>
                        </span>
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Company Employee</p>
                        </span>
                        <span className="flex gap-2 p-2 ">
                            <input type="checkbox" name="" id="" /> <p>Credit Supplier</p>
                        </span>
                    </div>

                    <label className="block font-semibold p-3 text-primary w-full border-b border-primary" htmlFor="">
                        ASSOCIATIVE EMPLOYEE
                    </label>

                    <span className="w-full bg-[#DEF1FF]  px-2">Add new record</span>
                    <div>
                        <table className="w-full">
                                <thead>
                                        <tr>{TABLE_ROW.map((head)=>(<th className="border bg-[#DEF1FF] p-3 text-center" key={head}>{head}</th>))}</tr>
                                </thead>
                                <thead>
                                        <tr>{TABLE_ROW.map((head)=>(<th className="border  p-3 text-center" key={head}>{}</th>))}</tr>
                                </thead>
                               
                        </table>
                    </div>
                    <button className="rounded-lg bg-primary text-white py-1 px-3 flex justify-center items-center">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddRecord;
