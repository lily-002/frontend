/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import SelectOptions from "../../components/SelectOptions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { v4 } from "uuid";
import { getDeliveryNoteDespatchTypes } from "../../../../store/features/DeliveryNoteDespatchTypes";
import { getDeliveryNoteInvoiceScenarios } from "../../../../store/features/DeliveryNoteInvoiceScenarios";
import { getCurrencies } from "../../../../store/features/Currencies";
import { getUnits } from "../../../../store/features/Units";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
// import Pagination from "../../components/Pagination";
import countries from "../../../../data/countries.json";
import { useTranslation } from "react-i18next";
import useRoles from "../../../../authentication/useRoles";
import { getCompanies } from "../../../../store/features/Companies";
import { Link } from "react-router-dom";
import { getProductCategories } from "../../../../store/features/ProductCategory";
import { getOutgoingDeliveries } from "../../../../store/features/OutgoingDelivery";


interface DeliveryNoteFormDataProps {
  // Required
  // ########################
  invoice_uuid: string;
  submission_type_id: number | string;
  despatch_date: string;
  despatch_id: "TK",
  despatch_type_id: number | string;
  invoice_scenario_id: number | string;
  currency_unit_id: number | string;
  shipment_time: string;
  receiver_name: string;
  receiver_tax_number: string;
  receiver_gib_postacute: string;
  receiver_country: string;
  receiver_city: string;
  receiver_address: string;
  real_buyer: string;
  buyer_tax_number: string;
  buyer_tax_admin: string;
  buyer_tax_office: string;
  buyer_country: string;
  buyer_city: string;
  buyer_destrict: string;
  buyer_address: string;
  real_seller: string;
  seller_tax_number: string;
  seller_tax_admin: string;
  seller_tax_office: string;
  seller_country: string;
  seller_city: string;
  seller_destrict: string;
  seller_address: string;
  second_receiver_country: string;
  second_receiver_ill: string;
  second_receiver_postal_code: string;
  second_receiver_district: string;
  second_receiver_address: string;
  company_id: number | string;

  // Optional
  // #############################
  carrier_title: string;
  carrier_tin: string;
  vehicle_plate_number: string;
  total_amount: number | string;
  wild_card1: number | string;
  order_number: number | string;
  order_date: string;
  additional_document_id: number | string;
  receiver_tax_office: string;
  receiver_destrict: string;
  receiver_mobile_number: string;
  notes: string;

}

