import AppButton from "../../ui/AppButton/AppButton";
import { IoAdd } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import AppText from "../../ui/AppForm/AppText/AppText";
import ToggleDarkmode from "../../components/ToggleDarkmode/ToggleDarkmode";
import AppTextArea from "../../ui/AppForm/AppTextArea/AppTextArea";

const Products = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", description: "" } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="w-full h-screen dark:bg-gray-900 px-10">
        <div>
          <ToggleDarkmode />
        </div>
        <div>
          <AppButton title="Add Products" icon={<IoAdd />} />
        </div>
        <div className="flex space-between w-full border border-red-700 gap-4 rounded-md mt-10">
          <div className="border-gray-500 border-2 w-full">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div>

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
                </div>
                <div>

              <Controller
              name= 'description'
              control={control}
              render={({field}) => (
                <AppTextArea title="description" cols={4} {...field} display="column"/>
              )}
              
              />
              </div>
              <AppButton title="Add Product" type="submit" />
            </form>
          </div>
          <div className="h-full border-gray-500 border-2 w-full">
            this is image secrtion
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
