/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppButton from "../../AdminUi/AppButton/AppButton";

import { useForm, Controller } from "react-hook-form";
import AppText from "../../AdminUi/AppForm/AppText/AppText";
import AppTextArea from "../../AdminUi/AppForm/AppTextArea/AppTextArea";
import AppSelect from "../../AdminUi/AppForm/AppSelect/AppSelect";
import AppFileField from "../../AdminUi/AppForm/AppFileField/AppFileField";
import { AddProductDefaultValues } from "../../../defaultValues";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../redux/ModalSlice";
import { useDispatch } from "react-redux";
import { useCreateProductsMutation } from "../Products/products.api";
import { useGetCategoryQuery } from "../Products/category.api";
import {  successToast } from "../../../services/toastify.service";
import { Oval } from "react-loader-spinner";

const AddProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenmodal = () => {
    dispatch(
      openModal({
        title: "Add category",
        save: "save",
        cancel: "cancel ",
        showController: true,
      })
    );
  };

  const { data } = useGetCategoryQuery({});
  const [createProducts, { isLoading: isCreating }] =
    useCreateProductsMutation();

  const options = data?.category || [];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: AddProductDefaultValues,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = async (data: any) => {
    const formData = new FormData();
    // Append text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    // Append files
    if (Array.isArray(data.images)) {
      data.images.forEach((image: File) => {
        formData.append("images", image); // Each file is appended separately
      });
    }

    try {
      // @ts-ignore
      const response = await createProducts(formData).unwrap();
      console.log(response);
      successToast(response.message);
      navigate("/admin/products");
    } catch (error) {
      console.log("error==>", error);
    }
  };
  return (
    <>
    {isCreating && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 w-screen h-screen">
          <Oval visible={true}
      height="80"
      width="80"
      color="white"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""/>
        </div>
        }
      <div className="w-full h-screen dark:bg-gray-900 px-5 overflow-hidden">
       

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex space-between w-full  gap-4 rounded-md my-2 h-full">
            <div className=" w-full h-full px-5 py-3 ">
              <div className="border border-gray-200 px-5 py-3 rounded-md flex flex-col gap-3 ">
                <h1 className="text-2xl dark:text-gray-200">General Information</h1>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <AppText
                      display="column"
                      title="Product Name"
                      {...field}
                      error={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <AppTextArea
                      title="description"
                      cols={4}
                      rows={6}
                      {...field}
                      display="column"
                    />
                  )}
                />
              </div>
              <div className="border border-gray-200 px-5 py-3 rounded-md flex flex-col gap-3 mt-5">
                <h1 className="text-xl dark:text-gray-200">Pricing</h1>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <AppText
                      display="column"
                      title="Price"
                      {...field}
                      error={errors.price?.message}
                    />
                  )}
                />
              </div>
              <div className="border border-gray-200 px-5 py-3 rounded-md flex flex-col gap-3 mt-5">
                <h1 className="text-xl dark:text-gray-200">Inventory</h1>
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <AppText
                      display="column"
                      title="Quantity"
                      {...field}
                      error={errors.stock?.message}
                    />
                  )}
                />
              </div>
            </div>
            <div className="h-full  w-full flex flex-col gap-5">
              <div className="border border-gray-200 px-5 py-5 rounded-md flex flex-col gap-5 mt-3 w-full h-1/3 ">
                <h1 className="text-xl dark:text-gray-200">Product Media</h1>
                <div className="bg-gray-100  border-dashed  border-gray-200 rounded-md w-full h-full py-3">
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                      <AppFileField
                        id="image"
                        label={
                          Array.isArray(field.value) && field.value.length > 0
                            ? "Select More Images"
                            : "Select Image"
                        }
                        onFileChange={(files) => {
                          field.onChange(files);
                        }}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="border border-gray-200 px-5 py-5 rounded-md  mt-3 w-full ">
                <AppButton
                  title="Add Category"
                  onClick={handleOpenmodal}
                  type="button"
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <AppSelect
                      display="flex flex-col"
                      title="Category"
                      {...field}
                      error={errors.category?.message}
                      options={options}
                    />
                  )}
                />
              </div>
              <div className="flex justify-evenly  absolute bottom-0 right-0 gap-5 mb-10 mr-10">
                <AppButton
                  title={isCreating ? "loading..." : "save"}
                  type="submit"
                  background="primary"
                  disabled={isCreating}
                />
                <AppButton
                  title="cancel"
                  type="submit"
                  background="danger"
                  onClick={() => navigate("/admin/products")}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
