import {   MicrosoftExcelLogo, X } from "@phosphor-icons/react";

interface CustomerUploadProps {
  id: number | string;
  showUpload: boolean; 
  handleCloseUpload: () => void;
}


const CustomerUpload = ({showUpload, handleCloseUpload}:CustomerUploadProps) => {


  return (
       
        <div className={`w-full h-screen z-50 bg-[#00000080] ${showUpload ?  "fixed" : "hidden" } flex justify-center items-center left-0 top-0`}> 
         <div className="bg-white h-[35%] w-full md:w-[40%] p-2 rounded-md ">
         <div className="flex justify-between top-0 left-0 items-center p-3 border-b-2">
              <span className="flex items-center gap-2"><MicrosoftExcelLogo color="green" size={20} />
                <h1 className="text-md font-semibold p-2">Excel Customer Upload</h1></span>
                <X size={20} onClick={handleCloseUpload}  className="cursor-pointer" />
            </div>

            <label htmlFor="" className="border-b w-full text-center p-2 ">Excel files to be uploaded must have .xlsx extension. Sample file :</label>

            <div className="p-2 space-y-2">
            <label htmlFor="" className=" text-primary border-primary">Click to download SAMPLE EXCEL FILE( New Records) | Click to download supplier list</label>
        <div className="p-3">
          <input type="file" name="" id="" />
        </div>
        <button className="bg-primary px-2 rounded-md text-white">Upload File</button>
            </div>
            

         </div>
        </div> 
  )
}

export default CustomerUpload;