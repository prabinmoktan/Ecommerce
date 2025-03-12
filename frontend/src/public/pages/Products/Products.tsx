import { useGetProductsQuery } from "./products.api";
import AppCard from "../../ui/AppCard/AppCard";
import { useGetCategoriesQuery } from "../Categories.api";
import { Skeleton } from "../../../admin/AdminUi/Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Cart/CartSlice";
import CardSkeleton from "../../ui/CardSkeleton/CardSkeleton";
import "./product.css";

// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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
  const dispatch = useDispatch();

  const handleProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  //setup for isLoading state..

  const handleAdd = (item: CardTypes) => {
    // dispatch({type: 'ADD_TO_CART', payload: _id})
    dispatch(addToCart(item));
  };

  return (
    <div className="w-screen h-full text-8xl px-5  ">
      <div className="flex flex-wrap gap-3">
        {Array.isArray(categories?.category) &&
          categories.category.map((category: categoryTypes) => (
            <div key={category._id} className="border rounded-md px-5 py-1">
              {loading ? (
                <Skeleton width="w-24" height="h-8" animation="pulse" />
              ) : (
                <p className="text-sm">{category.name}</p>
              )}
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center mt-3">
        <div className="productBox max-w-[1281px]">
          {isLoading
            ? Array(10)
                .fill(0)
                .map((_, index) => <CardSkeleton key={index} />)
            : Array.isArray(data?.products) &&
              data.products?.length > 0 &&
              data?.products.map((item: CardTypes) => (
                <div key={item._id} className="text-sm ">
                  <AppCard
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    onClick={() => handleProduct(item._id)}
                    addToCart={() => handleAdd(item)}
                  />
                </div>
              ))}
        </div>
      </div>
      {/* <Pagination items={items} /> */}
    </div>
  );
};

export default Products;
