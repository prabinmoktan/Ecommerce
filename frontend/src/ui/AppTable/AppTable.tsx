import { ProductsTypes, UserTypes } from "../../interface";

interface TableTypes {
  headers: string[];
  tableData?: ProductsTypes[];
  userData?: UserTypes[];
  handleEdit?: (product: ProductsTypes) => void;
  handleDelete?: (product: ProductsTypes) => void;
  edit: string | React.ReactNode;
  deleteButton: string | React.ReactNode;
  handleEditUser?: (user: UserTypes) => void;
  handleDeleteUser?: (user: UserTypes) => void;
}

const AppTable: React.FC<TableTypes> = ({
  headers,
  tableData,
  userData,
  handleDelete,
  handleEdit,
  edit,
  deleteButton,
  handleDeleteUser,
  handleEditUser,
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full bg-white ">
          <thead>
            <tr>
              {headers.map((item: string, index: number) => (
                <th key={index} className="text-xl font-bold text-center py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="min-w-full w-full">
            {tableData?.length === 0 ? (
              <div className="w-screen flex justify-center  text-2xl items-center  h-28">
                No Products Found
              </div>
            ) : (
              tableData?.map((product: ProductsTypes, index) => (
                <tr
                  key={product._id}
                  className={`min-w-full text-center  ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2  border-gray-300 flex gap-4 items-center">
                    {product.title}
                  </td>
                  <td className="px-4 py-2  border-gray-300">
                    {product.category?.name}
                  </td>
                  <td className="px-4 py-2  border-gray-300">
                    ${product.price}
                  </td>
                  <td className="px-4 py-2  border-gray-300">
                    {product.stock}
                  </td>
                  <td className="px-4 py-2  border-gray-300 ">
                    <button
                      className=" text-blue-500 rounded-md hover:blue-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                      onClick={() => handleEdit && handleEdit(product)}
                    >
                      {edit}
                    </button>
                    <button
                      className=" text-red-500 rounded-md hover:text-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                      onClick={() => handleDelete && handleDelete(product)}
                    >
                      {deleteButton}
                    </button>
                  </td>
                </tr>
              ))
            )}
            {userData?.map((user: UserTypes, index) => (
              <tr
                key={user._id}
                className={`min-w-full text-center  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-2  border-gray-300 flex items-center gap-4">
                  <div
                    className={`${
                      user?.role === "admin" ? "bg-yellow-700" : "bg-green-800"
                    } rounded-full text-white py-3 px-5 text-center `}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2  border-gray-300">{user.email}</td>
                <td className="px-4 py-2  border-gray-300">{user.role}</td>

                <td className="px-4 py-2  border-gray-300 ">
                  <button
                    className=" text-blue-500 rounded-md hover:blue-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                    onClick={() => handleEditUser && handleEditUser(user)}
                  >
                    {edit}
                  </button>
                  <button
                    className=" text-red-500 rounded-md hover:text-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                    onClick={() => handleDeleteUser && handleDeleteUser(user)}
                  >
                    {deleteButton}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AppTable;
