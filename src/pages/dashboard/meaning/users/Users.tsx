/* eslint-disable @typescript-eslint/no-explicit-any */
import {Eye, FilePdf, MicrosoftExcelLogo, Pencil, Trash} from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getUsers, removeUser } from "../../../../store/features/Users";
import { UserProps } from "../../../../types/types";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";
import { getToken } from "../../../../services/auth";
import { axiosInstance } from "../../../../api/api";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";


interface DeleteInfoProps { 
  id: number | string;
  show: boolean;
  loading: boolean;
}

const Users = () => {
  const { users, loading, message } = useAppSelector(state => state.users);
  const [addUserInfo, setAdduserInfo] = useState({show: false, loading: false});
  // const [resetPasswordInfo, setResetPasswordInfo] = useState({
  //   show: false,
  //   message: "",
  //   loading: false
  // });
  const [selectedIDs, setSelectedIDs] = useState<any[]>([]);
  const [deleteUserInfo, setDeleteUserInfo] = useState<DeleteInfoProps>({id: "", show: false, loading: false});
  const [viewUserInfo, setViewUserInfo] = useState({
    show: false,
    user: {} as UserProps
  });
  const [editUserInfo, setEditUserInfo] = useState({
    show: false,
    user: {} as UserProps
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();


  useEffect(() => {

    if(!users.length){ dispatch(getUsers()) }

  }, [dispatch, users.length]);


  // const handleResetPassword = () => {
  //   if(resetPasswordInfo.loading){ return; }

  //   setResetPasswordInfo({...resetPasswordInfo, loading: true});
  //   toast.success(t("description.dashboard.email_sent_successfully"), {autoClose: 4000, pauseOnHover: false});
  //   return setTimeout(() => {
  //     setResetPasswordInfo({...resetPasswordInfo, show: false, loading: false, message: ""});
  //   }, 4000);
  // }

  const handleCheckAll = () => selectedIDs.length === users.length ? setSelectedIDs([]) : setSelectedIDs(users.map(user => user.id));

  const handleCheck = (val: number | string) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }

  const handleDeleteUser = async () => {
    if(deleteUserInfo.loading){ return; }

    setDeleteUserInfo({...deleteUserInfo, loading: true});
    try {
      
      const { data } = await axiosInstance.delete(`/admin/users/${deleteUserInfo.id}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(removeUser({ id: deleteUserInfo.id}));
        return setTimeout(() => {
          setDeleteUserInfo({...deleteUserInfo, loading: false, show: false});
        }, 4000);
      }
      
      setDeleteUserInfo({...deleteUserInfo, loading: false, show: false});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setDeleteUserInfo({...deleteUserInfo, loading: false, show: false});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }

  }

  const handleViewUser = (user: UserProps) => setViewUserInfo({...viewUserInfo, show: true, user});

  const handleEditUser = (user: UserProps) => setEditUserInfo({...editUserInfo, show: true, user});

  const displayUsers = () => {
   
    return (
            <div className="w-full overflow-x-scroll mb-4">
              <table className="w-full table-auto text-xs mb-4">
                <thead className="whitespace-nowrap">
                  <tr className="bg-[#F3FAFF]">
                    <th className="p-3 text-start border border-primary ">
                      <input
                        type="checkbox" name="checkAll"
                        className="w-[14px] h-[14px] accent-primary"
                        onChange={handleCheckAll}
                        checked={selectedIDs.length ? (selectedIDs.length === users.length) : false}
                      />
                    </th>
                    <th className="p-3 text-start border border-primary">{t("description.dashboard.full_name")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.auth.username")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.auth.email")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.auth.phone_number")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.dashboard.mobile_number")}</th>
                    <th className="p-3 text-start border border-primary">{t("description.dashboard.registration_date")}</th>
                    <th className="p-3 text-start border border-primary text-hidden"></th>
                  </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                  {
                    users.map(user => (
                      <tr key={user.uuid}>
                        <td className={`p-3 border border-[#D9D9D9]`}>
                          <input
                            type="checkbox"
                            className="w-[14px] h-[14px] accent-primary"
                            value={user.id}
                            checked={selectedIDs.includes(user.id)}
                            onChange={() => handleCheck(user.id)}
                          />
                        </td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{user.name}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{user.username}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{user.email}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{user.phone}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{user.mobile}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className={`p-3 border border-[#D9D9D9]`}>
                          <div className="flex justify-center items-center gap-2">
                            <Pencil size={16} color="green" className="cursor-pointer"
                              onClick={() => handleEditUser(user)}
                            />
                            <Trash 
                              onClick={() => setDeleteUserInfo({...deleteUserInfo, id: user.id, show: true})} 
                              size={16} color="red" className="cursor-pointer" 
                            />
                            <Eye size={16} color="orange" 
                              className="cursor-pointer"
                              onClick={() => handleViewUser(user)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
    )
  }

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users.map(user => (
      {
        [t("description.dashboard.full_name")]: user.name,
        [t("description.auth.username")]: user.username,
        [t("description.auth.email")]: user.email,
        [t("description.auth.phone_number")]: user.phone,
        [t("description.dashboard.mobile_number")]: user.mobile,
        [t("description.dashboard.registration_date")]: new Date(user.created_at).toLocaleDateString()
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft producer receipt.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.full_name"),
        t("description.auth.username"),
        t("description.auth.email"),
        t("description.auth.phone_number"),
        t("description.dashboard.mobile_number"),
        t("description.dashboard.registration_date")
      ]],
      body: users.map(user => [
        user.name,
        user.username,
        user.email,
        user.phone,
        user.mobile,
        new Date(user.created_at).toLocaleDateString()
      ]),
      headStyles: {
        fillColor: "#238DC1",
        lineWidth: 0.1,
        lineColor:  "#238DC1",
        fontSize: 5
      },
      bodyStyles: {
        lineWidth: 0.1,
        fontSize: 5
      }
    });

    doc.save('EConiaSoft producer receipt.pdf');
  };


  return (
    <>
      {/* Add User */}
      <AddUser 
        show={addUserInfo.show}
        closeModal={() => setAdduserInfo({...addUserInfo, show: false})}
      />

      {/* View User */}
      <ViewUser 
        show={viewUserInfo.show}
        user={viewUserInfo.user}
        closeModal={() => setViewUserInfo({...viewUserInfo, show: false, user: {} as UserProps})}
      />

      {/* Edit User */}
      <EditUser 
        show={editUserInfo.show}
        user={editUserInfo.user}
        closeModal={() => setEditUserInfo({...editUserInfo, show: false, user: {} as UserProps})}
      />

      {/* Reset user password */}
      {/* <ConfirmationModal
        show={resetPasswordInfo.show}
        message={resetPasswordInfo.message}
        loading={resetPasswordInfo.loading}
        handleProceed={handleResetPassword}
        handleCancel={() => setResetPasswordInfo({...resetPasswordInfo, show: false, loading: false, message: ""})}
      /> */}

      {/* Delete user */}
      <ConfirmationModal
        show={deleteUserInfo.show}
        message={t("description.dashboard.did_you_want_to_delete_this_user?")}
        loading={deleteUserInfo.loading}
        handleProceed={handleDeleteUser}
        handleCancel={() => setDeleteUserInfo({...deleteUserInfo, show: false, loading: false})}
      />

      <div className="flex justify-between items-center gap-4 flex-wrap text-xs mb-2">
        <h2 className="font-bold text-sm">{t("description.dashboard.USERS")}</h2>
        
        {/* {
          users.length ? (
            <div className="flex justify-start items-center gap-3 flex-wrap">
                <input
                  type="search"
                  className="border-2 rounded-md outline-none focus:border-primary py-2 px-4"
                  id=""
                  placeholder="Enter username, name, email"
                />

              <div className="relative">
                <input
                  type="search"
                  placeholder="Filter..."
                  className="w-[109px] border-2 rounded-md outline-none focus:border-primary pl-10 pr-4 py-2"
                />

                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FunnelSimple size={20} />
                </span>
              </div>
            </div>
          ) : null
        } */}
      </div>
      
      <div className="flex justify-between items-center gap-4 mb-4">
        <p className="text-xs ">{t("description.dashboard.meaning")}</p>
        {
          !users.length ? (
            <button onClick={() => setAdduserInfo({...addUserInfo, show: true})} className="bg-secondary text-xs text-white rounded text-center py-1 px-3">{t("description.dashboard.add_user")}</button>
          ) : null
        }
      </div>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
        users.length ? (
          <>
            <div className="flex justify-between items-center gap-3 text-xs mb-6">
              <div className="flex justify-between items-center gap-2">
                <p className="inline-block mr-4">{t("description.dashboard.save_file_as")}</p>
                <span title="Excel" onClick={generateExcel}>
                  <MicrosoftExcelLogo
                    size={20}
                    color="green"
                    weight="regular"
                    className="cursor-pointer"
                  />
                </span>

                <span title="PDF" onClick={exportJsonToPdf}>
                  <FilePdf
                    size={20}
                    color="red"
                    weight="regular"
                    className="cursor-pointer"
                  />
                </span>
              </div>

              {/* <button 
                onClick={() => setResetPasswordInfo({
                  ...resetPasswordInfo, show: true, message: t("description.dashboard.emails_will_be_sent_and_certain_user_passwords_will_be_reset_verify?")
                })}
                className="bg-[#FF0000] text-white rounded text-center py-1 px-2 text-xs"
              >{t("description.dashboard.reset_password")}</button> */}

            </div>

            {/* Display user info */}
            {displayUsers()}

            {/* <Pagination /> */}

            <div className="mt-5">
              <button onClick={() => setAdduserInfo({...addUserInfo, show: true})} className="bg-primary text-xs text-white rounded-full text-center py-2 px-4">{t("description.dashboard.add_user")}</button>
            </div>
          </>
          ) : (
            <p className="text-center text-xs text-secondary mt-8">{t("description.messages.no_record_found")}</p>
          )
        ) : null
      }
    </>
  );
};

export default Users;
