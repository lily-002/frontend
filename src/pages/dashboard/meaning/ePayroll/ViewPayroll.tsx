
import { Eye, X } from "@phosphor-icons/react";

interface ViewPayrollProps {
    id: number | string;
    show: boolean;
    handleClosePayroll: () => void;
}
const ViewPayroll = ({show, handleClosePayroll} : ViewPayrollProps) => {

  return (
    <div><div className={`w-full h-screen overflow-y-scroll ${show ? "fixed" : "hidden" } left-0 top-0 transition-all z-50 md:bg-[#00000080]`}>
    <div className=" w-full h-full  float-right md:w-[30%]  transition-all bg-white text-[#333333] text-xs">
       <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
           <span className="flex items-center gap-2"><Eye color="red" size={20} />
             <h1 className="text-md font-semibold text-sm">View payroll</h1></span>
             <X size={20} onClick={handleClosePayroll}  className="cursor-pointer" />
         </div>

         <div className="p-5 space-y-3"> 
  
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">First Name</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="Mohammad"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Last Name</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="Mohammed"/>
     </div> 
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">TRI ID Number</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>

     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Mobile Phone</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Email</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Place of Birth</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Father Name</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">Security Code</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <div className="">
         <label htmlFor="" className="block font-semibold mb-1">TRI ID Number</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="3230512384"/>
     </div>
     <label htmlFor="" className="block font-semibold p-2 text-primary w-full border-b border-primary">LUCA INFORMATION</label>
        <div className="">
        <label htmlFor="" className="block font-semibold mb-1">Date of last update</label>
         <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="28/02/ 15:30 PM"/>
        </div>
        <div>
          <label htmlFor="" className="block font-semibold mb-1">Last update User</label>
          <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text"  placeholder="Adul"/>
        </div>

     <button onClick={handleClosePayroll} className="rounded-lg bg-[#F16623] text-white py-1 px-3 flex justify-center items-center">Close</button>
     </div>

     
    </div>


 </div></div>
  )
}

export default ViewPayroll;