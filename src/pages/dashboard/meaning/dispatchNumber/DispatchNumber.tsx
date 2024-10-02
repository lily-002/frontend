import {
  Eye,
  FilePdf,
  MicrosoftExcelLogo,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import ViewDispatchSerialNumber from "./ViewDispatchSerialNumber";
import { useState } from "react";
import EditDispatchSerialNumber from "./EditDispatchSerialNumber";
import AddDispatchSerialNumber from "./AddDispatchSerialNumber";

const DispatchNumber = () => {
  const data = [
    {
      id: "1",
      companyName: "DANGOTE LIMITED",
      Year: "2024",
      DespatchSendType: "E-Deliver Note",
      DespatchSerialCode: "D10",
      LastSerialUsed: "14",
      LastDespatchDateUsed: "30/01/2024",
    },
    {
      id: "1",
      companyName: "ZENITH BANK LIMITED",
      Year: "2023",
      DespatchSendType: "E-Deliver Note",
      DespatchSerialCode: "D11",
      LastSerialUsed: "12",
      LastDespatchDateUsed: "30/01/2024",
    },
    {
      id: "1",
      companyName: "EUROPEAN CENTER BANK",
      Year: "2024",
      DespatchSendType: "E-Deliver Note",
      DespatchSerialCode: "D10",
      LastSerialUsed: "208",
      LastDespatchDateUsed: "30/01/2024",
    },
  ];
  const [showDispatchSerialNumber, setDispatchSerialNumber] = useState(false);

  const openModal = () => {
    setDispatchSerialNumber(true);
  };

  const [showEditDispatchSerialNumber, setEditDispatchSerialNumber] =
    useState(false);

  const EditModal = () => {
    setEditDispatchSerialNumber(true);
  };

  const [showAddDispatchSerialNumber, setAddDispatchSerialNumber] =
    useState(false);

  const AddModal = () => {
    setAddDispatchSerialNumber(true);
  };

  return (
    <>
      <AddDispatchSerialNumber
        show={showAddDispatchSerialNumber}
        closeModal={() => setAddDispatchSerialNumber(false)}
      />
      <EditDispatchSerialNumber
        show={showEditDispatchSerialNumber}
        closeModal={() => setEditDispatchSerialNumber(false)}
      />
      <ViewDispatchSerialNumber
        show={showDispatchSerialNumber}
        closeModal={() => setDispatchSerialNumber(false)}
      />
      <div className="flex justify-between items-center gap-3 text-xs mb-5">
        <h2 className="font-bold text-sm">DESPATCH SERIAL NUMBER</h2>

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
              <th className="p-3 text-start border border-primary">Year</th>
              <th className="p-3 text-start border border-primary">
                Despatch Send Type
              </th>

              <th className="p-3 text-start border border-primary">
                Despatch Serial Code
              </th>
              <th className="p-3 text-start border border-primary">
                Last Serial Used
              </th>
              <th className="p-3 text-start border border-primary">
                Last Despatch Date Used
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
                  {item.DespatchSendType}
                </td>
                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.DespatchSerialCode}
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
                  {item.LastDespatchDateUsed}
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
                      className="cursor-pointer"
                      onClick={EditModal}
                    />
                    <Trash size={16} color="red" className="cursor-pointer" />
                    <Eye
                      size={16}
                      color="orange"
                      onClick={openModal}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
      <div>
        <button onClick={AddModal} className="addUser xs capitalize">
          Add new record
        </button>
      </div>
    </>
  );
};

export default DispatchNumber;
