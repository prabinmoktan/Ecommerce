import { Controller, useForm } from "react-hook-form";
import AppText from "../../../ui/AppForm/AppText/AppText";
import AppSelect from "../../../ui/AppForm/AppSelect/AppSelect";
import AppButton from "../../../ui/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../Schema";
import { RegisterTypes } from "../../../interface";
import { useCreateUserMutation } from "../AuthApi/user.api";
import { useNavigate } from "react-router-dom";

const options = [
  { name: "Male", id: "Male" },
  { name: "Female", id: "Female" },
  { name: "Other", id: "Other" },
];

const Register = () => {
const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async(data: RegisterTypes) => {
    try {
      await createUser(data).unwrap();
      navigate('/admin/login')
    } catch (error) {
      console.log(error)
    }
   
  };
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-1/3 border-2 border-zinc-500 rounded-md py-7 px-5">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    title="First Name"
                    {...field}
                    error={errors.firstName?.message?.toString()}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    title="Last Name"
                    {...field}
                    error={errors.lastName?.message?.toString()}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    title="Email"
                    {...field}
                    error={errors.email?.message?.toString()}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    title="Password"
                    {...field}
                    error={errors.password?.message?.toString()}
                    type="password"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    title="Confirm Password"
                    {...field}
                    error={errors.confirmPassword?.message?.toString()}
                    type="password"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <AppSelect
                    display="flex gap-10"
                    title="Gender"
                    {...field}
                    error={errors.gender?.message?.toString()}
                    options={options}
                  />
                )}
              />
            </div>

            <div className="text-center flex justify-center">
              <AppButton title="Register" background="primary" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
