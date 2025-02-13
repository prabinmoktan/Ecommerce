
import { useState } from "react";
import { useGetProductByIdQuery } from "../Products/products.api";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { CiShoppingCart } from "react-icons/ci";


const ProductsData = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState('');
  const { isLoading, data } = useGetProductByIdQuery(id);
  const product = data?.product;
  console.log(isLoading);
  console.log(product);
  return (
    <>
      <div className="flex justify-between w-screen gap-4 px-10">
        <div className="w-full ">

          <div className="flex gap-1">
            <div className="flex flex-col gap-2">

            {/* <AppCarousel items={}/> */}
            {product?.images.map((image: string, index: number) => (
              <img src={image} alt="" key={index} className="bg-black max-h-[150px] max-w-[100px] cursor-pointer" onClick={()=>setSelectedImage(image)} loading="lazy"/>
            ))}
            </div>
            <img src={selectedImage || product?.images[0] } alt="..." className="max-h-[600px] max-w-[600px]" loading="lazy"/>
            
          </div>

         
        </div>
        <div className=" w-full flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <h1 className="text-gray-400">
            ${product?.price}
          </h1>
          <div >
            <Button title="Add to Cart" icon={<CiShoppingCart/>} bg="bg-black"/>
          </div>
          <h1>
            Description:
          </h1>
          <p className="text-justify text-gray-500">
            {product?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductsData;
