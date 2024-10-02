import { ArrowsClockwise, DownloadSimple, EnvelopeSimple, Eye, FilePdf, FunnelSimple, MicrosoftExcelLogo, Printer, Trash } from "@phosphor-icons/react";
import SelectOptions from "../../components/SelectOptions";
import { useState } from "react";
import Pagination from "../../components/Pagination";

const Archived = () => {
  const [formData, setFormData] = useState({GIBInvoiceType: ""});
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const itemsIDs = [1, 2, 3];
  const GIBInvoiceType: string[] = [
    "All",
    "Sales",
    "Returned",
    "Withholding",
    "Exception",
    "Special Basis",
    "Export Registered",
    "SGK",
    "Charge",
    "Drunkness",
    "Accommodation Tax",
    "Broker",
    "HKSSATIS",
    "HKSCOMMISSIONER"
  ];

  const handleCheckAll = () => selectedIDs.length === itemsIDs.length ? setSelectedIDs([]) : setSelectedIDs(itemsIDs);

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }

  return (
    <>
      <h2 className="font-bold text-sm mb-2">ARCHIVED</h2>
      <p className="text-xs mb-4">Invoice Recieved</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:col-span-2 xl:col-span-3">
          
          <input type="text" name="customerName"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Customer Name or Tax Number"
          />

          <input type="date" name="invoiceStartDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="date" name="invoiceEndDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="text" name="maximumInvoiceAmount"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="(Maximum) Invoice Amount"
          />

          <input type="text" name="minimumInvoiceAmount"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Invoice amount (minimum)"
          />

          <SelectOptions
            title="GIB Invoice Type"
            selectedOption={formData.GIBInvoiceType}
            setSelectedOption={(userSelection) => setFormData({...formData, GIBInvoiceType: userSelection})}
            options={GIBInvoiceType}
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            top="top-8"
          />

        </div>

        <div className="">
          <div className="flex justify-start items-center gap-4">
            <ArrowsClockwise size={20} weight="regular" className="cursor-pointer" />
            
            <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer">
              <FunnelSimple size={20} />
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-start items-center gap-4 flex-wrap mb-10">
          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="basic"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="basic">Basic</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="commercial"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="commercial">Commercial</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="accepted"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="accepted">Accepted</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="rejected"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="rejected">Rejected</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="returned"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="returned">Returned</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="allStatus"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="allStatus">All</label>
          </div>
      </div>

      <div className="w-full min-h-[200px] bg-white text-[#333333] border shadow-md p-3">
        {/* Icons */}
        <div className="flex justify-between items-center gap-4 flex-wrap mb-5">
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <span title="Excel">
              <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
            </span>

            <span title="PDF">
              <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Printer">
              <Printer size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Message">
              <EnvelopeSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Download">
              <DownloadSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
          </div>

          <div className="flex justify-start items-center gap-2 flex-wrap text-xs">
            <span title="Reload">
              <ArrowsClockwise size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
            
            <button className="bg-primary text-white rounded-lg py-1 px-4">Take from Archive</button>

          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-scroll mb-4">
          <table className="w-full table-auto text-xs mb-3">
            <thead className="whitespace-nowrap">
              <tr className="bg-[#F3FAFF]">
                <th className="p-3 text-start border border-primary">
                  <input type="checkbox"
                    className="w-[14px] h-[14px] accent-primary"
                    value={"all"}
                    onChange={() => handleCheckAll()}
                    checked={(selectedIDs.length === itemsIDs.length)}
                  />
                </th>
                <th className="p-3 text-start border border-primary">Customer Name</th>
                <th className="p-3 text-start border border-primary">GIB Invoice Type</th>
                <th className="p-3 text-start border border-primary">Customer Tax Number</th>
                <th className="p-3 text-start border border-primary">Invoice Date</th>
                <th className="p-3 text-start border border-primary">Invoice ID</th>
                <th className="p-3 text-start border border-primary">Invoice UUID</th>
                <th className="p-3 text-start border border-primary">ERP Status</th>
                <th className="p-3 text-start border border-primary">Despatch Reference</th>
                <th className="p-3 text-start border border-primary">Amount</th>
                <th className="p-3 text-start border border-primary">Status</th>
                <th className="p-3 text-start border border-primary">Package Info</th>
                <th className="p-3 text-start border border-primary">Received Date</th>
                <th className="p-3 text-start border border-primary">Response Date</th>
                <th className="p-3 text-start border border-primary">Portal Status</th>
                <th className="p-3 text-start border border-primary">Connector Status</th>
                <th className="p-3 text-start border border-primary">Last Update User</th>
                <th className="p-3 text-start border border-primary"></th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {
                itemsIDs.map(num => (
                  <tr key={num}>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <input type="checkbox"
                          className="w-[14px] h-[14px] accent-primary"
                          value={num}
                          checked={selectedIDs.includes(num)}
                          onChange={() => handleCheck(num)}
                        />
                      </td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>John Doe</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Commercial-Sales</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>DANGOTE LIMITED</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>25.00 USD</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>25.00 USD</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>3230512384</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>3230512384</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>3230512384</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>3230512384</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} text-green-500`}>Add Payment</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>02/02/24</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>TEK2024000000040</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>1,180.00 USD</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} bg-[#FFFF00]`}>Waiting for response fron customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>5251E27A-4A88-4DCA-A8FE-FC8158716A39</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Musa</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center gap-2">
                          <Trash size={16} color="red" weight="regular" className="cursor-pointer" />
                          <Eye size={16} color="red" weight="regular" className="cursor-pointer" />
                        </div>
                      </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
        
        <Pagination />

      </div>
    </>
  )
}

export default Archived;