const CreateDeliveryNote = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DeliveryNoteFormDataProps>({defaultValues: {
    invoice_uuid: v4(),
    despatch_id: "TK",
    submission_type_id: 1,
  }});
  const { deliveryNoteDespatchTypes, loading: despatchTypesLoader, message: despatchTypesMessage } = useAppSelector(state => state.deliveryNoteDespatchTypes);
  const { deliveryNoteInvoiceScenarios, loading: invoiceScenariosLoader, message: invoiceScenariosMessage } = useAppSelector(state => state.deliveryNoteInvoiceScenarios);
  const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
  const {units, loading: unitLoader, message: unitMessage} = useAppSelector(state => state.units);
  const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);
  const {productCategories, loading: productCategoryLoader, message: productCategoryMessage} = useAppSelector(state => state.productCategories);

  const [products, setProducts] = useState([
    {
      "id": v4(),
      "product_service": "",
      "product_category_id": "",
      "quantity_one": "",
      "unit_id_one": "",
      "quantity_two": "",
      "unit_id_two": "",
      "price": "",
      "product_amount": ""
    }
  ]);
  const [drivers, setDrivers] = useState([
    {
      "id": v4(),
      "name": "",
      "surname": "",
      "tckn": "",
    }
  ]);
  const [trailers, setTrailers] = useState([
    {
      "id": v4(),
      "plate_number": ""
    }
  ])

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formValues = watch();
  const { t } = useTranslation();
  const roles = useRoles();


  useEffect(() => {

    if(!deliveryNoteDespatchTypes.length){ dispatch(getDeliveryNoteDespatchTypes()) }
    if(!deliveryNoteInvoiceScenarios.length){ dispatch(getDeliveryNoteInvoiceScenarios()) }
    if(!currencies.length){ dispatch(getCurrencies()) }
    if(!units.length){ dispatch(getUnits()) }
    if(!productCategories.length){ dispatch(getProductCategories()); }
    if(roles && roles.includes("admin") && !companies.length){ dispatch(getCompanies()) }
    if(roles && roles.includes("admin") && !companyLoader && !companyMessage && !companies.length){
      toast.warning("A company is required to create an invoice, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }

  }, [dispatch, deliveryNoteDespatchTypes.length, deliveryNoteInvoiceScenarios.length, currencies.length, units.length, companies.length]);


  const handleChangeProductData = (ev: any, id: string) => {
    setProducts(products.map((product) => {
      if(product.id === id){
        return {
          ...product,
          [ev.target.name]: ev.target.value
        }
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

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        "id": v4(),
        "product_service": "",
        "product_category_id": "",
        "quantity_one": "",
        "unit_id_one": "",
        "quantity_two": "",
        "unit_id_two": "",
        "price": "",
        "product_amount": ""
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

  // Drivers
  const handleChangeDriverData = (ev: any, id: string) => {
    setDrivers(drivers.map((driver) => {
      if(driver.id === id){
        return {
          ...driver,
          [ev.target.name]: ev.target.value
        }
      }

      return driver;
    }));
  }

  const handleAddDriver = () => {
    setDrivers([
      ...drivers,
      {
        "id": v4(),
        "name": "",
        "surname": "",
        "tckn": ""
      }
    ]);
  }

  const handleDeleteDriver = (id: string) => {
    if(drivers.length === 1){
      toast.info("You can't delete all the drivers; one should be left.");
      return;
    }

    const updatedDrivers = drivers.filter(driver => driver.id !== id);
    setDrivers(updatedDrivers);
  }


  // Trailers
  const handleChangeTrailerNumber = (ev: any, id: string) => {
    setTrailers(trailers.map((trailer) => {
      if(trailer.id === id){
        return {
          ...trailer,
          [ev.target.name]: ev.target.value
        }
      }

      return trailer;
    }));
  }

  const handleAddTrailerNumber = () => {
    setTrailers([
      ...trailers,
      {
        "id": v4(),
        "plate_number": ""
      }
    ]);
  }

  const handleDeleteTrailerNumber = (id: string) => {
    if(trailers.length === 1){
      toast.info("You can't delete all the trailers; one should be left.");
      return;
    }

    const updatedTrailers = trailers.filter(trailer => trailer.id !== id);
    setTrailers(updatedTrailers);
  }

  const getStateCountryState = (country: string) => {

    if(country){
        const filteredCountry = countries.find(cnt => cnt.name === country);
        return filteredCountry ? filteredCountry.states.map(state => state.name) : []
    }

    return [];
}


  const handleFormSubmit: SubmitHandler<DeliveryNoteFormDataProps> = async () => {
    if(loading){ return; }

    // Check for a company
    if(roles && roles.includes("admin") && !companies.length){
      return toast.warning("A company is required to create an invoice, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }
    
    // Product validation
    let productValidation = false;
    products.forEach((product: any) => {
      const prodCond = Object.keys(product).every(key => (product[key]).length > 0);
      if(!prodCond){ return productValidation = false; }
      productValidation = true;
    });

    if(!productValidation){ 
      return toast.error("All the product and service fields are required", {autoClose: 4000}); 
    }

    let driverValidation = false;
    drivers.forEach((driver: any) => {
      const driverCond = Object.keys(driver).every(key => (driver[key]).length > 0);
      if(!driverCond){ return driverValidation = false; }
      driverValidation = true;
    });

    if(!driverValidation){ 
      return toast.error("All the driver info fields are required", {autoClose: 4000}); 
    }

    let trailerPlateNumberValidation = false;
    trailers.forEach((trailer: any) => {
      const trailerCond = Object.keys(trailer).every(key => (trailer[key]).length > 0);
      if(!trailerCond){ return trailerPlateNumberValidation = false; }
      trailerPlateNumberValidation = true;
    });

    if(!trailerPlateNumberValidation){ 
      return toast.error("Trailer plate number field is required", {autoClose: 4000}); 
    }


    const formDataPayload = {
      ...formValues,
      products,
      drivers,
      trailers
    }


    const currency = currencies.find(c => c.code == formValues.currency_unit_id);
    formDataPayload.currency_unit_id = currency?.id as number | string;
    const despatchType = deliveryNoteDespatchTypes.find(dep => dep.name == formValues.despatch_type_id);
    formDataPayload.despatch_type_id = despatchType?.id as number | string;
    const invoiceScenario = deliveryNoteInvoiceScenarios.find(invSc => invSc.name == formValues.invoice_scenario_id);
    formDataPayload.invoice_scenario_id = invoiceScenario?.id as number | string;
    const company = companies.find(comp => comp.company_name === formValues.company_id);
    formDataPayload.company_id = company?.id as number | string;

    const updatedProducts = products.map((product) => {
      const unit1 = units.find(unit => unit.name == product.unit_id_one);
      const unit2 = units.find(unit => unit.name == product.unit_id_two);
      const productCat = productCategories.find(pc => pc.name === product.product_category_id);
      
      return {
        ...product,
        unit_id_one: unit1?.id,
        unit_id_two: unit2?.id,
        product_category_id: (productCat?.id || product.product_category_id).toString(),
      }
    });

    (formDataPayload.products as any) = updatedProducts;

    // console.log("Form Data: ", formDataPayload);
    // return

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post(`/user/delivery-note`, formDataPayload, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(getOutgoingDeliveries());
        return setTimeout(() => {
          setLoading(false);
          return navigate(`/dashboard/outgoing-delivery/${formDataPayload.submission_type_id === 1 ? "outgoing" : "archive"}`);
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
      {/* Main Body */}

        <h2 className="font-bold text-sm mb-2">{t("description.dashboard.CREATE_DELIVERY_NOTE")}</h2>
        <p className="text-xs mb-4">{t("description.dashboard.draft")}</p>

        <div className="w-full text-center border-b-2 border-primary text-tertiary text-xs pb-1 mb-4 font-bold">{t("description.dashboard.E_DESPATCH")}</div>


      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">

        {/* DISPATCH/ORDER INFORMATIOM */}
        <div className="w-full lg:flex mx-auto lg:py-2 lg:my-10 text-xs">
          {/* Card 1 */}
          <div className="p-4 lg:w-[48%] w-full bg-white border shadow-lg">
            <h2 className="font-bold mb-4 text-left text-tertiary border-b-2 border-primary pb-1">{t("description.dashboard.DESPATCH_INFORMATION")}</h2>

            <div className="">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="lg:w-36 text-left pr-4 text-black" htmlFor="receiver">{t("description.dashboard.invoice_UUID")}:</label>
                  <div className="relative flex-1">
                    <label className="w-28 text-left pr-4 text-gray-600" htmlFor="receiver">{formValues.invoice_uuid}</label>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="taxNumber">{t("description.dashboard.submission_tpe")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                    <div className="flex items-center me-4">
                      <input type="radio" value={1} id="e-Dispatch"
                        className="w-4 h-4 text-black bg-gray-100 border-gray-3300 accent-primary"
                        checked = {(formValues.submission_type_id == 1)}
                        {...register("submission_type_id", {required: true})}
                        required
                      />
                      <label htmlFor="e-Dispatch" className="ms-2 font-medium text-blac">{t("description.dashboard.e_dispatch")}</label>
                      <input type="radio" value={2} id="e-Archive"
                        className="w-4 h-4 ml-4 text-black bg-gray-100 border-gray-300 accent-primary"
                        checked = {(formValues.submission_type_id == 2)}
                        {...register("submission_type_id", {required: true})}
                        required
                      />
                      <label htmlFor="e-Archive" className="ms-2 font-medium">{t("description.dashboard.e_archive")}</label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left lg:pr-4 text-black" htmlFor="despatch_date">{t("description.dashboard.dispatch_date")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <input type="date" id="despatch_date"
                      className="border-2 p-2 outline-none rounded transition-all py-1 w-20 lg:w-auto"
                      {...register("despatch_date", {required: true})}
                      required
                    />
                    {errors.despatch_date ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="dispatch_ID">{t("description.dashboard.dispatch_ID")}:</label>
                  <div className="relative flex-1">
                    <input type="text" name="despatch_date" value={formValues.despatch_id}  readOnly
                      className="border-2 p-2 outline-none rounded transition-all py-1 w-20 lg:w-auto"
                    />
                  </div>
                </div>

                {
                  roles && roles.includes("admin") ? (
                    <div className="flex items-center">
                      <label className="w-36 text-left pr-4 text-black" htmlFor="despatch_type_id">{t("description.dashboard.company_name")}<span className="text-tertiary pb-3">*</span></label>
                      <div className="relative flex-1">
                          {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                          {!companyLoader && companyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{companyMessage}</p>) : null}
                          {!companyLoader && !companyMessage ? (
                          <div>
                              
                              <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("company_id", {required: true})} />
                              <SelectOptions
                                  title="Company"
                                  selectedOption={formValues.company_id as string}
                                  setSelectedOption={(userSelection) => setValue("company_id", userSelection)}
                                  options={companies.map(company => company.company_name)}
                                  className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                                  top="top-8"
                              />
                              {!formValues.company_id && errors.company_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                          </div>

                          ) : null}
                      </div>
                    </div>
                  ) : null
                }

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="despatch_type_id">{t("description.dashboard.dispatch_type")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                    {despatchTypesLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!despatchTypesLoader && despatchTypesMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{despatchTypesMessage}</p>) : null}
                    {!despatchTypesLoader && !despatchTypesMessage ? (
                        <div>
                          <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("despatch_type_id", {required: true})} />
                          <SelectOptions
                              title="Select despatch type"
                              selectedOption={formValues.despatch_type_id as string}
                              setSelectedOption={(userSelection) => setValue("despatch_type_id", userSelection)}
                              options={deliveryNoteDespatchTypes.map(despatchType => despatchType.name)}
                              className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                              top="top-6"
                          />
                          {!formValues.despatch_type_id && errors.despatch_type_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                      ) : null
                    }
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="country">{t("description.dashboard.invoice_scenario")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                    {invoiceScenariosLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!invoiceScenariosLoader && invoiceScenariosMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{invoiceScenariosMessage}</p>) : null}
                    {!invoiceScenariosLoader && !invoiceScenariosMessage ? (
                        <div>
                          <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("invoice_scenario_id", {required: true})} />
                          <SelectOptions
                              title="Select invoice type"
                              selectedOption={formValues.invoice_scenario_id as string}
                              setSelectedOption={(userSelection) => setValue("invoice_scenario_id", userSelection)}
                              options={deliveryNoteInvoiceScenarios.map(despatchType => despatchType.name)}
                              className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                              top="top-6"
                          />
                          {!formValues.invoice_scenario_id && errors.invoice_scenario_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                      ) : null
                    }
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="country">{t("description.dashboard.currency_unit")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                    {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                    {!currencyLoader && currencyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                    {!currencyLoader && !currencyMessage ? (
                        <div>
                          <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("currency_unit_id", {required: true})} />
                          <SelectOptions
                              title="Currency type"
                              selectedOption={formValues.currency_unit_id as string}
                              setSelectedOption={(userSelection) => setValue("currency_unit_id", userSelection)}
                              options={currencies.map(c => c.code)}
                              className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                              top="top-6"
                          />
                          {!formValues.currency_unit_id && errors.currency_unit_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                      ) : null
                    }
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="carrier_title">{t("description.dashboard.career_title")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="carrier_title"
                    placeholder="Enter career title"
                    {...register("carrier_title")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="carrier_tin">{t("description.dashboard.career_TIN_TC_ID")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="carrier_tin"
                    placeholder="Enter IN TC ID"
                    {...register("carrier_tin")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="vehicle_plate_number">{t("description.dashboard.vehicle_plate_no")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="vehicle_plate_number"
                    placeholder="Enter vehicle plate number"
                    {...register("vehicle_plate_number")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="total_amount">{t("description.dashboard.total_amount")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="number"
                    id="total_amount"
                    placeholder="Enter total amount"
                    {...register("total_amount")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="wild_card1">{t("description.dashboard.remarks")}</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="wild_card1"
                    placeholder="Enter remarks"
                    {...register("wild_card1")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:p-4 p-2 lg:ml-4 lg:w-[49%] w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg text-xs">
            <h2 className="font-bold mb-4 text-left text-tertiary border-b-2 border-primary pb-1">{t("description.dashboard.ORDER_INFORMATION")}</h2>
            
            <div className="max-w-md">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-36 text-left pr-4 text-black" htmlFor="order_number">{t("description.dashboard.order_number")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="order_number"
                    placeholder="Enter order number"
                    {...register("order_number")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-36 text-left pr-1 text-black" htmlFor="order_date">{t("description.dashboard.order_date")}</label>
                  <div className="flex items-center me-4">
                    <input type="date" 
                      id="order_date"
                      className="border-2 p-2 outline-none transition-all py-1"
                      {...register("order_date")}
                    />
                  </div>
                </div>


                <div className="flex items-center">
                  <label className="w-36 text-left pr-1 text-black" htmlFor="shipment_time">{t("description.dashboard.shipment_time")}</label>
                  <div className="flex items-center me-4">
                    <input type="time"
                      id="shipment_time"
                      className="border-2 p-2 outline-none rounded transition-all py-1 w-24 lg:w-auto"
                      {...register("shipment_time")}
                    />
                    {/* <input type="date" 
                      name="invoiceEndDate"
                      id=""
                      className="border-2 p-2 outline-none rounded transition-all py-1 w-24 lg:w-auto"
                    /> */}
                  </div>
                </div>

                <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary">{t("description.dashboard.BILLING_INFORMATION")}</h2>

                <div className="flex items-center">
                  <label className="w-auto text-left pr-4 text-black" htmlFor="additional_document_id">{t("description.dashboard.additional_document_ID")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="additional_document_id"
                    placeholder="Document Reference Number"
                    {...register("additional_document_id")}
                  />
                </div>

                <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary">{t("description.dashboard.DRIVER_INFORMATION")}</h2>

                <div className="overflow-x-scroll pb-4">
                  <table className="border border-collapse border-l-0">
                    <thead className="whitespace-nowrap bg-[#F3FAFF]">
                      <tr>
                        <th className="bg-white py-2 px-4 flex justify-center items-center">
                          <span onClick={handleAddDriver} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                            <Plus size={16} weight="regular" className="cursor-pointer" />
                          </span>
                        </th>

                        <th className="border py-2 px-4">{t("description.dashboard.id")}</th>
                        <th className="border py-2 px-4">{t("description.dashboard.name")}</th>
                        <th className="border py-2 px-4">{t("description.dashboard.surname")}</th>
                        <th className="border py-2 px-4">{t("description.dashboard.TCKN")}</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                          drivers.map((driver, index) => (
                            <tr key={driver.id}>
                              <td className="border py-2 px-4 flex justify-center items-center">
                                <span onClick={() => handleDeleteDriver(driver.id)} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                                  <Trash size={16} weight="regular" className="text-secondary cursor-pointer" /> 
                                </span>
                              </td>

                              <td className="border py-2 px-4">{index + 1}</td>
                              
                              <td className="border py-2 px-4">
                                <input type="text" name="name"
                                  className="border-2 p-1 outline-none"
                                  placeholder="Enter driver name"
                                  defaultValue={driver.name as string}
                                  onChange={(ev) => handleChangeDriverData(ev, driver.id)}
                                  required
                                />
                              </td>

                              <td className="border py-2 px-4">
                                <input type="text" name="surname"
                                  className="border-2 p-1 outline-none"
                                  placeholder="Enter driver surname"
                                  defaultValue={driver.surname ?? ""}
                                  onChange={(ev) => handleChangeDriverData(ev, driver.id)}
                                  required
                                />
                              </td>

                              <td className="border py-2 px-4">
                                <input type="text" name="tckn"
                                  className="border-2 p-1 outline-none"
                                  placeholder="Enter driver tckn"
                                  defaultValue={driver.tckn ?? ""}
                                  onChange={(ev) => handleChangeDriverData(ev, driver.id)}
                                  required
                                />
                              </td>
                            </tr>
                          ))
                        }

                    </tbody>
                  </table> 
                </div>

                <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary">{t("description.dashboard.TRAILER_INFORMATION")}</h2>

                <div className="overflow-x-scroll pb-4">
                  <table className="w-full border border-collapse border-l-0">
                    <thead className="whitespace-nowrap bg-[#F3FAFF]">
                      <tr>
                        <th className="bg-white py-2 px-4 flex justify-center items-center">
                          <span onClick={handleAddTrailerNumber} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                            <Plus size={16} weight="regular" className="cursor-pointer" />
                          </span>
                        </th>

                        <th className="border py-2 px-4">{t("description.dashboard.id")}</th>
                        <th className="border py-2 px-4">{t("description.dashboard.plate_number")}</th>
                      </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                          trailers.map((trailer, index) => (
                            <tr key={trailer.id}>
                              <td className="border py-2 px-4 flex justify-center items-center">
                                <span onClick={() => handleDeleteTrailerNumber(trailer.id)} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                                  <Trash size={16} weight="regular" className="text-secondary cursor-pointer" /> 
                                </span>
                              </td>

                              <td className="border py-2 px-4">{index + 1}</td>
                              
                              <td className="border py-2 px-4">
                                <input type="text" name="plate_number"
                                  className="border-2 p-1 outline-none"
                                  placeholder="Enter plate number"
                                  defaultValue={trailer.plate_number ?? ""}
                                  onChange={(ev) => handleChangeTrailerNumber(ev, trailer.id)}
                                  required
                                />
                              </td>
                            </tr>
                          ))
                        }

                    </tbody>
                  </table> 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECIEVER INFORMATION*/}
        <div className="w-full h-auto flex flex-wrap lg:py-2 mx-auto my-10 text-xs">
          {/* Card 1 */}
          <div className="p-4 lg:w-[48%] w-full border mt-5 lg:mt-0 bg-white shadow-lg">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.RECIEVER_INFORMATION")}</h2>

            <div className="">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_name">{t("description.dashboard.receiver")}:</label>
                  <div className="relative flex-1">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="receiver_name"
                      placeholder="Enter receiver name"
                      {...register("receiver_name", {required: true})}
                      required
                    />
                    {errors.receiver_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_tax_number">{t("description.dashboard.tax_number")}:</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="receiver_tax_number"
                      placeholder="Enter tax number"
                      {...register("receiver_tax_number", {required: true})}
                      required
                    />
                    {errors.receiver_tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-1 text-black" htmlFor="receiver_gib_postacute">{t("description.dashboard.GIB_postacute")}:</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="receiver_gib_postacute"
                      placeholder="Enter GIB postacute"
                      {...register("receiver_gib_postacute", {required: true})}
                      required
                    />
                    {errors.receiver_gib_postacute ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_tax_office">{t("description.dashboard.tax_office")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="receiver_tax_office"
                    placeholder="Enter tax office"
                    {...register("receiver_tax_office")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="country">{t("description.dashboard.country")}:</label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("receiver_country", {required: true})} />
                      <SelectOptions
                          title="Select country"
                          selectedOption={formValues.receiver_country ?? ""}
                          setSelectedOption={(userSelection) => setValue("receiver_country", userSelection)}
                          options={countries.map(country => country.name)}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.receiver_country && errors.receiver_country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="country">{t("description.dashboard.state")}:</label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("receiver_city", {required: true})} />
                      <SelectOptions
                          title={!formValues.receiver_country ? "Select country first" : "Select city"}
                          selectedOption={formValues.receiver_city ?? ""}
                          setSelectedOption={(userSelection) => setValue("receiver_city", userSelection)}
                          options={getStateCountryState(formValues.receiver_country || "")}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.receiver_city && errors.receiver_city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_destrict">{t("description.dashboard.district")}:</label>
                  <div className="relative flex-1">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="receiver_destrict"
                      placeholder="Enter district"
                      {...register("receiver_destrict")}
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_address">{t("description.dashboard.address")}:</label>
                  <div>
                    <textarea
                      className="min-w-44 border-2 p-2 outline-none resize-none"
                      id="receiver_address"
                      placeholder="Enter address"
                      rows={4}
                      {...register("receiver_address", {required: true})}
                      required
                    ></textarea>
                    {errors.receiver_address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_mobile_number">{t("description.dashboard.mobile_number")}:</label>
                  <input
                    className="border-2 p-2 outline-none w-40 lg:w-auto"
                    type="text"
                    id="receiver_mobile_number"
                    placeholder="Enter tax number"
                    {...register("receiver_mobile_number")}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="taxNumber"></label>
                  <div className="flex justify-start items-center gap-2">
                      <input type="checkbox" className="form-check-input" name="" id="add_to_autobook" value="checkedValue" />
                      <label className="" htmlFor="add_to_autobook">{t("description.dashboard.add_to_autobook")}</label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:p-4 p-2 lg:ml-4 lg:w-[48%] h-1/2 w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg ">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.RECEIVER_INFORMATION")}</h2>

            <div className="">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex justify-start items-center gap-2">
                      <input type="checkbox" className="form-check-input" name="" id="same_ad_reciepient_address" value="checkedValue" />
                      <label htmlFor="same_ad_reciepient_address">{t("description.dashboard.same_as_reciepient_address")}</label>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver">{t("description.dashboard.country")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1 w-28">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("second_receiver_country", {required: true})} />
                      <SelectOptions
                        title={!formValues.second_receiver_country ? "Select country first" : "Select city"}
                        selectedOption={formValues.second_receiver_country ?? ""}
                        setSelectedOption={(userSelection) => setValue("second_receiver_country", userSelection)}
                        options={countries.map(country => country.name)}
                        className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                        top="-top-10"
                      />
                      {!formValues.second_receiver_country && errors.second_receiver_country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="receiver">{t("description.dashboard.II")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1 w-28">
                    <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("second_receiver_ill", {required: true})} />
                    <SelectOptions
                      title="Select iII"
                      selectedOption={formValues.second_receiver_ill ?? ""}
                      setSelectedOption={(userSelection) => setValue("second_receiver_ill", userSelection)}
                      options={countries.map(country => country.name)}
                      className="border-2 p-2 outline-none rounded transition-all w-1/4"
                      top="-top-10"
                    />
                    {!formValues.second_receiver_ill && errors.second_receiver_ill ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>


                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="second_receiver_postal_code">{t("description.dashboard.postal_address")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="second_receiver_postal_code"
                      placeholder="Enter tax number"
                      {...register("second_receiver_postal_code", {required: true})}
                      required
                    />
                    {errors.second_receiver_postal_code ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="second_receiver_district">{t("description.dashboard.district")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1 w-28">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="second_receiver_district"
                      placeholder="Enter district"
                      {...register("second_receiver_district", {required: true})}
                      required
                    />
                    {errors.second_receiver_district ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>


                <div className="flex items-start">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="second_receiver_address">{t("description.dashboard.address")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <textarea
                      className="min-w-44 border-2 p-2 outline-none resize-none"
                      id="second_receiver_address"
                      placeholder="Enter address"
                      rows={4}
                      {...register("second_receiver_address", {required: true})}
                      required
                    ></textarea>
                    {errors.second_receiver_address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Real Buyer/Seller Information */}
        <div className=" w-full h-auto flex lg:py-2 flex-wrap mx-auto my-10 text-xs">
          {/* Card 1 */}
          <div className="lg:p-4 p-2 lg:w-[48%] w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.REAL_BUYER_INFORMATION")}</h2>
            
            <div className="">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="real_buyer">{t("description.dashboard.real_buyer")}:</label>
                  <div className="relative flex-1">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="real_buyer"
                      placeholder="Enter order number"
                      {...register("real_buyer", {required: true})}
                      required
                    />
                    {errors.real_buyer ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_tax_number">{t("description.dashboard.tax_number")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="number"
                      id="buyer_tax_number"
                      placeholder="Enter buyer tax number"
                      {...register("buyer_tax_number", {required: true})}
                      required
                    />
                    {errors.buyer_tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-1 text-black" htmlFor="buyer_tax_admin">{t("description.dashboard.tax_administration")}</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="buyer_tax_admin"
                      placeholder="Enter tax administration"
                      {...register("buyer_tax_admin", {required: true})}
                      required
                    />
                    {errors.buyer_tax_admin ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_tax_office">{t("description.dashboard.tax_office")}:</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="buyer_tax_office"
                      placeholder="Enter tax office"
                      {...register("buyer_tax_office", {required: true})}
                      required
                    />
                    {errors.buyer_tax_office ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="country">{t("description.dashboard.country")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("buyer_country", {required: true})} />
                      <SelectOptions
                          title="Select country"
                          selectedOption={formValues.buyer_country ?? ""}
                          setSelectedOption={(userSelection) => setValue("buyer_country", userSelection)}
                          options={countries.map(country => country.name)}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.buyer_country && errors.buyer_country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_city">{t("description.dashboard.state")}:</label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("buyer_city", {required: true})} />
                      <SelectOptions
                          title={!formValues.buyer_country ? "Select country first" : "Select city"}
                          selectedOption={formValues.buyer_city ?? ""}
                          setSelectedOption={(userSelection) => setValue("buyer_city", userSelection)}
                          options={getStateCountryState(formValues.buyer_country || "")}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.buyer_city && errors.buyer_city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_destrict">{t("description.dashboard.district")}:</label>
                  <div className="relative flex-1">
                    {/* <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("buyer_destrict", {required: true})} /> */}
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="buyer_destrict"
                      placeholder="Enter district"
                      {...register("buyer_destrict", {required: true})}
                      required
                    />
                    {errors.buyer_destrict ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-start">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_address">{t("description.dashboard.address")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <textarea
                      className="min-w-44 border-2 p-2 outline-none resize-none"
                      id="buyer_address"
                      placeholder="Enter address"
                      rows={4}
                      {...register("buyer_address", {required: true})}
                      required
                    ></textarea>
                    {errors.buyer_address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="taxNumber"></label>
                  <div className="flex justify-start items-center gap-2">
                      <input type="checkbox" className="form-check-input" name="" id="" value="checkedValue" />
                      <span className="">{t("description.dashboard.add_to_autobook")}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:p-4 p-2 lg:ml-4 lg:w-[49%] w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.REAL_SELLER_INFORMATION")}</h2>
            
            <div className="">
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="real_seller">{t("description.dashboard.real_seller")}:</label>
                  <div className="relative flex-1">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="real_seller"
                      placeholder="Enter real seller"
                      {...register("real_seller", {required: true})}
                      required
                    />
                    {errors.real_seller ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_tax_number">{t("description.dashboard.tax_number")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="seller_tax_number"
                      placeholder="Enter tax number"
                      {...register("seller_tax_number", {required: true})}
                      required
                    />
                    {errors.seller_tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-1 text-black" htmlFor="seller_tax_admin">{t("description.dashboard.tax_administration")}</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="seller_tax_admin"
                      placeholder="Enter tax admin"
                      {...register("seller_tax_admin", {required: true})}
                      required
                    />
                    {errors.seller_tax_admin ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_tax_office">{t("description.dashboard.tax_office")}:</label>
                  <div>
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="seller_tax_office"
                      placeholder="Enter tax office"
                      {...register("seller_tax_office", {required: true})}
                      required
                    />
                    {errors.seller_tax_office ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_country">{t("description.dashboard.country")}<span className="text-tertiary pb-3">*</span></label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("seller_country", {required: true})} />
                      <SelectOptions
                          title="Select country"
                          selectedOption={formValues.seller_country ?? ""}
                          setSelectedOption={(userSelection) => setValue("seller_country", userSelection)}
                          options={countries.map(country => country.name)}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.seller_country && errors.seller_country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_city">{t("description.dashboard.state")}:</label>
                  <div className="relative flex-1">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("seller_city", {required: true})} />
                      <SelectOptions
                          title={!formValues.seller_country ? "Select country first" : "Select city"}
                          selectedOption={formValues.seller_city ?? ""}
                          setSelectedOption={(userSelection) => setValue("seller_city", userSelection)}
                          options={getStateCountryState(formValues.seller_country || "")}
                          className="w-full border border-[#D9D9D9] outline-primary transition-all py-1 px-2"
                          top="-top-10"
                      />
                      {!formValues.seller_city && errors.seller_city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_destrict">{t("description.dashboard.district")}:</label>
                  <div className="relative flex-1">
                    <input
                      className="border-2 p-2 outline-none w-40 lg:w-auto"
                      type="text"
                      id="seller_destrict"
                      placeholder="Enter district"
                      {...register("seller_destrict", {required: true})}
                      required
                    />
                    {errors.seller_destrict ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-start">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="seller_address">{t("description.dashboard.address")}<span className="text-tertiary pb-3">*</span></label>
                  <div>
                    <textarea
                      className="min-w-44 border-2 p-2 outline-none resize-none"
                      id="seller_address"
                      placeholder="Enter address"
                      rows={4}
                      {...register("seller_address", {required: true})}
                      required
                    ></textarea>
                    {errors.seller_address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-left pr-4 text-black" htmlFor="taxNumber"></label>
                  <div className="flex justify-start items-center gap-2">
                    <input type="checkbox" className="form-check-input" name="" id="" value="checkedValue" />
                    <label htmlFor="" className="">{t("description.dashboard.add_to_autobook")}</label>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Products and Services */}
        <div className="p-5 m-5 ml-1 lg:w-full bg-white border shadow-lg text-xs">
          <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.PRODUCT_AND_SERVICES")}</h2>
          
          {/* <button className="bg-primary text-white p-2 mb-2 rounded-lg">Add/Remove Column</button> */}

          <div className="flex items-center space-x-1 overflow-x-scroll mb-4 pb-4">
           
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
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.quantity_2")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.unit_of_measurement_code_2")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.price")}</th>
                  <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.product_amount")}</th>
                </tr>

                <tr>
                  <th className="bg-white py-2 px-4 flex justify-center items-center">
                    <span onClick={handleAddProduct} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                      <Plus size={16} weight="regular" className="cursor-pointer" />
                    </span>
                  </th>
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
                          <input type="number" name="quantity_one"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter quantity"
                            defaultValue={product.quantity_one ?? ""}
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
                                selectedOption={getProductDropdownValue(product.id, "unit_id_one") as any}
                                setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "unit_id_one", userSelection)}
                                options={units.map(unit => unit.name)}
                                className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                top="-top-10"
                            />
                          ) : null}
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="quantity_two"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter price"
                            defaultValue={product.quantity_two ?? ""}
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
                                selectedOption={getProductDropdownValue(product.id, "unit_id_two") as any}
                                setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "unit_id_two", userSelection)}
                                options={units.map(unit => unit.name)}
                                className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                top="-top-10"
                            />
                          ) : null}
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="price"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter price"
                            defaultValue={product.price ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            required
                          />
                        </td>

                        <td className="border py-2 px-4">
                          <input type="text" name="product_amount"
                            className="border-2 p-1 outline-none"
                            placeholder="Enter price"
                            defaultValue={product.product_amount ?? ""}
                            onChange={(ev) => handleChangeProductData(ev, product.id)}
                            required
                          />
                        </td>
                      </tr>
                    ))
                  }

              </tbody>
            </table> 

          </div>
        </div>

        {/* Filling from Excel */}
        {/* <div className="p-5 m-5 ml-1 lg:w-2/3 bg-white shadow-gray-600 shadow-lg text-xs">
          <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary">FILLING LINES FROM EXCEL</h2>

          <div className="flex items-left">
            <button className="bg-gray-100 border-gray-600 border p-2 rounded-lg">Choose File</button>
            <input
              className="ml-4 border-2 p-2 outline-none w-40 lg:w-80"
              type="text"
              id=""
              placeholder=""
            />
          </div>
          <p className="text-primary mt-6" > Click To Download Sample Excel-File</p>
        </div> */}

        {/* Note */}
        <div className="p-5 m-5 mb-8 ml-1 lg:w-2/3 bg-white border shadow-lg text-xs">
          <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.NOTES")}</h2>

          <textarea
            className="p-2 border w-full outline-none rounded resize-none"
            id="notes"
            placeholder="Notes"
            rows={5}
            {...register("notes")}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-start items-center gap-2 flex-wrap">
          <button className="bg-primary text-white px-5 py-2 rounded-3xl flex justify-center items-center gap-1">
            {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
            <span>{t("description.dashboard.create")}</span>
          </button>
          
          <Link to="/dashboard" className="bg-secondary text-white px-5 py-2 rounded-3xl flex justify-center items-center gap-1">
            <span>{t("description.dashboard.cancel")}</span>
          </Link>
        </div>
      </form>
    </>
  )
}

export default CreateDeliveryNote;