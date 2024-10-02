/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, X } from "@phosphor-icons/react";

interface ViewSerialNumberProps {
  show: boolean;
  closeModal: () => void;
}
const ViewInvoiceSerialNumber = ({
  show,
  closeModal,
}: ViewSerialNumberProps) => {
  const handleClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.className.includes("parent")) {
      closeModal();
    }
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`parent w-full h-screen bg-[#00000080] ${
          show ? "fixed" : "hidden"
        } top-0 left-0 z-50 transition-all`}
      >
        {/* form modal */}
        <div className="bg-white text-xs  max-w-sm  shadow-xl w-[500px] h-screen  overflow-y-scroll absolute top-0 right-0 ">
          <div className="Header flex justify-between items-center gap-3 py-4 px-4">
            <div className="flex justify-start items-center gap-2 ">
              <Eye size={16} color="red" className="cursor-pointer" />
              <p className="text-black font-bold text-xs capitalize">
                View Serial Number
              </p>
            </div>
            <div>
              <span className="flex justify-center items-center  w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
                <X
                  size={16}
                  weight="bold"
                  className="cursor-pointer "
                  onClick={closeModal}
                />
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300"></div>
          <form action="" className="py-4 px-4">
            <h4 className=" text-primary font-normal xm leading-7 form-Header">
              INVOICE SERIAL NUMBER INFORMATION
            </h4>
            <div className="border-b border-primary my-4"></div>
            <div className="form body p-2">
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black pb-2">
                  COMPANY NUMBER<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="ALIYU BARDE NIG LIMITED"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="flex justify-between items-center gap-3 capitalize">
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  years
                </label>
                <br />
                <input
                  type="Text"
                  name="view number"
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[160px]"
                  placeholder="2024" />
              </div>

                <div className="mb-3">
                  <label htmlFor="invoice sent" className="font-bold text-black p-2">
                    Invoice Sent Type
                    
                  </label>
                  <input
                  type="Text"
                  name="input number"
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[160px]"
                  placeholder="e-Archieve"
                />
                </div>
              </div>
              

              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Invoice Serial Code 
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="TXN"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Used Serial Number
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="2"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Priority Rank
                </label>
                <br />
                <input
                  type="number"
                  name="phone number"
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[160px]"
                  placeholder="0"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Invoice Date Used 
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="30/01/2024"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                Last Updated User 
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Musa"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                Last Updated Date 
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="30/01/2024 16:20:36 PM"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>

              
              

              
            </div>
            <div>
              <button className=" bg-[#F16623] text-white rounded-full text-xs ml-5 text-center py-2 px-4 mt-5 xs p-2">close</button>
            </div>
          </form>
        </div>
        {/* form end */}
      </div>
    </>
  );
};

export default ViewInvoiceSerialNumber;
