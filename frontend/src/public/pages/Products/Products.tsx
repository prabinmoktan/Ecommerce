import { useGetProductsQuery } from "./products.api";
import AppCard from "../../ui/AppCard/AppCard";
import { useGetCategoriesQuery } from "../Categories.api";
import { Skeleton } from "../../../admin/AdminUi/Skeleton/Skeleton";
import {  useNavigate } from "react-router-dom";

interface CardTypes {
  _id: string;
  title: string;
  price: string;
  images: string | string[];
}
interface categoryTypes {
  _id?: string;

  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: categories, isLoading: loading } = useGetCategoriesQuery({});
  const navigate = useNavigate();

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  //setup for isLoading state..
  if(isLoading){
    return ;
  }

  return (
    <div className="w-screen h-screen text-8xl  ">
      <div className="flex flex-wrap gap-3">
        {Array.isArray(categories?.category) &&
          categories.category.map((category: categoryTypes) => (
            <div
              key={ category._id}
              className="border rounded-md px-5 py-1"
            >
              {loading ? (
                <Skeleton width="w-24" height="h-8" animation="pulse" />
              ) : (
                <p className="text-sm">{category.name}</p>
              )}
            </div>
          ))}
      </div>
      <div className="grid grid-cols-4 mt-2">
        {Array.isArray(data?.products) && data.products?.length > 0 && (
          data?.products.map((item: CardTypes) => (
            <div key={item._id} className="text-sm ">
              <AppCard
                title={item.title}
                price={item.price}
                image={item.images[0]}
                onClick={() => handleProduct(item._id)}
              />
            </div>
          ))
        ) }
      </div>
    </div>
  );
};

export default Products;
