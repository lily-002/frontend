import { X, File } from "@phosphor-icons/react";

interface addDocumentModalProps {
  id: number | string;
  show: boolean;
  handleCloseDocumentModal: () => void;
}

const AddDocumentModal = ({show, handleCloseDocumentModal} : addDocumentModalProps) => {

  return (
    <div className={`w-full h-[100vh] md:h-screen md:overflow-y-scroll ${show ? "fixed" : "hidden" }  left-0 top-0 transition-all z-50 bg-[#00000080]`}>
    <div className="w-full h-screen flex items-center justify-center p-3 "> 
     <div className="bg-white md:w-[30%] w-full rounded-md  ">
     <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
          <span className="flex items-center gap-2"><File color="green" size={20} />
            <h1 className="text-md font-semibold text-sm">Adding document</h1></span>
            <X size={20} onClick={handleCloseDocumentModal}  className="cursor-pointer hover:text-red-500" />
        </div>

        <div className="p-3">
        <label htmlFor="" className="block font-semibold p-2 text-primary w-full border-b border-primary">LUCA INFORMATION</label>
    <div className="p-3">
    <label htmlFor="" className="block font-semibold mb-1">File Title</label>
     <select className="w-full border bg-white border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all">
      <option value="" id="">Individual Application Form</option>
      <option value="" id="">Individual User Commitment</option>
      <option value="" id="">Copy of Identity card</option>
      <option value="" id="">Protocol between Company and Personnel</option>
      
     </select>
    </div>
    <div className="p-3">
      <input type="file" name="" id="" />
    </div>
        </div>

     </div>
    </div> </div>
  )
}

export default AddDocumentModal;