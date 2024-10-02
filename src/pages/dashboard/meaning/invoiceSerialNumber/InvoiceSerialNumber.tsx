import { Eye, FilePdf,  MicrosoftExcelLogo, Pencil, Trash } from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import EditInvoiceSerialNumber from "./EditInvoiceSerialNumber";
import ViewInvoiceSerialNumber from "./ViewInvoiceSerialNumber";

const InvoiceSerialNumber = () => {
  const data = [
    {
      id: "1",
      companyName: "DANGOTE LIMITED",
      Year: "2024",
      InvoiceSentType:"E-Archive",
      InvoiceSerialCode:"TKN",
      LastSerialUsed:"2",
      LastInvoicedDateUsed:"30/01/2024",
      

    },
    {
      id: "1",
      companyName: "ZENITH BANK LIMITED",
      Year: "2023",
      InvoiceSentType:"E-Archive",
      InvoiceSerialCode:"SMH",
      LastSerialUsed:"2",
      LastInvoicedDateUsed:"30/01/2024",

    },
    {
      id: "1",
      companyName: "EUROPEAN CENTER BANK",
      Year: "2022",
      InvoiceSentType:"E-Archive",
      InvoiceSerialCode:"ENA",
      LastSerialUsed:"3",
      LastInvoicedDateUsed:"30/01/2024",

    },
    
  ];

  const [showEditSerialNumber, setEditSerialNumber] = useState(false);

  const openModal = () => {
    setEditSerialNumber(true);
  };

  const [showViewSerialNumber, setViewSerialNumber] = useState(false);

  const viewopenModal = () => {
    setViewSerialNumber(true);
  };



  return (
    
    <>
    <EditInvoiceSerialNumber
     show={showEditSerialNumber}
     closeModal={() => setEditSerialNumber(false)}
     
    />
    <ViewInvoiceSerialNumber
    show={showViewSerialNumber}
    closeModal={() => setViewSerialNumber(false)}
    />
    
      <div className="flex justify-between items-center gap-3 text-xs mb-5">
        <h2 className="font-bold text-sm">INVOICE SERIAL NUMBER</h2>
        
        {/* end of dev */}
      </div>
      <p className="text-xs mb-4">Meaning</p>

      <div className="flex justify-between items-center gap-3 text-xs mb-5">
        <div className="flex justify-between items-center gap-2">
          <p className="inline-block mr-4">Save file as</p>
          <span title="Excel">
            <MicrosoftExcelLogo
              size={24}
              color="green"
              weight="regular"
              className="cursor-pointer"
            />
          </span>
          <span title="PDF">
            <FilePdf
              size={24}
              color="red"
              weight="regular"
              className="cursor-pointer"
            />
          </span>
        </div>
        
      </div>



      {/* Serial number display */}
      <div className="w-full overflow-x-scroll mb-4">
        <table className="w-full table-auto text-xs mb-4">
          <thead className="whitespace-nowrap">
            <tr className="bg-[#F3FAFF]">
              
              <th className="p-3 text-start border border-primary">
              Company Name
              </th>
              <th className="p-3 text-start border border-primary">
              Year
              </th>
              <th className="p-3 text-start border border-primary">
              Invoice Sent Type
              </th>
              
              <th className="p-3 text-start border border-primary">
              Invoice Serial Code
              </th>
              <th className="p-3 text-start border border-primary">
              Last Serial Used
              </th>
              <th className="p-3 text-start border border-primary">
              Last Invoiced Date Used
              </th>
              <th className="p-3 text-start border border-primary text-hidden"></th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap">
            {data.map((item, id) => (
              <tr key={item.id}>
                
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.companyName}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.Year}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.InvoiceSentType}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.InvoiceSerialCode}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.LastSerialUsed}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.LastInvoicedDateUsed}
                </td>
                
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger((+id + 1) / 2) ? "bg-[#FBFBFB]" : ""
                  }`}
                >
                  <div className="flex justify-start items-center gap-2">
                    <Pencil
                      size={16}
                      color="green"
                      className="cursor-pointer" onClick={openModal}
                    />
                    <Trash size={16} color="red" className="cursor-pointer" />
                    <Eye size={16} color="orange" onClick={viewopenModal} className="cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination/>
      <div>
        <button  className="addUser xs capitalize">
          Add new record
        </button>
      </div>
    </>
  )
}

export default InvoiceSerialNumber;