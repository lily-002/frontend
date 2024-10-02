import {
  Eye,
  FilePdf,
  MicrosoftExcelLogo,
  Pencil,
  Trash,
} from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import AddProducerSerialNumber from "./AddProducerSerialNumber";
import EditProducerSerialNumber from "./EditProducerSerialNumber";
import ViewProducerSerialNumber from "./ViewProducerSerialNumber";

const ProducerSerialNumber = () => {
  const data = [
    {
      id: "1",
      companyName: "DANGOTE LIMITED",
      Year: "2024",
      ProducerSerialCode: "xx",
      LastMMDateUsed: "30/01/2024",
    },
    {
      id: "1",
      companyName: "DANGOTE LIMITED",
      Year: "2024",
      ProducerSerialCode: "QRY",
      LastMMDateUsed: "30/01/2024",
    },

    {
      id: "1",
      companyName: "DANGOTE LIMITED",
      Year: "2024",
      ProducerSerialCode: "QRE",
      LastMMDateUsed: "30/01/2024",
    },
  ];

  const [showAddProducerSerialNumber, setAddProducerSerialNumber] =
    useState(false);

  const AddModal = () => {
    setAddProducerSerialNumber(true);
  };

  const [showEditProducerSerialNumber, setEditProducerSerialNumber] =
    useState(false);

  const EditModal = () => {
    setEditProducerSerialNumber(true);
  };

  const [showViewProducerSerialNumber, setViewProducerSerialNumber] =
    useState(false);

  const ViewModal = () => {
    setViewProducerSerialNumber(true);
  };

  return (
    <>
      <ViewProducerSerialNumber
        show={showViewProducerSerialNumber}
        closeModal={() => setViewProducerSerialNumber(false)}
      />

      <AddProducerSerialNumber
        show={showAddProducerSerialNumber}
        closeModal={() => setAddProducerSerialNumber(false)}
      />
      <EditProducerSerialNumber
        show={showEditProducerSerialNumber}
        closeModal={() => setEditProducerSerialNumber(false)}
      />
      <div className="flex justify-between items-center gap-3 text-xs mb-5">
        <h2 className="font-bold text-sm">PRODUCER SERIAL NUMBER</h2>

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
                Producer Serial Code
              </th>

              <th className="p-3 text-start border border-primary">
                Last MM Date Used
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
                  {item.ProducerSerialCode}
                </td>

                <td
                  className={`p-3 border border-[#D9D9D9] ${
                    Number.isInteger(+id + 1) ? "bg-[#FBFBFB] " : ""
                  }`}
                >
                  {item.LastMMDateUsed}
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
                      onClick={ViewModal}
                      color="orange"
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

export default ProducerSerialNumber;
