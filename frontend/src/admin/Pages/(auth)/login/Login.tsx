/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginUserMutation } from "../AuthApi/user.api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../AuthSlice/Auth.slice";
import { userSchema } from "../../../../Schema";
import { LoginTypes } from "../../../../interface";
import AppText from "../../../AdminUi/AppForm/AppText/AppText";
import AppButton from "../../../AdminUi/AppButton/AppButton";
import { successToast } from "../../../../services/toastify.service";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [backendError, setBackendError] = useState<string | undefined>()
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data: LoginTypes) => {
    try {
      const res = await loginUser(data);
      
      if(res.data?.success === true){
        if(res.data?.loggedInUser){
          dispatch(login({
             // @ts-ignore
            user: res.data?.loggedInUser,
          }))
          // @ts-ignore
          successToast(`welcome ${res.data.loggedInUser.firstName}`)
        }
        navigate('/admin/dashboard');
    }else{
      // @ts-ignore
      console.log(res?.error?.data?.message);
         // @ts-ignore
      setBackendError(res?.error?.data?.message)
    }
    } catch (error) {
      console.log(error)
    }
}

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-1/3  border-2 border-zinc-500 rounded-md py-5 px-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <AppText
                    display="column"
                    autoComplete="email"
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
                    autoComplete="current-password"
                    placeholder={backendError}
                    backendError={backendError}
                  />
                )}
              />
            </div>
            <div className="flex justify-end">
              <Link to={"/auth/register"} className="text-xs float-start">
                Don't have an account?
                <span className="relative inline-block group">
                  Register here..
                  <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-700 scale-x-0 transition-transform duration-2000 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </div>

            <div className="   text-center flex justify-center">
              <AppButton
                title={isLoading ? "Loggin in..." : "Login"}
                background="primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
