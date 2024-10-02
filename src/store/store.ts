import { configureStore } from "@reduxjs/toolkit";
import proifileReducer from "./features/Profile";
import logoutReducer from "./features/Logout";
import companiesReducer from "./features/Companies";
import usersReducer from "./features/Users";
import outgoingInvoiceReducer from "./features/OutgoingInvoice";
import outgoingDeliveryReducer from "./features/OutgoingDelivery";
import outgoingProducerReducer from "./features/OutgoingProducer"
// Utils
import currencyReducer from "./features/Currencies";
import unitsReducer from "./features/Units";
import invoiceTypeReducer from "./features/InvoiceType";
import invoiceScenarioReducer from "./features/InvoiceScenarios";
import invoiceSendTypeReducer from "./features/InvoiceSendTypes";
import updateDeliveryNoteDespatchTypeReducer from "./features/DeliveryNoteDespatchTypes";
import updateDeliveryNoteInvoiceScenarioReducer from "./features/DeliveryNoteInvoiceScenarios";
import paymentMethodReducer from "./features/PaymentMethod";
import eLedgerCategoriesReducer from "./features/ELedgerCategories";
import eLedgerStatusReducer from "./features/ELedgerStatus";
import eLedgerTaxInfoReducer from "./features/ELedgerTaxInfo";
import eLedgerTransactionTypesReducer from "./features/ELedgerTransactionTypes";
import eLedgerReducer from "./features/ELedgers";
import userCompanyReducer from "./features/UserCompany";
import productCategoryReducer from "./features/ProductCategory";

const store = configureStore({
    reducer: {
        profile: proifileReducer,
        logout: logoutReducer,
        companies: companiesReducer,
        users: usersReducer,
        currencies: currencyReducer,
        units: unitsReducer,
        invoiceTypes: invoiceTypeReducer,
        invoiceScenarios: invoiceScenarioReducer,
        invoiceSendTypes: invoiceSendTypeReducer,
        outgoingInvoices: outgoingInvoiceReducer,
        outgoingDeliveries: outgoingDeliveryReducer,
        outgoingProducers: outgoingProducerReducer,
        deliveryNoteDespatchTypes: updateDeliveryNoteDespatchTypeReducer,
        deliveryNoteInvoiceScenarios: updateDeliveryNoteInvoiceScenarioReducer,
        paymentMethods: paymentMethodReducer,
        eLedgerCategories: eLedgerCategoriesReducer,
        eLedgerStatuses: eLedgerStatusReducer,
        eLedgerTaxInfos: eLedgerTaxInfoReducer,
        eLedgerTransactionTypes: eLedgerTransactionTypesReducer,
        eLedgers: eLedgerReducer,
        userCompany: userCompanyReducer,
        productCategories: productCategoryReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
