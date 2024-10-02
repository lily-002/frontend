/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Pages
// import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Main from "./pages/dashboard/main/Main";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import CurrencyUnit from "./pages/dashboard/meaning/currencyUnit/CurrencyUnit";
import Meaning from "./pages/dashboard/meaning/Meaning";
import MyCompanies from "./pages/dashboard/meaning/myCompanies/MyCompanies";
import CreateCompany from "./pages/dashboard/meaning/myCompanies/CreateCompany";
// import EPayroll from "./pages/dashboard/meaning/ePayroll/EPayroll";
// import AddressBook from "./pages/dashboard/meaning/addressBook/AddressBook";
import Users from "./pages/dashboard/meaning/users/Users";
// import InvoiceSerialNumber from "./pages/dashboard/meaning/invoiceSerialNumber/InvoiceSerialNumber";
// import DispatchNumber from "./pages/dashboard/meaning/dispatchNumber/DispatchNumber";
// import ProducerSerialNumber from "./pages/dashboard/meaning/producerSerialNumber/ProducerSerialNumber";
import Draft from "./pages/dashboard/draft/Draft";
import CreateInvoice from "./pages/dashboard/draft/createInvoice/CreateInvoice";
import CreateDeliveryNote from "./pages/dashboard/draft/createDeliveryNote/CreateDeliveryNote";
import ProducerReceipt from "./pages/dashboard/draft/producerReceipt/ProducerReceipt";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
// import InvoiceReceived from "./pages/dashboard/invoiceReceived/InvoiceReceived";
// import Received from "./pages/dashboard/invoiceReceived/received/Received";
// import IncomingE from "./pages/dashboard/invoiceReceived/incomingE/IncomingE";
// import Archived from "./pages/dashboard/invoiceReceived/archived/Archived";
// import Cancelled from "./pages/dashboard/invoiceReceived/cancelled/Cancelled";
// import EnvelopesArchived from "./pages/dashboard/invoiceReceived/envelopesArchived/EnvelopesArchived";
// import Search from "./pages/dashboard/invoiceReceived/search/Search";
import ProfileSetting from "./pages/dashboard/profile/ProfileSetting";
import BuyCredit from "./pages/dashboard/credit/BuyCredit";
import OutgoingDeliveryNote from "./pages/dashboard/outgoingDeliveryNote/OutgoingDeliveryNote";
import Outgoing from "./pages/dashboard/outgoingDeliveryNote/outgoing/Outgoing";
import OutgoingDeliveryArchive from "./pages/dashboard/outgoingDeliveryNote/archive/OutgoingDeliveryArchive";
// import Cancellation from "./pages/dashboard/outgoingDeliveryNote/cancellation/Cancellation";
// import Call from "./pages/dashboard/outgoingDeliveryNote/call/Call";
// import IncomingDeliveryNote from "./pages/dashboard/incomingDeliveryNote/IncomingDeliveryNote";
// import Incoming from "./pages/dashboard/incomingDeliveryNote/incoming/Incoming";
// import IncomingDeliveryArchive from "./pages/dashboard/incomingDeliveryNote/archive/IncomingDeliveryArchive";
// import IncomingDeliveryCall from "./pages/dashboard/incomingDeliveryNote/call/IncomingDeliveryCall";
import OutgoingProducerReceipt from "./pages/dashboard/outgoingProducerReceipt/OutgoingProducerReceipt";
import ProducerReceiptOutgoing from "./pages/dashboard/outgoingProducerReceipt/outgoing/ProducerReceiptOutgoing";
// import ProducerReceiptArchive from "./pages/dashboard/outgoingProducerReceipt/archive/ProducerReceiptArchive";
// import ProducerReceiptCancellations from "./pages/dashboard/outgoingProducerReceipt/cancellation/ProducerReceiptCancellations";
// import ProducerReceiptCall from "./pages/dashboard/outgoingProducerReceipt/call/ProducerReceiptCall";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import SuperAdminMain from "./pages/superAdmin/main/SuperAdminMain";

import Authenticated from "./authentication/Authenticated";
import AlreadyLoggedIn from "./authentication/AlreadyLoggedIn";

import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import ConfirmationModal from "./pages/dashboard/components/ConfirmationModal";
import { updateLogout } from "./store/features/Logout";
import { removeToken } from "./services/auth";

import OutgoingInvoice from "./pages/dashboard/outgoingInvoice/outgoing/OutgoingInvoice";
import OutgoingInvoiceArchive from "./pages/dashboard/outgoingInvoice/archive/OutgoingInvoiceArchive";
import useRoles from "./authentication/useRoles";

import CreateELedger from "./pages/dashboard/draft/createELedger/CreateELedger";

import LanguageComponent from "./localization/LanguageComponent/LanguageComponent";
import ELedgers from "./pages/dashboard/eLedger/ELedgers";
// import GenerateInvoice from "./pages/dashboard/invoices/GenerateInvoice";

