/* eslint-disable @typescript-eslint/ban-ts-comment */
import { productsTable } from "../../constant";
import { ProductsTypes } from "../../interface";
import { useGetProductsQuery } from "../../pages/Products/products.api";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { openModal } from "../../redux/ModalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../../components/components/ui/skeleton";

const AppTable = () => {
  const { isLoading, data } = useGetProductsQuery();
  const navigate = useNavigate();
  const products = data?.products;
  const dispatch = useDispatch();
  const handleOpenDeleteModal = (product: ProductsTypes) => {
    console.log(product);
    dispatch(
      openModal({
        title: ` ${product.title} `,
        delete: "Delete",
        cancel: "cancel",
        id: product._id,
        message: "Are you sure you want to delete this product?",
        // @ts-ignore
        images: product.images?.[0] || "",
      })
    );
  };

  const handleEdit = (product: ProductsTypes) => {
    navigate(`/products/editProducts/${product._id}`, { state: { product } });
  };
  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full bg-white ">
          <thead>
            <tr>
              {productsTable.map((item: { name: string }, index: number) => (
                <th key={index} className="text-xl font-bold text-center py-3">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody  className="min-w-full w-full">
          { 
          products?.length === 0 ? <div className="w-screen flex justify-center  text-2xl items-center  h-28">No Products Found</div>
          :
          products?.map((product: ProductsTypes, index) => (
              <tr
              key={product._id}
                className={`min-w-full text-center  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-2  border-gray-300 flex gap-4 items-center">
                  {
                    isLoading && <Skeleton h-16 w-12/>
                  }
                  {product.images.length > 0 && (
                    // @ts-ignore
                    <img src={product.images?.[0]} className="h-16 w-12" />
                  )}
                  {product.title}
                </td>
                <td className="px-4 py-2  border-gray-300">
                  {product.category?.name}
                </td>
                <td className="px-4 py-2  border-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-4 py-2  border-gray-300">{product.stock}</td>
                <td className="px-4 py-2  border-gray-300 ">
                  <button
                    className=" text-blue-500 rounded-md hover:blue-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                    onClick={() => handleEdit(product)}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className=" text-red-500 rounded-md hover:text-red-600 hover:scale-150 transition ease-in-out duration-300 px-2 text-2xl"
                    onClick={() => handleOpenDeleteModal(product)}
                  >
                    <MdDeleteOutline />
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
