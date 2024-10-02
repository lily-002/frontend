/* eslint-disable @typescript-eslint/no-explicit-any */

export const getTransactionTypeValue = (eLedgerTransactionTypes: any, id: number | string) => {
    const transactionType = eLedgerTransactionTypes.find((tt: { id: string | number; }) => tt.id == id);
    return transactionType ? transactionType.name : "";
}

export const getCurrencyUnitValue = (currencies: any, id: number | string) => {
    const currency = currencies.find((c: { id: string | number; }) => c.id == id);
    return currency ? currency.code : "";
}

export const getCategoryValue = (eLedgerCategories: any, id: number | string) => {
    const category = eLedgerCategories.find((ct: { id: string | number; }) => ct.id == id);
    return category ? category.name : "";
}

export const getTaxInfoValue = (eLedgerTaxInfos: any, id: number | string) => {
    const taxInfo = eLedgerTaxInfos.find((tf: { id: string | number; }) => tf.id == id);
    return taxInfo ? taxInfo.name : "";
}

export const getPaymentMethodValue = (paymentMethods: any, id: number | string) => {
    const paymentMethod = paymentMethods.find((pm: { id: string | number; }) => pm.id == id);
    return paymentMethod ? paymentMethod.name : "";
}

export const getStatusValue = (eLedgerStatuses: any, id: number | string) => {
    const statusInfo = eLedgerStatuses.find((st: { id: string | number; }) => st.id == id);
    return statusInfo ? statusInfo.name : "";
}

export const getCompanyValue = (companies: any, id: number | string) => {
    const company = companies.find((comp: { id: string | number; }) => comp.id == id);
    return company ? company.company_name : "";
}