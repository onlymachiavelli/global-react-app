import { useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-hot-toast"

import { CreateBusiness } from "@/types/business"
import { signOut } from "next-auth/react"

const useBusiness = () => {
  const [createData, setCreateData] = useState<CreateBusiness>({
    name: "",
    address: "",
    category: "",
    description: "",
    email: "",
    phone: "",
  })

  const handleDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    })
  }

  const create = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }
    try {
      const createRes: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/business`,
        createData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (createRes.status === 200) {
        toast.success("Done creating the business")
        window.location.href = "/dashboard/business"
      } else {
        toast.error(createRes.data.message || "Something went wrong")
      }

      if (createRes.status === 401) await signOut()
    } catch (e: any) {
      toast.error(e.message)
    }
  }
  const [businesses, setBusinesses]: any = useState([])
  const getMine = async (token: string) => {
    if (!token) {
      throw new Error("Token is required")
    }

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND}/business`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r: AxiosResponse) => {
        setBusinesses(r.data)
        toast.success("Done fetching the businesses")
      })
      .catch((e: AxiosError) => {
        toast.error(e.message)
      })
  }

  const [business, setBusiness]: any = useState([])
  const getOne = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    await axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/business/one/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r: AxiosResponse) => {
        setBusiness(r.data?.business)
      })
      .catch((e: AxiosError) => {
        toast.error(e.message)
      })
  }

  return {
    create,
    handleDataInput,
    createData,

    //fetch all data
    businesses,
    setBusinesses,
    getMine,

    getOne,
    business,
  }
}

export default useBusiness
