import { useState } from "react";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../Products/products.api";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { CiShoppingCart } from "react-icons/ci";
import { Skeleton } from "../../../admin/AdminUi/Skeleton/Skeleton";
import RecommendationCards from "../../Components/RecommendationCards/RecommendationCards";
import "./productData.css";

const ProductData = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const { isLoading, data } = useGetProductByIdQuery(id);
  const { data: productData, isLoading: isOpening } = useGetProductsQuery({});
  console.log(data, data)
  const product = data?.product;
console.log(product)

  return (
    <>
      <div className="flex justify-between w-screen gap-4 px-10 container">
        <div className="w-full imageContainer flex gap-3">
          <div className=" imageThumb " >
            {product?.images.map((image: string, index: number) => (
              <img
                src={image}
                alt="..."
                key={index}
                className="bg-black max-h-[120px] max-w-[90px] cursor-pointer "
                onClick={() => setSelectedImage(image)}
                loading="lazy"
              />
            ))}
          </div>

          {isOpening ? (
            <Skeleton width="w-96" height="h-96" animation="pulse" />
          ) : (
            <img
              src={selectedImage || product?.images[0]}
              alt="..."
              className="max-h-[600px] max-w-[600px] min-w-[300px] min-h-[300px] productImage"
              loading="lazy"
            />
          )}
        </div>

        <div className=" w-full flex flex-col gap-3 ">
          {isLoading ? (
            <Skeleton
              width="w-44"
              height="h-10"
              animation="pulse"
              variant="text"
            />
          ) : (
            <h1 className="text-3xl font-bold">{product?.title}</h1>
          )}
          {isLoading ? (
            <Skeleton
              width="w-12"
              height="h-8"
              animation="pulse"
              variant="text"
            />
          ) : (
            <h1 className="text-gray-400">${product?.price}</h1>
          )}
          <div className="cartButton">
            <Button
              title="Add to Cart"
              icon={<CiShoppingCart />}
              bg="bg-black"
            />
          </div>
          <h1>Description:</h1>
          {isLoading ? (
            <Skeleton
              animation="pulse"
              variant="text"
              width="w-96"
              height="h-20"
            />
          ) : (
            <p className="text-justify text-gray-500">{product?.description}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <RecommendationCards
          recommendations={productData?.products}
          category={data?.product?.category?.name}
        />
      </div>
    </>
  );
};

export default ProductData;

