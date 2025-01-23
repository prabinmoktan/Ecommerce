import AppTable from "../../AdminUi/AppTable/AppTable";
import { userTable } from "../../../constant";
import { useGetUsersQuery } from "../(auth)/AuthApi/user.api";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/ModalSlice";

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = data?.users;
  const dispatch = useDispatch();
 
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteuser=(user: any)=> {
    dispatch(openModal(
      {showController: false,
        title: user.email,
        message: "Are You Sure You want To Delete",
        delete: 'Delete', 
        cancel: "cancel"
      }
    ))
  };
  const handleEditUser=()=>{};

  // console.log('usersData==>', usersData)
  return (
    <>
      <AppTable
        headers={userTable.map((user) => user.name)}
        type="user"
        isUserLoading={isLoading}
        userData={user}
        handleDeleteUser={handleDeleteuser}
        handleEditUser={handleEditUser}
        edit={<CiEdit />}
        deleteButton={<MdDeleteOutline />}
      />
    </>
  );
};

export default Users;
