/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SelectOptions from "../../components/SelectOptions";
import { v1 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getUnits } from "../../../../store/features/Units";
import { Plus, Trash } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import countries from "../../../../data/countries.json";
import { useTranslation } from "react-i18next";
import useRoles from "../../../../authentication/useRoles";
import { getCompanies } from "../../../../store/features/Companies";
import { Link } from "react-router-dom";
import { getCurrencies } from "../../../../store/features/Currencies";
import { getProductCategories } from "../../../../store/features/ProductCategory";

interface FormDataProps {
  // Required
  // ########################
  producer_uuid: string;
  producer_date: string;
  producer_name: string;
  unit_id: number | string;
  total_amount: string;
  title: string;
  receiver_name: string;
  receiver_tax_number: number | string;
  receiver_tax_office: string;
  buyer_country: string;
  buyer_city: string;
  buyer_email: string;
  buyer_mobile_number: string;
  buyer_address: string;
  total_product_services: number | string;
  total_0003_stoppage: number | string;
  total_taxes: number | string;
  total_payable: number | string;
  company_id: number | string;
  sms_notification_for_earchive: boolean;
  add_to_address_book: boolean;

    // Optional
  // #############################
  buyer_web_address: string;
  notes: string; 
}


const ProducerReceipt = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormDataProps>({defaultValues: {
    producer_uuid: v1(),
    sms_notification_for_earchive: false,
    add_to_address_book: false
  }});

  const {units, loading: unitLoader, message: unitMessage} = useAppSelector(state => state.units);
  const {currencies, loading: currencyLoader, message: currencyMessage} = useAppSelector(state => state.currencies);
  const {companies, loading: companyLoader, message: companyMessage} = useAppSelector(state => state.companies);
  const {productCategories, loading: productCategoryLoader, message: productCategoryMessage} = useAppSelector(state => state.productCategories);

  const [products, setProducts] = useState([
    {
      "id": v1(),
      "fee_reason": "",
      "product_category_id": "",
      "quantity1": "",
      "quantity2": "",
      "unit_id1": "",
      "unit_id2": "",
      "price": "",
      "gross_amount": "",
      "rate": "",
      "amount": "",
      "tax_line_total": "",
      "payable_line": ""
    }
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formValues = watch();
  const { t } = useTranslation();
  const roles = useRoles();



  useEffect(() => {

    if(!units.length){ dispatch(getUnits()) }
    if(!currencies.length){ dispatch(getCurrencies()) }
    if(roles && roles.includes("admin") && !companies.length){ dispatch(getCompanies()) }
    if(!productCategories.length){ dispatch(getProductCategories()); }
    if(roles && roles.includes("admin") && !companyLoader && !companyMessage && !companies.length){
      toast.warning("A company is required to create an invoice, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }

  }, [dispatch, units.length]);
  

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
        "id": v1(),
        "fee_reason": "",
        "product_category_id": "",
        "quantity1": "",
        "quantity2": "",
        "unit_id1": "",
        "unit_id2": "",
        "price": "",
        "gross_amount": "",
        "rate": "",
        "amount": "",
        "tax_line_total": "",
        "payable_line": ""
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

  const getStateCountryState = (country: string) => {

    if(country){
        const filteredCountry = countries.find(cnt => cnt.name === country);
        return filteredCountry ? filteredCountry.states.map(state => state.name) : []
    }

    return [];
}


  const handleFormSubmit: SubmitHandler<FormDataProps> = async () => {
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


    const formDataPayload = {
      ...formValues,
      products
    }

    const currency = currencies.find(currency => currency.code == formValues.unit_id);
    formDataPayload.unit_id = currency?.id as number | string;
    const company = companies.find(comp => comp.company_name === formValues.company_id);
    formDataPayload.company_id = company?.id as number | string;

    const updatedProducts = products.map((product) => {
      const unit1 = units.find(unit => unit.name == product.unit_id1);
      const unit2 = units.find(unit => unit.name == product.unit_id2);
      const productCat = productCategories.find(pc => pc.name === product.product_category_id);
      
      return {
        ...product,
        product_category_id: (productCat?.id || product.product_category_id).toString(),
        unit_id1: unit1?.id,
        unit_id2: unit2?.id
      }
    });

    (formDataPayload.products as any) = updatedProducts;
    
    // console.log("Form Data: ", formDataPayload);
    // return

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post(`/user/producer-receipts`, formDataPayload, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
              
        return setTimeout(() => {
          setLoading(false);
          return navigate(`/dashboard/outgoing-producer-receipt/outgoing`);
        }, 2000);
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
      <div className="h-full w-full p-2">

        <h2 className="font-bold text-sm mb-2">{t("description.dashboard.PRODUCER_RECIEPTS")}</h2>
        <p className="text-xs mb-4">{t("description.dashboard.draft")}</p>

        <h2 className="border-b-2 border-primary pb-1 font-bold text-xs mb-2 text-center text-tertiary">{t("description.dashboard.PRODUCER_RECIEPTS")}</h2>


        <form onSubmit={handleSubmit(handleFormSubmit)}>

          {/* PRODUCER INFORMATIOM */}
          <div className=" w-full lg:flex container mx-auto lg:py-2 lg:my-10 text-xs">
            {/* Card 1 */}
            <div className="lg:p-4 p-2 lg:w-[48%] w-full bg-white border shadow-lg">
              <h2 className="font-bold mb-4 text-left text-tertiary">{t("description.dashboard.PRODUCER_INFORMATION")}</h2>

              <div className="">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="lg:w-36 text-left pr-4 text-black" htmlFor="receiver">{t("description.dashboard.producer_UUID")}:</label>
                    <div className="relative flex-1">
                      <label className="w-28 text-left pr-4 text-gray-600" htmlFor="receiver">{formValues.producer_uuid}</label>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-36 text-left lg:pr-4 text-black" htmlFor="producer_date">{t("description.dashboard.producer_date")}<span className="text-tertiary pb-3">*</span></label>
                    <div className="">
                      <input type="date" id="producer_date"
                        className="border-2 p-2 outline-none rounded transition-all w-20 lg:w-auto"
                        {...register("producer_date", {required: true})}
                        required
                      />
                      {errors.producer_date ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-36 text-left lg:pr-4 text-black" htmlFor="producer_name">{t("description.dashboard.producer_name")}<span className="text-tertiary pb-3">*</span></label>
                    <div className="">
                      <input type="text" id="producer_name"
                        className="border-2 p-2 outline-none rounded transition-all w-20 lg:w-auto"
                        placeholder="Enter producer name"
                        {...register("producer_name", {required: true})}
                        required
                      />
                      {errors.producer_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  {/* <div className="flex items-center">
                    <label className="w-36 text-left pr-4 text-black" htmlFor="unit">Producer ID:</label>
                    <div className="relative flex-1">
                      <input type="text" name="despatch_date" value={"TK"}  readOnly
                        className="border-2 p-2 outline-none rounded transition-all py-1 w-20 lg:w-auto"
                      />
                    </div>
                  </div> */}

                  {
                    roles && roles.includes("admin") ? (
                      <div className="flex items-center">
                        <label className="w-36 text-left pr-4 text-black" htmlFor="company_name">{t("description.dashboard.company_name")}<span className="text-tertiary pb-3">*</span></label>
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
                    <label className="w-36 text-left pr-4 text-black" htmlFor="unit_id">{t("description.dashboard.currency_unit")}:</label>
                    <div className="relative flex-1">
                      {currencyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                      {!currencyLoader && currencyMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{currencyMessage}</p>) : null}
                      {!currencyLoader && !currencyMessage ? (
                        <div>
                          <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("unit_id", {required: true})} />
                          <SelectOptions
                              title="Currency unit"
                              selectedOption={formValues.unit_id as string}
                              setSelectedOption={(userSelection) => setValue("unit_id", userSelection)}
                              options={currencies.map(cu => cu.code)}
                              className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                              top="top-8"
                          />
                          {!formValues.unit_id && errors.unit_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-36 text-left pr-4 text-black" htmlFor="total_amount">{t("description.dashboard.total_amount")}:</label>
                    <div>
                      <input
                        className="border-2 p-2 outline-none w-40 lg:w-auto"
                        type="number"
                        id="total_amount"
                        placeholder="Enter total amount"
                        {...register("total_amount", {required: true})}
                        required
                      />
                      {errors.total_amount ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-36 text-left pr-4 text-black" htmlFor="title">{t("description.dashboard.title")}:</label>
                    <div>
                      <input
                        className="border-2 p-2 outline-none w-40 lg:w-auto"
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        {...register("title", {required: true})}
                        required
                      />
                      {errors.title ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Card 2 */}
            {/* Receiver Information */}
            <div className="lg:p-4 p-2 lg:ml-4 lg:w-[49%] w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg ">
              <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.RECIEVER_INFORMATION")}</h2>
              
              <div className="mb-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="receiver_name">{t("description.dashboard.reciever")}<span className="text-tertiary pb-3">*</span></label>
                    <div className="relative flex-1">
                      <input type="text" id="receiver_name"
                          className="border-2 p-2 outline-none rounded transition-all w-20 lg:w-auto"
                          placeholder="Enter reciever name"
                          {...register("receiver_name", {required: true})}
                          required
                      />
                      {errors.receiver_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-28 text-left pr-1 text-black" htmlFor="receiver_tax_number">{t("description.dashboard.tax_number")}<span className="text-tertiary pb-3">*</span></label>
                    <div>
                      <input
                        className="p-2 border outline-none rounded w-40 lg:w-auto"
                        type="text"
                        id="receiver_tax_number"
                        placeholder="Enter tax Number"
                        {...register("receiver_tax_number", {required: true})}
                        required
                      />
                      {errors.receiver_tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>


                  <div className="flex items-center">
                    <label className="w-28 text-left pr-1 text-black" htmlFor="receiver_tax_office">{t("description.dashboard.tax_office")}</label>
                    <div>
                      <input
                        className="p-2 border outline-none rounded w-40 lg:w-auto"
                        type="text"
                        id="receiver_tax_office"
                        placeholder="Enter Tax Office Number"
                        {...register("receiver_tax_office", {required: true})}
                        required
                      />
                      {errors.receiver_tax_office ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="taxNumber"></label>
                    <div className="flex justify-start items-center gap-2">
                        <input type="checkbox" className="form-check-input" 
                          name="" id="sms_notification_for_earchive" 
                          value="sms_notification_for_earchive"
                          checked={formValues.sms_notification_for_earchive}
                          onChange={() => setValue("sms_notification_for_earchive", !formValues.sms_notification_for_earchive)}
                        />
                        <label htmlFor="sms_notification_for_earchive">{t("description.dashboard.enable_SMS_notification_for_e_archieve_sent")}</label>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="taxNumber"></label>
                    <div className="flex justify-start items-center gap-2">
                        <input type="checkbox" className="form-check-input" name="" 
                          id="add_to_address_book" 
                          value="add_to_address_book" 
                          checked={formValues.add_to_address_book}
                          onChange={() => setValue("add_to_address_book", !formValues.add_to_address_book)}
                        />
                        <label htmlFor="add_to_address_book" >{t("description.dashboard.add_to_address_book")}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RECIEVER  INFORMATION*/}
          <div className=" w-full h-auto flex flex-wrap lg:py-2 container mx-auto my-10 text-xs">
            {/* Card 1 */}
            <div className="lg:p-4 p-2 lg:w-[48%]"></div>

            {/* Card 2 */}
            <div className="lg:p-4 p-2 lg:ml-4 lg:w-[48%] h-1/2 w-full border-6 mt-5 lg:mt-0 bg-white border shadow-lg ">
              <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.BUYER_ADDRESS_INFORMATION")}</h2>
              
              <div className="">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_country">{t("description.dashboard.country")}<span className="text-tertiary pb-3">*</span></label>
                    <div className="relative flex-1 w-28">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("buyer_country", {required: true})} />
                      <SelectOptions
                        title="Select country"
                        selectedOption={formValues.buyer_country || ""}
                        setSelectedOption={(userSelection) => setValue("buyer_country", userSelection)}
                        options={countries.map(country => country.name)}
                        className="border border-[#D9D9D9] rounded outline-primary transition-all p-2 w-1/4"
                        top="top-8"
                      />
                      {!formValues.buyer_country && errors.buyer_country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="receiver">{t("description.dashboard.city")}<span className="text-tertiary pb-3">*</span></label>
                    <div className="relative flex-1 w-28">
                      <input type="text" readOnly className="-z-10 absolute top-0 left-0 opacity-0" {...register("buyer_city", {required: true})} />
                      <SelectOptions
                        title={!formValues.buyer_country ? "Select country first" : "Select city"}
                        selectedOption={formValues.buyer_city || ""}
                        setSelectedOption={(userSelection) => setValue("buyer_city", userSelection)}
                        options={getStateCountryState(formValues.buyer_country || "")}
                        className="border border-[#D9D9D9] rounded outline-primary transition-all p-2 w-1/4"
                        top="top-8"
                      />
                      {!formValues.buyer_city && errors.buyer_city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>


                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_email">{t("description.auth.email")}<span className="text-tertiary pb-3">*</span></label>
                    <div>
                      <input
                        className="p-2 border outline-none rounded w-40 lg:w-auto"
                        type="email"
                        id="buyer_email"
                        placeholder="Enter email address"
                        {...register("buyer_email", {required: true})}
                        required
                      />
                      {errors.buyer_email ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_mobile_number">{t("description.dashboard.mobile_number")}<span className="text-tertiary pb-3">*</span></label>
                    <div>
                      <input
                        className="p-2 border outline-none rounded w-40 lg:w-auto"
                        type="phone"
                        id="buyer_mobile_number"
                        placeholder="Enter mobile number"
                        {...register("buyer_mobile_number", {required: true})}
                        required
                      />
                      {errors.buyer_mobile_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_web_address">{t("description.dashboard.web_address")}<span className="text-tertiary pb-3">*</span></label>
                    <input
                      className="p-2 border outline-none rounded w-40 lg:w-auto"
                      type="text"
                      id="buyer_web_address"
                      placeholder="Enter Web Address"
                      {...register("buyer_web_address")}
                    />
                  </div>


                  <div className="flex items-start">
                    <label className="w-28 text-left pr-4 text-black" htmlFor="buyer_address">{t("description.dashboard.address")}<span className="text-tertiary pb-3">*</span></label>
                    <div>
                      <textarea
                        className="min-w-44 p-2 border border-gray-300 rounded outline-none resize-none"
                        id="buyer_address"
                        placeholder="Enter address"
                        rows={4}
                        {...register("buyer_address", {required: true})}
                        required
                      ></textarea>
                      {errors.buyer_address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products and Services */}
          <div className="p-5 m-5 ml-1 lg:w-full bg-white border shadow-lg text-xs">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary">{t("description.dashboard.PRODUCTS_AND_SERVICES")}</h2>
            
            {/* <button className="bg-primary text-white p-2 mb-2 rounded-lg">Add/Remove Column</button> */}

            <div className="overflow-x-scroll mb-4 pb-4">
              <table className="border border-collapse border-l-0">
                <thead className="whitespace-nowrap bg-[#F3FAFF]">
                  <tr>
                    <th className="border border-t-transparent border-l-transparent border-b-transparent bg-white px-4">
                      <span className="inline-block border rounded-md py-2 px-4 mb-2">{products.length}</span>
                    </th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.id")}</th>

                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.fee_reason")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.product_category")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.quantity")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.quantity_2")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.unit_of_measurement")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.unit_of_measurement_2")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.price")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.gross_amount")}</th>
                    <th className="border py-2 px-4" colSpan={2}>{t("description.dashboard.003_stoppage")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.tax_line_total")}</th>
                    <th rowSpan={2} className="border py-2 px-4">{t("description.dashboard.payable_line")}</th>
                  </tr>

                  <tr>
                    <th className="bg-white py-2 px-4 flex justify-center items-center">
                      <span onClick={handleAddProduct} className="w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center"> 
                        <Plus size={16} weight="regular" className="cursor-pointer" />
                      </span>
                    </th>
                    
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
                            <input type="text" name="fee_reason"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter fee reason"
                              defaultValue={product.fee_reason ?? ""}
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
                            <input type="number" name="quantity1"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter quantity"
                              defaultValue={product.quantity1 ?? ""}
                              onChange={(ev) => handleChangeProductData(ev, product.id)}
                              required
                            />
                          </td>

                          <td className="border py-2 px-4">
                            <input type="number" name="quantity2"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter quantity"
                              defaultValue={product.quantity2 ?? ""}
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
                                  selectedOption={getProductDropdownValue(product.id, "unit_id1") as any}
                                  setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "unit_id1", userSelection)}
                                  options={units.map(unit => unit.name)}
                                  className="border border-[#D9D9D9] rounded outline-primary transition-all py-2 px-4 whitespace-nowrap"
                                  top="-top-10"
                              />
                            ) : null}
                          </td>

                          <td className="border py-2 px-4">
                            {unitLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
                            {!unitLoader && unitMessage ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{unitMessage}</p>) : null}
                            {!unitLoader && !unitMessage ? (
                              <SelectOptions
                                  title="Unit"
                                  selectedOption={getProductDropdownValue(product.id, "unit_id2") as any}
                                  setSelectedOption={(userSelection) => handleChangeDropdownProductData(product.id, "unit_id2", userSelection)}
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
                            <input type="number" name="gross_amount"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter gross amount"
                              defaultValue={product.gross_amount ?? ""}
                              onChange={(ev) => handleChangeProductData(ev, product.id)}
                              required
                            />
                          </td>

                          <td className="border py-2 px-4">
                            <input type="number" name="rate"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter rate"
                              defaultValue={product.rate ?? ""}
                              onChange={(ev) => handleChangeProductData(ev, product.id)}
                              required
                            />
                          </td>

                          <td className="border py-2 px-4">
                            <input type="number" name="amount"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter amount"
                              defaultValue={product.amount ?? ""}
                              onChange={(ev) => handleChangeProductData(ev, product.id)}
                              required
                            />
                          </td>

                          <td className="border py-2 px-4">
                            <input type="number" name="tax_line_total"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter tax line total"
                              defaultValue={product.tax_line_total ?? ""}
                              onChange={(ev) => handleChangeProductData(ev, product.id)}
                              required
                            />
                          </td>

                          <td className="border py-2 px-4">
                            <input type="number" name="payable_line"
                              className="border-2 p-1 outline-none"
                              placeholder="Enter payable line"
                              defaultValue={product.payable_line ?? ""}
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


          {/* Total */}
          <div className="p-5 m-5 ml-1 lg:w-1/2 bg-white border shadow-lg text-xs">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-2 text-left text-tertiary uppercase">{t("description.dashboard.total")}</h2>
            
            <div className="flex items-center py-2">
                <label className="w-2/5 text-left pr-4 text-black" htmlFor="total_product_services">{t("description.dashboard.total_product_services")}<span className="text-tertiary pb-3">*</span></label>
                <div>
                  <input
                    className="p-2 border outline-none rounded w-40 lg:w-auto"
                    type="number"
                    id="total_product_services"
                    placeholder="00.00"
                    {...register("total_product_services", {required: true})}
                    required
                  />
                  {errors.total_product_services ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
              </div>

              <div className="flex items-center py-2">
                <label className="w-2/5 text-left pr-4 text-black" htmlFor="total_0003_stoppage">{t("description.dashboard.3000_stoppage")}</label>
                <div>
                  <input
                    className="p-2 border outline-none rounded w-40 lg:w-auto"
                    type="number"
                    id="total_0003_stoppage"
                    placeholder="00.00"
                    {...register("total_0003_stoppage", {required: true})}
                    required
                  />
                  {errors.total_0003_stoppage ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
              </div>

              <div className="flex items-center py-2">
                <label className="w-2/5 text-left pr-4 text-black" htmlFor="total_taxes">{t("description.dashboard.total_taxes")}</label>
                <div>
                  <input
                    className="p-2 border outline-none rounded w-40 lg:w-auto"
                    type="number"
                    id="total_taxes"
                    placeholder="00.00"
                    {...register("total_taxes", {required: true})}
                    required
                  />
                  {errors.total_taxes ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
              </div>

              <div className="flex items-center py-2">
                <label className="w-2/5 text-left pr-4 text-black" htmlFor="total_payable">{t("description.dashboard.total_payble")}</label>
                <div>
                  <input
                    className="p-2 border outline-none rounded w-40 lg:w-auto"
                    type="number"
                    id="total_payable"
                    placeholder="00.00"
                    {...register("total_payable", {required: true})}
                    required
                  />
                  {errors.total_payable ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
              </div>
          </div>

          {/* Note */}
          <div className="p-5 m-5 mb-8 ml-1 lg:w-1/2 bg-white border shadow-lg text-xs">
            <h2 className="border-b-2 border-primary pb-1 font-bold mb-4 text-left text-tertiary">{t("description.dashboard.NOTES")}</h2>

            <textarea
              className="w-full p-2 border outline-none rounded resize-none"
              id="notes"
              placeholder="Notes"
              rows={5}
              {...register("notes")}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start items-center gap-2 flex-wrap pb-5">
            <button className="bg-primary text-white px-5 py-2 rounded-3xl flex justify-center items-center gap-1">
              {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
              <span>{t("description.dashboard.create")}</span>
            </button>
            
            <Link to="/dashboard" className="bg-secondary text-white px-5 py-2 rounded-3xl">
              <span>{t("description.dashboard.cancel")}</span>
            </Link>
          </div>
        </form>

      </div>
    </>
  )
}

export default ProducerReceipt;