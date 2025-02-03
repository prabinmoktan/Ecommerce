import React from "react";
import { useGetProductsQuery } from "./products.api";
import AppCard from "../../ui/AppCard/AppCard";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  console.log(isLoading);
  return (
    <div className="w-screen h-screen text-8xl  ">
      <div className="flex gap-4 flex-wrap ">

      {
        data && data.products?.length > 0 && 
        data.products.map((item)=> (
          <div key={item.id} className="text-sm flex-1">

            <AppCard title={item.title} price={item.price} image={item.images[0]} />
          </div>
         
        ))
      }
      </div>
    </div>
  );
};

export default Products;
