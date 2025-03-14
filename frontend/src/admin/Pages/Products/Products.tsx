import AppButton from "../../AdminUi/AppButton/AppButton";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AppTable from "../../AdminUi/AppTable/AppTable";
import { productsTable } from "../../../constant";
import { useGetProductsQuery } from "./products.api";
import { ProductsTypes } from "../../../interface";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/ModalSlice";

const Products = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useGetProductsQuery({limit: 5, page: 1});
  const products = data?.products;
  console.log('products==>', data)
  const dispatch = useDispatch();
  const handleOpenDeleteModal = (product: ProductsTypes) => {
    dispatch(
      openModal({
        title: ` ${product.title} `,
        delete: "Delete",
        cancel: "cancel",
        id: product._id,
        message: "Are you sure you want to delete this product?",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        images: product.images?.[0] || "",
      })
    );
  };

  const handleEdit = (product: ProductsTypes) => {
    navigate(`/admin/products/editProducts/${product._id}`, {
      state: { product },
    });
  };
  

  return (
    <>
      <div className="w-full h-full">
        <div className="w-44">
          <AppButton
            title="Add Products"
            icon={<IoAdd />}
            onClick={() => navigate("/admin/products/addProducts")}
            background="primary"
          />
        </div>
        <AppTable
          type="product"
          headers={productsTable.map((product) => product.name)}
          tableData={products || []}
          isProductLoading={isLoading}
          edit={<CiEdit />}
          deleteButton={<MdDeleteOutline />}
          handleEdit={handleEdit}
          handleDelete={handleOpenDeleteModal}
        />
      </div>
    </>
  );
};

export default Products;
