/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilePdf, MicrosoftExcelLogo } from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { useEffect } from "react";
import { getCurrencies } from "../../../../store/features/Currencies";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";


const CurrencyUnit = () => {
  const { currencies, loading, message } = useAppSelector(state => state.currencies);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();


  useEffect(() => {

    if(!currencies.length){ dispatch(getCurrencies())}

  }, [dispatch, currencies.length]);


  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currencies.map(currency => (
      {
        [t("description.dashboard.code_of_currency_unit")]: currency.code,
        [t("description.dashboard.description_of_currency_unit")]: currency.name
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft Currencies.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.code_of_currency_unit"),
        t("description.dashboard.description_of_currency_unit")
      ]],
      body: currencies.map(currency => [
        currency.code,
        currency.name
      ]),
      headStyles: {
        fillColor: "#238DC1",
        lineWidth: 0.1,
        lineColor:  "#238DC1",
        fontSize: 10
      },
      bodyStyles: {
        lineWidth: 0.1,
        fontSize: 10
      }
    });

    doc.save('EConiaSoft Currencies.pdf');
  };


  return (
    <>
      <h2 className="font-bold text-sm mb-2">{t("description.dashboard.UNITS_OF_CURRENCY")}</h2>
      <p className="text-xs mb-4">{t("description.dashboard.meaning")}</p>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
          <>
            <div className="flex justify-start items-center gap-2 text-xs mb-5">
              <span className="inline-block mr-4">{t("description.dashboard.save_file_as")}</span>

              <span title="Excel" onClick={generateExcel}>
                <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
              </span>

              <span title="PDF" onClick={exportJsonToPdf}>
                <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
              </span>
            </div>

            {/* Currency display */}
            <div className="overflow-x-scroll mb-4">
              <table className="w-full table-auto text-xs">
                <thead>
                  <tr className="bg-[#F3FAFF]">
                    <th className="p-3 text-start border border-primary">{t("description.dashboard.code_of_currency_unit")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.dashboard.description_of_currency_unit")}</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    currencies.map((currency, index) => (
                        <tr key={currency.id}>
                          <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger((index + 1)/2) ? "bg-[#FBFBFB]" : ""}`}>
                            {currency.code}
                          </td>
                          <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger((index + 1)/2) ? "bg-[#FBFBFB]" : ""}`}>
                            {currency.name}
                          </td>
                        </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            {/* <Pagination /> */}
          </>
        ) : null
      }
    </>
  )
}

export default CurrencyUnit;