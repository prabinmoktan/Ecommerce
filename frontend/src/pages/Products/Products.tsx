import AppButton from "../../ui/AppButton/AppButton";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AppTable from "../../ui/AppTable/AppTable";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full">
        <div className="w-44">
          <AppButton
            title="Add Products"
            icon={<IoAdd />}
            onClick={() => navigate("/products/addProducts")}
            background="primary"
          />
        </div>
        <AppTable />
      </div>
    </>
  );
};

export default Products;
