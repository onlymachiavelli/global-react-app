import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Login, SignUp } from "@/types/account"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

const useAccount = () => {
  //login session
  const [loginData, setLogin] = useState<Login>({
    email: "",
    password: "",
  })

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const login = async () => {
    if (!loginData.email || !loginData.password) {
      return toast.error("Please fill all fields")
    }

    try {
      const loginAttempt: any = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      })

      console.log({ loginAttempt })

      if (loginAttempt.ok) {
        toast.success("Logged in successfully")
        window.location.href = "/dashboard"
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (e: any) {
      toast.error(e.response.data.message || "Something went wrong")
    }
  }

  //sign up section

  const [signUp, setSignUp] = useState<SignUp>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
  })

  const handleSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    })
  }

  const signup = async () => {
    console.log({ signUp })
    try {
      const res: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/me`,
        signUp
      )

      console.log(res)

      if (res.status === 200) {
        toast.success("Done creating the Admin")
      } else {
        toast.error(res.data)
      }
    } catch (e: any) {
      toast.error(
        e.response.data.message || "Internal error, please report that"
      )
    }
  }

  return {
    //export any sign up data
    signUp,
    handleSignupForm,
    signup,

    //exporting login data
    handleLoginForm,
    login,
    loginData,
  }
}

export default useAccount
