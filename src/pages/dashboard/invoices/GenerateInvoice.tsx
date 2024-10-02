/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../../assets/logo/logo.png";
import eFaturaLogo from "../../../assets/images/fatura_logo.jpg";
import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";


const GenerateInvoice = () => {
  const contentToPrint = useRef(null);
  const [loading, setLoading] = useState(false);
  const { invoiceId } = useParams();
  const [globalLoader, ] = useState(false);


  useEffect(() => {

    console.log("Id: ", invoiceId);


  }, [invoiceId]);


  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "ATAFOM-Invoice",
    onBeforePrint: () => setLoading(true),
    onAfterPrint: () => setLoading(false),
    removeAfterPrint: true
  });

  if(globalLoader){ return <Loader message="Processing..." />}

  return (
    <>
      <div className="w-full h-[80px] border-b border-b-gray-200 p-2 text-[0.8rem] flex justify-end items-center">
        <button onClick={handlePrint}  className="rounded-md py-2 px-6 bg-secondary text-white flex justify-center items-center gap-1">
          {loading ? <span className="inline-block w-[16px] h-[16px] rounded-full border-2 border-white border-b-transparent animate-spin"></span> : null}
          <span>Generate PDF</span>
        </button>
      </div>

      <div ref={contentToPrint} className={`w-full max-w-[1500px] min-h-[calc(100vh-80px)] mx-auto overflow-y-scroll text-[0.6rem] p-6`}>

          <div className="grid grid-cols-3 gap-4 justify-between items-center mb-4">
              {/* Logo */}
              <div>
                  <span className="inline-block w-[110px] h-[80px] overflow-hidden">
                      <img src={logo} alt="logo" className="w-full h-full object-contain" />
                  </span>

                  <p className="font-semibold text-[0.6rem]">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
              </div>

              {/* Badge */}
              <div className="flex justify-center items-center">
                  <strong className="inline-block font-semibold text-xl">e-Belge</strong>
              </div>

              {/* QR Code */}
              <div className="flex justify-end items-start">
                  <span className="inline-block w-[100px] h-[100px] border">
                  <QRCode
                  // size={100}
                  style={{ height: "100%", width: "100%", objectFit: "cover"}}
                  value={"https://econiasoft.com/invoice/1"}
                  // viewBox={`0 0 256 256`}
                  />
                  </span>
              </div>
          </div>

          {/* Headings */}
          <div className="grid grid-cols-3 gap-4 justify-between items-center mb-4">
              <div className="border-t-2 border-t-gray-600 py-2 border-b-2 border-b-gray-600">
              <p className="mb-1">PERFECT TIMING HOLDINGS LOGISTICS INT.</p>
              <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit consequatur ducimus vitae. Tempore laborum esse qui veniam minima quod totam.</p>
              <p className="mb-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit consequatur ducimus vitae. Tempore laborum esse qui veniam minima quod totam.</p>
              <p className="mb-1">Tel: +90332233443322</p>
              <p className="mb-1">Website: www.website.com</p>
              <p>E-Postal: pth.gula@gmail.com</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, sed.</p>
              </div>

              {/* Company logo */}
              <div className="flex justify-center items-center flex-col gap-1">
              <span className="inline-block w-[80px] h-[80px] border overflow-hidden rounded-full">
                  <img src={eFaturaLogo} alt="e_fatura_logo" className="w-full h-full object-cover" />
              </span>
              <span>e-Arsive Fatura</span>
              </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-3 gap-4 justify-between items-center mb-6">
              <div className="border-b-2 border-b-gray-600 pb-2">
              <p className="font-bold mb-1">SAYIN</p>
              <p>AZOUR AHLAM</p>
              <p>68 ROUTED D ETREMIERES 2 EME ETAGE 74100 ANNEMASSE</p>
              <p>No:</p>
              <p>Kapi No:</p>
              <p>/ Fransa</p>
              <p>Website:</p>
              <p>E-Postal:</p>
              <p>Tel Fax:</p>
              <p>VKN: 2222222222</p>
              </div>

              
              <div className="col-span-2 flex justify-end items-start self-end">
              <table className="border border-collapse whitespace-nowrap">
                  <tbody>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">Ozellestirme No:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">TR1.2</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">Senaryo:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">EARSIVFATURA</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">Fatura Tipi:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">SATIS</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">Fatura No:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">GIB20230000000032</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">Fatura Tarihi:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">27-05-2023 12:59</th>
                  </tr>
                  </tbody>
              </table>
              </div>
          </div>

          {/*  */}
          <p className="mb-4"><strong>ETTN:</strong> 5220299-4567-5678-987yt-45tgv-9iueaa</p>
          <div>
              <table className="w-full table-fixed border border-gray-500 border-collapse">
              <thead>
                  <tr>
                  <th className="border border-gray-500 p-2 text-start">S/N</th>
                  <th className="border border-gray-500 p-2 text-start">Mal Hizmet</th>
                  <th className="border border-gray-500 p-2 text-start">Firim fiya</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 1</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 2</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 3</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 4</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 5</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 6</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 7</th>
                  <th className="border border-gray-500 p-2 text-start">Firim 8</th>
                  </tr>
              </thead>

              <tbody>
                  {
                  [1, 2, 3].map(num => (
                      <tr key={num}>
                      <td className="border border-gray-500 p-2 text-start">{num}</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem brother to ipsun</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem ipsun</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem ipsun</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem ipsun</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem ipsun</td>
                      <td className="border border-gray-500 p-2 text-start">Lorem </td>
                      <td className="border border-gray-500 p-2 text-start">Lorem </td>
                      <td className="border border-gray-500 p-2 text-start">Lorem </td>
                      <td className="border border-gray-500 p-2 text-start">Lorem </td>
                      <td className="border border-gray-500 p-2 text-start">Lorem </td>
                      </tr>
                  ))
                  }
              </tbody>
              </table>
          </div>

          {/*  */}
          <div className="flex justify-end items-start self-end mb-6">
              <table className="border border-collapse whitespace-nowrap">
                  <tbody>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">Ozellestirme No:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">TR1.2</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">Senaryo:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">EARSIVFATURA</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">Fatura Tipi:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">SATIS</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">Fatura No:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">GIB20230000000032</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">Fatura Tarihi:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">27-05-2023 12:59</th>
                  </tr>
                  </tbody>
              </table>
          </div>

          {/*  */}
          <div className="border border-gray-500 p-6">
              Not: YALNIZ: DOKUZYUZYIRMIUC TL.
          </div>
          
      </div>

    </>
  )
}


export default GenerateInvoice;