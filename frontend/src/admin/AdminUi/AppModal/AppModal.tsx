/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import AppText from "../AppForm/AppText/AppText";
import AppButton from "../AppButton/AppButton";

import { successToast } from "../../../services/toastify.service";
import { useCreateCategoryMutation } from "../../Pages/Products/category.api";
import { useDeleteProductsMutation } from "../../Pages/Products/products.api";
import { closeModal } from "../../redux/ModalSlice";

const AppModal = () => {
  const { isOpen, content, showController } = useSelector(
    (state: any) => state.modal
  );
  const [createCategory] = useCreateCategoryMutation();
  const [deleteProduct] = useDeleteProductsMutation();
  const dispatch = useDispatch();
  //   if (!isOpen) return null;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
    },
  });
  const onSubmit = async (formData: any) => {
    await createCategory({ name: formData?.category });
    dispatch(closeModal());
  };
    const handleDelete = async(id: string) => {
      try {
        const response = await deleteProduct(id);
        if(response){
          successToast(response.data?.message || '')
        }

        dispatch(closeModal());
      } catch (error) {
        console.log(error)
      }
      
    }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-1/3  bg-zinc-700 text-white rounded-lg px-10 pt-5 pb-7 flex flex-col gap-5 justify-center">
            <div className="flex justify-center">
              {content.images && (
                <img
                  src={content.images}
                  alt={content.title}
                  className="w-24"
                />
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {showController && (
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <AppText
                      title="Category"
                      display={"column"}
                      {...field}
                      error={errors.category?.message}
                    />
                  )}
                />
              )}

              <div>
                <h1 className="text-lg text-center">{content.message}</h1>
              </div>
              <h1 className="text-center text-sm ">{content.title}</h1>
              <div className=" flex justify-center gap-10 mt-5">
                {showController ? (
                  <AppButton
                    title={content.save}
                    background="danger"
                    type="submit"
                  />
                )
                :
                <AppButton 
                title={content.delete}
                background="danger"
                onClick={()=> handleDelete(content.id)}
                type="button"
                />
              }
                <AppButton
                  onClick={() => dispatch(closeModal())}
                  title={content.cancel}
                  background="primary"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AppModal;
