/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import InvoiceInfo from "./features/InvoiceInfo"
import OrderInfo from "./features/OrderInfo";
import ReceiverInfo from "./features/RecieverInfo";
import PaymentInfo from "./features/PaymentInfo";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { Plus, Trash, WarningOctagon } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { v1 } from "uuid";
import { getUnits } from "../../../../store/features/Units";
import SelectOptions from "../../components/SelectOptions";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { useNavigate } from "react-router";
import { getOutgoingInvoices } from "../../../../store/features/OutgoingInvoice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useRoles from "../../../../authentication/useRoles";
import { getCompanies } from "../../../../store/features/Companies";
import { Link } from "react-router-dom";
import { getProductCategories } from "../../../../store/features/ProductCategory";


interface CreateInvoiceFormDataProps {
  // Required
  // ###########################
  invoice_uuid: string;
  send_type: number | string;
  invoice_date: string;
  invoice_time: string;
  charge_start_date: string;
  charge_start_time: string;
  charge_end_date: string;
  charge_end_time: string;
  esu_report_date: string;
  esu_report_time: string;
  invoice_id: string; // "TK"
  invoice_type: number | string;
  invoice_scenario: number | string;
  invoice_currency: number | string;
  receiver_name: string;
  tax_number: string;
  gib_post_box: string;
  country: string; // Nigeria
  city: string; // Jos North
  address: string;
  expenditure_tax_number: string;
  county: string;
  company_id: number | string;


  // Optional
  // ###########################
  exchange_rate: number;
  wildcard_1: string;
  your_tapdk_number: number;
  plate_number: number | string;
  vehicle_id: number | string;
  esu_report_id: number | string;
  order_number: string;
  order_date: string;
  dispatch_number: string;
  dispatch_date: string;
  dispatch_time: string;
  mode_code: string;
  tr_id_number: string;
  name_declarer: string;
  name: string;
  surname: string;
  nationality: string;
  passport_number: string;
  passport_date: string;
  receiver_tapdk_number: string;
  tax_office: string;
  receiver_email: string;
  receiver_web: string;
  receiver_phone: string;
  sms_notification_for_archive: boolean;
  outgoing_sms_notification_einvoice: boolean;
  add_address_book: boolean;
  delivery_address: boolean;
  payment_date: string;
  payment_means: string;
  payment_channel_code: string;
  payee_financial_account: string;
  total_products: number;
  total_discount: number;
  total_increase: number;
  zero_zero_one_five_vat: number;
  total_taxes: number;
  bottom_total_discount_rate: number;
  notes: string;
}