const App = () => {
  const { logout, message } = useAppSelector(state => state.logout);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const roles = useRoles();

  const handleLogout = () => {
    setLoading(true);
    toast.success("Logout successful", {autoClose: 2000, pauseOnHover: false});
    return setTimeout(() => {
      removeToken();
      return window.location.reload();
    }, 2000);
  }

  const handleCancel = () => {
    dispatch(updateLogout({logout: false}));
    setLoading(false);
  }

  return (
    <>
      {/* Toastify */}
      <ToastContainer autoClose={2000} position="top-center" style={{fontSize: "0.8rem"}} />

      {/* Localization */}
      <LanguageComponent />

      {/* Logout Modal */}
      <ConfirmationModal 
        show={logout}
        message={message}
        loading={loading}
        handleProceed={handleLogout}
        handleCancel={handleCancel}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Auth */}
          <Route path="/auth/login" element={<AlreadyLoggedIn> <Login /> </AlreadyLoggedIn>} />
          <Route path="/auth/sign-up" element={<AlreadyLoggedIn> <SignUp /> </AlreadyLoggedIn>} />
          <Route path="/auth/forgot-password" element={<AlreadyLoggedIn> <ForgetPassword /> </AlreadyLoggedIn>} />
          <Route path="/auth/reset-password" element={<AlreadyLoggedIn> <ResetPassword /> </AlreadyLoggedIn>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Authenticated> <Dashboard /> </Authenticated>}>
            <Route index element={<Main />} />

            <Route path="profile-setting" element={<ProfileSetting />} />

            {/* Meaning */}
            {
              roles && roles.includes("admin") ? (
                <Route path="meaning" element={<Meaning />}>
                  <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="currency-unit" element={<CurrencyUnit />} />
                        <Route path="my-companies" element={<MyCompanies />} />
                        <Route path="my-companies/create" element={<CreateCompany />} />
                        {/* <Route path="e-payroll-personnel" element={<EPayroll />} /> */}
                        {/* <Route path="address-book" element={<AddressBook />} /> */}
                        <Route path="users" element={<Users />} />
                        {/* <Route path="invoice-number" element={<InvoiceSerialNumber />} /> */}
                        {/* <Route path="dispatch-number" element={<DispatchNumber />} /> */}
                        {/* <Route path="producer-number" element={<ProducerSerialNumber />} /> */}
                </Route>
              ) : null
            }

            {/* Draft */}
            <Route path="draft" element={<Draft />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="create-invoice" element={<CreateInvoice />} />
              <Route path="create-delivery-note" element={<CreateDeliveryNote />} />
              <Route path="producer-receipts" element={<ProducerReceipt />} />
              <Route path="e-ledger" element={<CreateELedger />} />
            </Route>

            {/* Invoice Received */}
            {/* <Route path="invoice-received" element={<InvoiceReceived />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="received" element={<Received />} />
              <Route path="incoming-e" element={<IncomingE />} />
              <Route path="archived" element={<Archived />} />
              <Route path="cancelled" element={<Cancelled />} />
              <Route path="envelopes-archived" element={<EnvelopesArchived />} />
              <Route path="search" element={<Search />} />
            </Route> */}

            {/* Outgoing Invoice */}
            <Route path="outgoing-invoice" element={<OutgoingDeliveryNote />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="outgoing" element={<OutgoingInvoice />} />
              <Route path="archive" element={<OutgoingInvoiceArchive />} />
            </Route>

            {/* Outgoing Delivery Note */}
            <Route path="outgoing-delivery" element={<OutgoingDeliveryNote />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="outgoing" element={<Outgoing />} />
              <Route path="archive" element={<OutgoingDeliveryArchive />} />
              {/* <Route path="cancellation" element={<Cancellation />} />
              <Route path="call" element={<Call />} /> */}
            </Route>

            {/* Incoming Delivery Note */}
            {/* <Route path="incoming-delivery" element={<IncomingDeliveryNote />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="incoming" element={<Incoming />} />
              <Route path="archive" element={<IncomingDeliveryArchive />} />
              <Route path="call" element={<IncomingDeliveryCall />} />
            </Route> */}

            {/* Outgoing Producer Receipt */}
            <Route path="outgoing-producer-receipt" element={<OutgoingProducerReceipt />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="outgoing" element={<ProducerReceiptOutgoing />} />
              {/* <Route path="archive" element={<ProducerReceiptArchive />} /> */}
              {/* <Route path="cancellations" element={<ProducerReceiptCancellations />} />
              <Route path="call" element={<ProducerReceiptCall />} /> */}
            </Route>

            {/* E-Ledgers */}
            <Route path="e-ledgers" element={<ELedgers />} />

            {/* Credit */}
            <Route path="buy-credit" element={<BuyCredit />} />

            {/* Generate invoices */}
            {/* <Route path="invoices/e-invoice/:invoiceId" element={<GenerateInvoice /> } /> */}
            
          </Route>


          {/* Super Admin */}
          <Route path="/super-admin" element={<SuperAdmin />} >
            <Route index element={<SuperAdminMain />} />
            
          </Route>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
