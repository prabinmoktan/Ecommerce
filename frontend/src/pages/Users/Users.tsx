import AppTable from "../../ui/AppTable/AppTable";
import { userTable } from "../../constant";
import { useGetUsersQuery } from "../(auth)/AuthApi/user.api";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Users = () => {
  const { data, isLoading } = useGetUsersQuery();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = data?.users;
  console.log("user==>", user);
  if (isLoading) return <div>Loading....</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteuser=(user: any)=> {
    console.log(user.email)
  };
  const handleEditUser=()=>{};

  // console.log('usersData==>', usersData)
  return (
    <>
      <AppTable
        headers={userTable.map((user) => user.name)}
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