const CreateInvoice = () => {
  const {units, loading: unitLoader, message: unitMessage} = useAppSelector(state => state.units);
  const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);
  const { currencies } = useAppSelector(state => state.currencies);
  const { invoiceTypes } = useAppSelector(state => state.invoiceTypes);
  const { invoiceScenarios } = useAppSelector(state => state.invoiceScenarios);
  const {productCategories, loading: productCategoryLoader, message: productCategoryMessage} = useAppSelector(state => state.productCategories);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreateInvoiceFormDataProps>({defaultValues: {
    invoice_uuid: v1(),
    send_type: "e-invoice",
    invoice_id: "TK"
  }});

  const dispatch = useAppDispatch();
  // const [files, setFiles] = useState<File[]>([]);
  const [products, setProducts] = useState([
    {
      "id": v1(),
      "product_service": "",
      "product_category_id": "",
      "quantity": "",
      "unit_measurement": "",
      "price": "",
      "taxable_amount": "",
      "zero_zero_one_five_vat_rate": "",
      "zero_zero_one_five_vat_amount": "",
      "taxline_total": "",
      "payabl_line_total": "",
      "increase_decrease": [
        {
          "type": "",
          "rate": "",
          "amount": ""
        }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formValues = watch();
  const { t } = useTranslation();
  const roles = useRoles();


  // Calculations
  // #############################################################
  const calculatedProducts = useMemo(() => {
    return products.map(product => {

      const updatedProd = {...product}

      if(+updatedProd.price && +updatedProd.increase_decrease[0].rate){
        updatedProd.increase_decrease[0].amount = (+updatedProd.price * +updatedProd.increase_decrease[0].rate).toFixed(2);
      }
      if(!+updatedProd.price || !+updatedProd.increase_decrease[0].rate){
        updatedProd.increase_decrease[0].amount = (0).toFixed(2);
      }

      if(+updatedProd.price && +updatedProd.increase_decrease[0].amount){
        updatedProd.taxable_amount = (+updatedProd.price - +updatedProd.increase_decrease[0].amount).toFixed(2);
      }
      if(!+updatedProd.price || !+updatedProd.increase_decrease[0].amount){
        updatedProd.taxable_amount = (0).toFixed(2);
      }

      if(+updatedProd.taxable_amount && +updatedProd.zero_zero_one_five_vat_rate){
        updatedProd.zero_zero_one_five_vat_amount = (+updatedProd.taxable_amount * +updatedProd.zero_zero_one_five_vat_rate).toFixed(2);
      }
      if(!+updatedProd.taxable_amount || !+updatedProd.zero_zero_one_five_vat_rate){
        updatedProd.zero_zero_one_five_vat_amount = (0).toFixed(2);
      }

      if(+updatedProd.zero_zero_one_five_vat_amount && +updatedProd.quantity){
        updatedProd.taxline_total = (+updatedProd.zero_zero_one_five_vat_amount * +updatedProd.quantity).toFixed(2);
      }
      if(!+updatedProd.zero_zero_one_five_vat_amount || !+updatedProd.quantity){
        updatedProd.taxline_total = (0).toFixed(2);
      }

      if(+updatedProd.taxable_amount && +updatedProd.taxline_total){
        updatedProd.payabl_line_total = (+updatedProd.taxable_amount + +updatedProd.taxline_total).toFixed(2);
      }
      if(!+updatedProd.taxable_amount || !+updatedProd.taxline_total){
        updatedProd.payabl_line_total = (0).toFixed(2);
      }

      return {
        id: updatedProd.id,
        discountAmount: updatedProd.increase_decrease[0].amount,
        taxableAmount: updatedProd.taxable_amount,
        VATAmount: updatedProd.zero_zero_one_five_vat_amount,
        taxLineTotal: updatedProd.taxline_total,
        payableLineTotal: updatedProd.payabl_line_total,
        quantity: updatedProd.quantity
      }

    });
  }, [products]);


  const totalProducts = useMemo(() => {
    return {
      totalProductService: calculatedProducts.reduce((total, calculatedProduct) => total + +calculatedProduct.taxableAmount, 0),
      totalDiscount: calculatedProducts.reduce((total, calculatedProduct) => total + (+calculatedProduct.discountAmount * +calculatedProduct.quantity), 0),
      calculatedVAT: calculatedProducts.reduce((total, calculatedProduct) => total + +calculatedProduct.taxLineTotal, 0),
      totalAmountIncludingVAT: calculatedProducts.reduce((total, calculatedProduct) => total + +calculatedProduct.payableLineTotal, 0),
      amountToBePaid:  calculatedProducts.reduce((total, calculatedProduct) => total + +calculatedProduct.payableLineTotal, 0)
    }
  }, [products]);


  useEffect(() => {

    if(!units.length){ dispatch(getUnits()); }
    if(!productCategories.length){ dispatch(getProductCategories()); }
    if(roles && roles.includes("admin") && !companies.length){ dispatch(getCompanies()) }
    if(roles && roles.includes("admin") && !companyLoader && !companyMessage && !companies.length){
      toast.warning("A company is required to create an invoice, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }

  }, [dispatch, units.length, companies.length]);


  // const handleFileChange = (ev: any) => {
  //   // console.log(ev.target.files[0]);
  //   if(!ev.target.files.length){ return; }

  //   const file = ev.target.files[0];
  //   if(!file.type.startsWith("image/")){
  //     return toast.warning("You can only upload image file");
  //   }

  //   setFiles([file, ...files]);
  // }

  const handleChangeProductData = (ev: any, id: string) => {
    setProducts(products.map((product) => {
      if(product.id === id){

        const updatedProd = {
          ...product,
          [ev.target.name]: ev.target.value
        }

        return updatedProd;

      }

      return product;

    }));

  }

  const handleChangeDropdownProductData = (id: string, name: string, value: string) => {
    setProducts(products.map((product) => {
      if(product.id === id){
        return {
          ...product,
          [name]: value
        }
      }

      return product;
    }));

  }

  const getProductDropdownValue = (id: string, name: string) => {
    const product: any = products.find(p => p.id === id);
    return product ? product[name] : "";
  }

  const handleChangeProductDataIncreaseDecrease = (ev: any, id: string) => {
    setProducts(products.map((product) => {
      if(product.id === id){
        return {
          ...product,
          increase_decrease: [
            {
              ...product.increase_decrease[0],
              [ev.target.name]: ev.target.value
            }
          ]
        }
      }

      return product;
    }));

  }

  const handleChangeProductDropdownDataIncreaseDecrease = (id: string, name: string, value: string) => {
    setProducts(products.map((product) => {
      if(product.id === id){
        return {
          ...product,
          increase_decrease: [
            {
              ...product.increase_decrease[0],
              [name]: value
            }
          ]
        }
      }

      return product;
    }));

  }

  const getProductDropdownIncreaseDecreaseValue = (id: string, name: string) => {
    const product: any = products.find(p => p.id === id);
    return product ? product.increase_decrease[0][name] : "";
  }

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        "id": v1(),
        "product_service": "",
        "product_category_id": "",
        "quantity": "",
        "unit_measurement": "",
        "price": "",
        "taxable_amount": "",
        "zero_zero_one_five_vat_rate": "",
        "zero_zero_one_five_vat_amount": "",
        "taxline_total": "",
        "payabl_line_total": "",
        "increase_decrease": [
          {
            "type": "",
            "rate": "",
            "amount": ""
          }
        ]
      }
    ]);
  }

  const handleDeleteProduct = (id: string) => {
    if(products.length === 1){
      toast.info("You can't delete all the products; one should be left.");
      return;
    }

    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  }

  const handleFormSubmit: SubmitHandler<CreateInvoiceFormDataProps> = async () => {
    if(loading){ return; }

    // Check for a company
    if(roles && roles.includes("admin") && !companies.length){
      return toast.warning("A company is required to create an invoice, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }
   
    // Product validation
    // ###########################################
    let productIncDecValidation = false;
    const updatedProducts = products.map(product => {
      const pd = calculatedProducts.find(p => p.id === product.id);
      const productCat = productCategories.find(pc => pc.name === product.product_category_id);
      
      if(pd){
        return {
          ...product,
          product_category_id: (productCat?.id || product.product_category_id).toString(),
          taxable_amount: pd.taxableAmount,
          taxline_total: pd.taxLineTotal,
          payabl_line_total: pd.payableLineTotal,
          zero_zero_one_five_vat_amount: pd.VATAmount,
          increase_decrease: [{
            ...product.increase_decrease[0],
            amount: pd.discountAmount
          }]
        };

      }

      return product;
    });

    let productValidation = false;
    updatedProducts.forEach((product: any) => {
      const prodCond = Object.keys(product).filter(key => key !== "increase_decrease").every(key => (product[key]).length > 0);
      if(!prodCond){ return productValidation = false; }
      productValidation = true;
    });

    updatedProducts.forEach((product: any) => {
      const prodIncDecCond = Object.keys(product.increase_decrease[0]).every(key => (product.increase_decrease[0][key]).length > 0);
      if(!prodIncDecCond){ return productIncDecValidation = false; }
      productIncDecValidation = true;
    });

    if(!productValidation || !productIncDecValidation){ 
      return toast.error("All the product and service fields are required", {autoClose: 4000}); 
    }

    const formDataPayload = {
      ...formValues,
      products: updatedProducts
    }

    const currency = currencies.find(c => c.code == formValues.invoice_currency);
    formDataPayload.invoice_currency = currency?.id as number | string;
    const invoiceType = invoiceTypes.find(it => it.name == formValues.invoice_type);
    formDataPayload.invoice_type = invoiceType?.id as number | string;
    const invoiceScenario = invoiceScenarios.find(is => is.name == formValues.invoice_scenario);
    formDataPayload.invoice_scenario = invoiceScenario?.id as number | string;
    const company = companies.find(comp => comp.company_name === formValues.company_id);
    formDataPayload.company_id = company?.id as number | string;
    formDataPayload.send_type = formValues.send_type === "e-invoice" ? 1 : 2;


    const modifiedProducts = updatedProducts.map((product) => {
      const unit = units.find(unit => unit.name == product.unit_measurement);
      return {
        ...product,
        unit_measurement: unit?.id
      }
    });

    (formDataPayload.products as any) = modifiedProducts;

    formDataPayload.total_products = totalProducts.totalProductService;
    formDataPayload.total_discount = totalProducts.totalDiscount;
    formDataPayload.total_increase = totalProducts.totalAmountIncludingVAT;
    formDataPayload.total_taxes = totalProducts.calculatedVAT;
    formDataPayload.bottom_total_discount_rate = totalProducts.amountToBePaid;

    // console.log(formDataPayload);
    // return;

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post(`/user/invoice`, formDataPayload, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(getOutgoingInvoices());
        return setTimeout(() => {
          setLoading(false);
          return navigate(`/dashboard/outgoing-invoice/${formDataPayload.send_type === 1 ? "outgoing" : "archive"}`);
        }, 4000);
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }

  }

  return (
    <>
      <div className="w-full text-xs flex flex-wrap justify-start md:justify-end items-center gap-2 mb-2">
          <span className="font-bold">{t("description.dashboard.invoice_send_type")}*</span>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" id="e-invoice" value="e-invoice"
              className="w-[14px] h-[14px] accent-primary" 
              checked = {(formValues.send_type === "e-invoice")}
              {...register("send_type", {required: true})}
            />
            <label className="font-semibold" htmlFor="e-invoice">{t("description.dashboard.e_invoice")}</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" id="e-archive" value="e-archive"
                className="w-[14px] h-[14px] accent-primary"
                checked = {(formValues.send_type === "e-archive")}
                {...register("send_type", {required: true})}
            />
            <label className="font-semibold" htmlFor="e-archive">{t("description.dashboard.e_archive")}</label>
          </div>
      </div>

      <h2 className="text-xs font-bold mb-2">{t("description.dashboard.CREATE_INVOICE")}</h2>
      <p className="text-xs">{t("description.dashboard.draft")}</p>
      <div className="w-full flex justify-center border-b-2 border-primary text-tertiary text-xs pb-1 mb-4 font-bold uppercase">
        {formValues.send_type === "e-invoice" ? t("description.dashboard.e_invoice") : t("description.dashboard.e_archive")}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="false">
        
        {/* Invoice Info */}
        <div className="grid md:grid-cols-2 mb-4 gap-4">
          <div className="w-full text-xs p-4 mb-3 shadow-md">
            <div className="border-b-2 border-primary text-tertiary pb-1 mb-1 font-bold">{t("description.dashboard.INVOICE_INFORMATION")}</div>
            <InvoiceInfo
              register={register}
              errors={errors}
              formValues={formValues}
              setValue={setValue}
            />
          </div>

          {/* Order Info */}
          <OrderInfo
            register={register}
            formValues={formValues}
            setValue={setValue}
          />
        </div>

          {/*Display when exceptional invoice type options is selceted. */}
          {
            (formValues?.invoice_type as string)?.toUpperCase() === "EXCEPTION" ? (
              <>
                <div className="w-full md:w-1/2 p-4 bg-slate-100 shadow-lg text-xs">
                    <div className="flex flex-col justify-center w-1/2 mx-auto h-[400px]">
                      <div className="flex justify-center"><WarningOctagon size={24} /></div>
                      <p>{t("description.dashboard.in_the_special_invoice_scenario_the_recipant_is_always_")}</p>
                    </div>
                </div>
              </>
            ) : null
          }

        {/* Reciever Info */}
        <ReceiverInfo
          register={register}
          errors={errors}
          formValues={formValues}
          setValue={setValue}
        />


        {/* Payment info */}
        <PaymentInfo
            register={register}
            formValues={formValues}
            setValue={setValue}
        />  
        

        {/* PRODUCT AND SERVICES */}
        <div className="w-full p-4 mb-3 text-xs shadow-lg">
          <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.PRODUCT_AND_SERVICES")}</div>
          {/* <div className="flex justify-start items-center gap-4 flex-wrap mb-4">
            <button className="bg-primary text-white p-2 px-4 rounded-2xl">Operational settings</button>
            <button className="bg-primary text-white p-2 px-4 rounded-2xl">Add/Remove Column</button>
            <button className="bg-primary text-white p-2 px-4 rounded-2xl">Add/Remove Tax</button>
          </div> */}

          <div className="overflow-x-scroll pb-4">
          {/* <div className="flex justify-start items-start overflow-x-scroll gap-2 pb-4"> */}
            {/* <div className="flex justify-start items-center flex-col gap-2">
              <span className="border-2 rounded py-1 px-2">2</span>
              <span className="w-[30px] h-[30px] border rounded-full flex justify-center items-center"> 
                <Plus size={16} weight="regular" className="cursor-pointer" /> 
              </span>
            </div> */}

            <table className="border border-collapse border-l-0">
              <thead className="whitespace-nowrap bg-[#F3FAFF]">
                <tr>
                  <th className="border border-t-transparent border-l-transparent border-b-transparent bg-white px-4">
                    <span className="inline-block border rounded-md py-2 px-4 mb-2">{products.length}</span>
                  </th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.id")}</th>

                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.product_or_service")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.product_category")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.quantity")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.unit_of_measurement")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.price")}</th>
                  <th className="border py-2 px-4" colSpan={3}>
                    <div className="flex justify-center items-center gap-1">
                      <Plus size={16} weight="regular" className="text-primary cursor-pointer" />
                      <span>{t("description.dashboard.increase_discount")}</span>
                    </div>
                  </th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.taxable_amount")}</th>
                  <th colSpan={2} className="border py-2 px-4">{t("description.dashboard.0015VALUE_ADDED_TAX")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.tax_line_total")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.payable_line_total")}</th>
                </tr>

                <tr>
                  <th className="bg-white py-2 px-4 flex justify-center items-center">
                    <span onClick={handleAddProduct} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                      <Plus size={16} weight="regular" className="cursor-pointer" />
                    </span>
                  </th>
                  
                  <th className="border py-2 px-4">{t("description.dashboard.increase_discount")}</th>
                  <th className="border py-2 px-4">{t("description.dashboard.rate")}</th>
                  <th className="border py-2 px-4">{t("description.dashboard.amount")}</th>

                  <th className="border py-2 px-4">{t("description.dashboard.rate")}</th>
                  <th className="border py-2 px-4">{t("description.dashboard.amount")}</th>
                </tr>
              </thead>

              <tbody className="text-center">
                  {
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="border py-2 px-4 flex justify-center items-center">
                          <span onClick={() => handleDeleteProduct(product.id)} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                            <Trash size={16} weight="regular" className="text-secondary cursor-pointer" /> 
                          </span>
                        </td>

                        <td className="border py-2 px-4">{index + 1}</td>
                        
                        <td className="border py-2 px-4">
                          <input type="text" name="product_service"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter product service"
                            defaultValue={product.product_service ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            required
                          />
                        </td>

                        <td className="border py-2 px-4">
                          {productCategoryLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                          {!productCategoryLoader && productCategoryMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{productCategoryMessage}</p>) : null}
                          {!productCategoryLoader && !productCategoryMessage ? (
                              <SelectOptions
                                  title="Product category"
                                  selectedOption={getProductDropdownValue(product.id, "product_category_id") as any}
                                  setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "product_category_id", userSelection)}
                                  options={productCategories.map(pc => pc.name)}
                                  className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap text-left"
                                  top="-top-10"
                              />                              
                          ) : null}
                        </td>

                        <td className="border py-2 px-4">
                          <input type="number" name="quantity"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter quantity"
                            defaultValue={product.quantity ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            required
                          />
                        </td>

                        <td className="border py-2 px-4">
                          {unitLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                          {!unitLoader && unitMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{unitMessage}</p>) : null}
                          {!unitLoader && !unitMessage ? (
                              <SelectOptions
                                  title="Unit"
                                  selectedOption={getProductDropdownValue(product.id, "unit_measurement") as any}
                                  setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "unit_measurement", userSelection)}
                                  options={units.map(unit => unit.name)}
                                  className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                  top="-top-10"
                              />                              
                          ) : null}
                        </td>

                        <td className="border py-2 px-4">
                          <input type="number" name="price"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter price"
                            defaultValue={product.price ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            required
                          />
                        </td>
          
                        <td className="border py-2 px-4">
                          {/* <input type="number" name="type"
                            className="w-[80px] border-2 p-1 outline-none"
                            placeholder="00.0"
                            onChange={(ev) => handleChangeProductDataIncreaseDecrease(ev, product.id)}
                          /> */}
                          
                          <SelectOptions
                            title="type"
                            selectedOption={getProductDropdownIncreaseDecreaseValue(product.id, "type") as any}
                            setSelectedOption={(userSelection) => handleChangeProductDropdownDataIncreaseDecrease(product.id, "type", userSelection)}
                            options={["increase", "decrease"]}
                            className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                            top="-top-10"
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="rate"
                            className="w-[80px] border-2 p-1 outline-none"
                            placeholder="00.0"
                            onChange={(ev) => handleChangeProductDataIncreaseDecrease(ev, product.id)}
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="amount"
                            className="w-[80px] border-2 p-1 outline-none"
                            placeholder="00.0"
                            value={(calculatedProducts.find(pr => pr.id === product.id)?.discountAmount || 0)}
                            readOnly
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="taxable_amount"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter taxable amount"
                            // defaultValue={product.taxable_amount ?? ""}
                            // onChange={(ev) => handleChangeProductData(ev, product.id)}
                            value={(calculatedProducts.find(pr => pr.id === product.id)?.taxableAmount || 0)}
                            readOnly
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="zero_zero_one_five_vat_rate"
                            className="w-[80px] border-2 p-1 outline-none"
                            placeholder="00.0"
                            defaultValue={product.zero_zero_one_five_vat_rate ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="zero_zero_one_five_vat_amount"
                            className="w-[80px] border-2 p-1 outline-none"
                            placeholder="00.0"
                            // defaultValue={product.zero_zero_one_five_vat_amount ?? ""}
                            // onChange={(ev) => handleChangeProductData(ev, product.id)}
                            value={(calculatedProducts.find(pr => pr.id === product.id)?.VATAmount || 0)}
                            readOnly
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="taxline_total"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter tax line total"
                            // defaultValue={product.taxline_total ?? ""}
                            // onChange={(ev) => handleChangeProductData(ev, product.id)}
                            value={(calculatedProducts.find(pr => pr.id === product.id)?.taxLineTotal || 0)}
                            readOnly
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="payabl_line_total"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter payable line total"
                            // defaultValue={product.payabl_line_total ?? ""}
                            // onChange={(ev) => handleChangeProductData(ev, product.id)}
                            value={(calculatedProducts.find(pr => pr.id === product.id)?.payableLineTotal || 0)}
                            readOnly
                          />
                        </td>
                      </tr>
                    ))
                  }

              </tbody>
            </table> 
          </div>
        </div>


        {/* FILLING LINES FROM EXCEL */}
        {/* <div className="w-full p-4 mb-3 md:w-1/2 text-xs shadow-lg">
          <div className="border-b-2 border-primary text-tertiary pb-1 mb-4 font-bold">FILLING LINES FROM EXCEL</div>
          <div className="mb-4">
            <input type="file" name="" id="" />
          </div>

          <div>
            <a href="#" className="underline text-primary">
              Click to download the SAMPLE EXCEL FILE | Click to download draft page form lists
            </a>
          </div>
        </div> */}


        {/* TOTALS */}
        <div className="w-full p-4 mb-3 md:w-1/2 text-xs shadow-lg">
          <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.TOTALS")}</div>

          <div className="flex flex-wrap items-center mb-2 gap-1">
              <div className="w-1/3 font-bold">{t("description.dashboard.total_product_services")}</div>
              <div>
                <input type="number" id="total_products" placeholder="00.00" 
                  className="border-2 py-1 px-2 outline-none"
                  value={totalProducts.totalProductService}
                  readOnly
                />
              </div>
          </div>

          <div className="flex flex-wrap items-center mb-2 gap-1">
              <div className="w-1/3 font-bold">{t("description.dashboard.total_discount")}</div>
              <div>
                <input type="number" id="total_discount" placeholder="00.00" 
                  className="border-2 py-1 px-2 outline-none"
                  value={totalProducts.totalDiscount}
                  readOnly
                />
              </div>
          </div>

          <div className="flex flex-wrap items-center mb-2 gap-1">
              <div className="w-1/3 font-bold">{t("description.dashboard.calculated_vat")}</div>
              <div>
                <input type="number" id="zero_zero_one_five_vat" placeholder="00.00" 
                  className="border-2 py-1 px-2 outline-none"
                  value={totalProducts.calculatedVAT}
                  readOnly
                />
              </div>
          </div>

          <div className="flex flex-wrap items-center mb-2 gap-1">
              <div className="w-1/3 font-bold">{t("description.dashboard.total_amount_including_vat")}</div>
              <div>
                <input type="number" id="total_taxes" placeholder="00.00" 
                  className="border-2 py-1 px-2 outline-none"
                  value={totalProducts.totalAmountIncludingVAT}
                  readOnly
                />
              </div>
          </div>

          <div className="flex flex-wrap items-center mb-2 gap-1">
              <div className="w-1/3 font-bold">{t("description.dashboard.amount_to_be_paid")}</div>
              <div>
                <input type="number" id="bottom_total_discount_rate" placeholder="00.00" 
                  className="border-2 py-1 px-2 outline-none"
                  value={totalProducts.amountToBePaid}
                  readOnly
                />
              </div>
          </div>
        </div>


        {/* Notes */}
        <div className="w-full p-4 mb-8 md:w-1/2 text-xs shadow-lg">
          <div className="border-b-2 border-primary text-tertiary pb-1 mb-3 font-bold">{t("description.dashboard.NOTES")}</div>
          <div>
            <textarea className="w-full border-2 p-2 outline-none resize-none" 
              placeholder="Notes" id="notes" cols={37} rows={5}
              {...register("notes")}
            ></textarea>
          </div>
        </div>


        {/* Invoice Attachments */}
        {/* <div className="w-full p-4 mb-6 md:w-1/2 text-xs shadow-lg">
          <div className="border-b-2 border-primary text-tertiary pb-1 mb-4 font-bold">INVOICE ATTACHMENTS</div>
          <div className="mb-4">
            <input type="file" name="attachment"
              onChange={handleFileChange}
            />
          </div>
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-start items-center gap-2 flex-wrap">
          <button className="bg-primary text-white px-5 py-2 rounded-3xl flex justify-center items-center gap-1">
            {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
            <span>{t("description.dashboard.create")}</span>
          </button>
          
          <Link to="/dashboard" className="inline-block bg-secondary text-white px-5 py-2 rounded-3xl">
            <span>{t("description.dashboard.cancel")}</span>
          </Link>
        </div>
      </form>
    </>
  )
}

export default CreateInvoice;