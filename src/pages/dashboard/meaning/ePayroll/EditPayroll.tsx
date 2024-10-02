import { PencilSimple, X } from "@phosphor-icons/react";

interface EditPayrollProps {
    id: number | string;
    show: boolean;
    handleClosePayroll: () => void;
}


const EditPayroll = ({show, handleClosePayroll} :  EditPayrollProps) => {

  return (

   
    <div className={`w-full h-[200vh] md:h-screen overflow-y-scroll ${show ? "fixed" : "hidden" }  left-0 top-0 transition-all z-50 md:bg-[#00000080]`} >

     
      
       <div className=" h-[100vh]  float-right md:w-[30%]  transition-all bg-white text-[#333333] text-xs">
          <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
              <span className="flex items-center gap-2"><PencilSimple color="green" size={20} />
                <h1 className="text-md font-semibold text-sm">Edit payroll</h1></span>
                <X size={20} onClick={handleClosePayroll} className="cursor-pointer hover:text-red-500" />
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
        <button className="rounded-lg bg-primary text-white py-1 px-3 flex justify-center items-center">Save</button>
        </div>

        
       </div>


    </div>
  )
}

export default EditPayroll;