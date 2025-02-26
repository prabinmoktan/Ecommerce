import { Skeleton } from "../../../admin/AdminUi/Skeleton/Skeleton";

const CartLoader = () => {
  return (
    <>
      <div className="flex justify-between items-center  border-b border-black px-10">
        <div>
          <Skeleton
            variant="text"
            width="w-36"
            animation="pulse"
            height="h-10"
          />
          <Skeleton
            variant="text"
            width="w-20"
            animation="pulse"
            height="h-9"
          />{" "}
          <div className="flex items-center justify-between px-3 py-1 my-7 border rounded-2xl w-20 ">
          <Skeleton
            variant="rect"
            width="w-36"
            animation="pulse"
            height="h-10"
            className="rounded-2xl"
          />
           
          </div>
        </div>
        <div className="py-2">
        <Skeleton
            variant="text"
            width="w-40"
            animation="pulse"
            height="h-46"
          />
        </div>
      </div>
    </>
  );
};

export default CartLoader;
