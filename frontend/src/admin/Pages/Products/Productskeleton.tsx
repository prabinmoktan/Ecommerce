
import { Skeleton } from "../../AdminUi/Skeleton/Skeleton";

const Productskeleton = () => {
  return (
    <>
    {[...Array(5)].map((_,index) => (
        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} animate-pulse`}>
          <td className="px-4 py-2 border-gray-300 flex gap-4  items-center">
            
              <Skeleton
                variant="rect"
                width="w-12"
                height="h-16"
                animation="pulse"
              />
              <Skeleton
                variant="text"
                width="w-44 "
                height="h-8"
                animation="pulse"
              />
            
          </td>
          <td className="px-4 py-2 border-gray-300">
            <Skeleton 
              variant="text" 
              width="w-28" 
              height="h-8" 
              animation="pulse" 
            />
          </td>
          <td className="px-4 py-2 border-gray-300">
            <Skeleton 
              variant="text" 
              width="w-28" 
              height="h-8" 
              animation="pulse" 
            />
          </td>
          <td className="px-4 py-2 border-gray-300">
            <Skeleton 
              variant="text" 
              width="w-28" 
              height="h-8" 
              animation="pulse" 
            />
          </td>
          <td className="px-4 py-2 border-gray-300 flex gap-4">
           
              <Skeleton 
                variant="text" 
                width="w-8" 
                height="h-8" 
                animation="pulse" 
              />
              <Skeleton 
                variant="text" 
                width="w-8" 
                height="h-8" 
                animation="pulse" 
              />
           
          </td>
        </tr>
      ))}
    </>
  );
};

export default Productskeleton;
