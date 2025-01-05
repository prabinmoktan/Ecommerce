/* eslint-disable @typescript-eslint/ban-ts-comment */
import AppText from "../../../ui/AppForm/AppText/AppText";
import { Controller, useForm } from "react-hook-form";
import AppButton from "../../../ui/AppButton/AppButton";
import { userSchema } from "../../../Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginTypes } from "../../../interface";
import { useLoginUserMutation } from "../AuthApi/user.api";
import { useNavigate } from "react-router-dom";
  import { useDispatch} from "react-redux";
import { login } from "../AuthSlice/Auth.slice";


const Login = () => {
  const dispatch = useDispatch();
  const [loginUser,{isLoading}] = useLoginUserMutation();
  const navigate = useNavigate();
  const {control,handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      email: '', 
      password: ''
    },
    resolver: zodResolver(userSchema)
  })
  const onSubmit= async(data: LoginTypes) => {
    try {
      const response =await loginUser(data);
      console.log(response);
      // const accessToken = response.data?.accessToken;
      // const refreshToken = response.data?.refreshToken;
      dispatch(login({
        accessToken: response.data?.accessToken || '',
        // @ts-ignore
        user: response.data?.loggedInUser || []
      }))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
   
    
    // if(response.data?.success === true){
    //   if (refreshToken) {
    //     if (refreshToken) {
    //       Cookies.set('refreshToken', refreshToken, {path: '/', expires: 7,secure: true } );
    //     }
    //     if (accessToken) {
    //       Cookies.set('accessToken', accessToken, {path: '/', expires: 1/24, secure: true, });
    //     }
    //   }
    // }
    
  }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        

        <div className="w-1/3  border-2 border-zinc-500 rounded-md py-5 px-3">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">

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
          <div className="   text-center flex justify-center">
            <AppButton title={isLoading ? 'Loggin in...' : 'Login'} background="primary" type="submit"/>
          </div>
              </form>
        </div>
              
      </div>
    </>
  );
};

export default Login;
