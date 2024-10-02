/* eslint-disable @typescript-eslint/no-explicit-any */
import createInvoiceIcon from "../assets/icons/Create invoice.png";
import createDeliveryIcon from "../assets/icons/Create invoice.png";
import createProducerReceiptIcon from "../assets/icons/Producer Receipt.png";
import createELedgerIcon from "../assets/icons/E-ledger.png";
import outgoingIcon from "../assets/icons/Outgoing.png";
import archiveIcon from "../assets/icons/Archive.png";
import currencyUnitIcon from "../assets/icons/Current Unit..png";
import myCompnaiesIcon from "../assets/icons/My Company.png";
import usersIcon from "../assets/icons/User.png";



export const dashboardSideLinks:any = {
    "meaning": [
        {
            name: "currency unit", 
            path: "meaning/currency-unit",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={currencyUnitIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "my companies", 
            path: "meaning/my-companies",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={myCompnaiesIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        // {name: "E-Payroll Personnel List", path: "meaning/e-payroll-personnel"},
        // {name: "Address Book", path: "meaning/address-book"},
        {
            name: "users", 
            path: "meaning/users",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={usersIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        // {name: "Invoice Serial Number", path: "meaning/invoice-number"},
        // {name: "Dispatch Number", path: "meaning/dispatch-number"},
        // {name: "Producer Serial Number", path: "meaning/producer-number"}
    ],
    "draft": [
        {
            name: "create invoice", 
            path: "draft/create-invoice",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={createInvoiceIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "create delivery note", 
            path: "draft/create-delivery-note",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={createDeliveryIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "producer receipts", 
            path: "draft/producer-receipts",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={createProducerReceiptIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "E-Ledger", 
            path: "draft/e-ledger",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={createELedgerIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        }
    ],
    // "invoice received": [
    //     {name: "received", path: "invoice-received/received"},
    //     {name: "incoming e", path: "invoice-received/incoming-e"},
    //     {name: "archived", path: "invoice-received/archived"},
    //     {name: "cancelled", path: "invoice-received/cancelled"},
    //     {name: "envelopes archived", path: "invoice-received/envelopes-archived"},
    //     {name: "search", path: "invoice-received/search"}
    // ],
    "outgoing invoice": [
        {
            name: "outgoing", 
            path: "outgoing-invoice/outgoing",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={outgoingIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "archive", 
            path: "outgoing-invoice/archive",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={archiveIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        }
    ],
    "outgoing delivery note": [
        {
            name: "outgoing", 
            path: "outgoing-delivery/outgoing",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={outgoingIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        {
            name: "archive", 
            path: "outgoing-delivery/archive",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={archiveIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        // {name: "cancellation", path: "outgoing-delivery/cancellation"},
        // {name: "call", path: "outgoing-delivery/call"}
    ],
    // "incoming delivery note": [
    //     {name: "incoming", path: "incoming-delivery/incoming"},
    //     {name: "archive", path: "incoming-delivery/archive"},
    //     {name: "call", path: "incoming-delivery/call"}
    // ],
    "outgoing producer receipt": [
        {
            name: "outgoing", 
            path: "outgoing-producer-receipt/outgoing",
            icon: <span className="w-[20px] min-w-[20px] h-[20px] flex justify-center items-center p-1 rounded-full bg-primary"> <img src={outgoingIcon} alt="Icon" className="w-full h-full object-cover" /> </span>
        },
        // {name: "archive", path: "outgoing-producer-receipt/archive"},
        // {name: "cancellations", path: "outgoing-producer-receipt/cancellations"},
        // {name: "call", path: "outgoing-producer-receipt/call"}
    ]
}

