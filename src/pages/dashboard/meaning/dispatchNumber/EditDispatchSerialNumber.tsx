/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pencil, X } from "@phosphor-icons/react";

interface EditSerialNumberProps {
  show: boolean;
  closeModal: () => void;
}

const EditDispatchSerialNumber = ({
  show,
  closeModal,
}: EditSerialNumberProps) => {
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
        <div className="bg-white text-xs  max-w-sm   shadow-xl w-[500px] h-screen  overflow-y-scroll absolute top-0 right-0 ">
          <div className="Header flex justify-between items-center gap-3 py-4 px-4">
            <div className="flex justify-start items-center gap-2 ">
              <Pencil size={16} color="green" className="cursor-pointer" />
              <p className="text-black font-bold text-xs capitalize">
                Edit Despatch Serial Number
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
              DESPATCH SERIAL NUMBER
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
              <div className="flex justify-between items-center gap-2 capitalize">
                <div className="mb-3">
                  <label htmlFor="years" className="font-bold text-black p-2">
                    Year
                    <span className="text-red-500 font-bold sm whitespace-normal ">
                      *
                    </span>
                  </label>
                  <br />
                  <select
                    name=""
                    id=""
                    className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[150px]"
                  >
                    <option value=""></option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="years" className="font-bold text-black p-2">
                    Despatch Send Type
                    <span className="text-red-500  font-bold sm whitespace-normal ">
                      *
                    </span>
                  </label>
                  <div className="flex justify-start items-center mt-3 gap-1">
                    <input
                      type="radio"
                      name="DespatchSendType"
                      id="DespatchSendType"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="sentToPrinter">Despatching</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Despatch Serial Code<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter user name"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Serial Used<span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter user name"
                  className="w-full  h-[38px]  mt-3 border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="UserName" className="font-bold text-black p-2">
                  Last Serial Used <span className="text-red-500">*</span>
                </label>
                <br />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter user name"
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
                  className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[150px]"
                />
              </div>
              <div className="footer">
                <h4 className=" text-primary xm leading-7 form-Header font-bold">
                  XSLT INFORMATION
                </h4>
                <div className="border-b border-primary my-4"></div>
              </div>
              <div className="flex justify-between items-center gap-1 capitalize">
                <div className="mb-3">
                  <label
                    htmlFor="file"
                    className="font-bold text-black text-nowrap p-2"
                  >
                    E-Archive XSL File:
                  </label>
                  <input
                    type="file"
                    className="focus:ring-primary text-white focus:border-primary mt-3  w-full pr-12 sm:text-sm border-primary rounded-md"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="FileName"
                    className="font-bold text-black p-2"
                  >
                    <span className="text-red-500 font-bold  text-xs text-nowrap ">
                      There is no e-delivery company..........
                    </span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border border-[#D9D9D9] rounded mt-3 outline-primary transition-all p-2 w-[200px]"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="addUser text-xs ml-3 py-4 px-6">add</button>
            </div>
          </form>
        </div>
        {/* form end */}
      </div>
    </>
  );
};

export default EditDispatchSerialNumber;
