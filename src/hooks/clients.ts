import { useState } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { Mail } from "@/types/client"
const useClient = () => {
  //send email

  const [mailData, setMail] = useState<Mail>({
    subject: "",
    message: "",
  })
  const handleChanges = (e: any) => {
    setMail({
      ...mailData,
      [e.target.name]: e.target.value,
    })
  }

  const sendMail = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    if (!id) {
      throw new Error("Error getting the id ")
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND}/clients/broadcast/${id}`,
        mailData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((r: AxiosResponse) => {
        if (r.status === 200) {
          toast.success("Done braodcasting the mails")
          window.history.back()
        }
      })
      .catch((e: AxiosError) => {
        toast.error("Internal Error")
      })
  }

  const [clients, setClient] = useState([])

  const fetchClient = async (token: string, id: string) => {
    if (!token) {
      throw new Error("Error getting the token")
    }
    if (!id) {
      throw new Error("Error getting the id ")
    }

    await axios(`${process.env.NEXT_PUBLIC_BACKEND}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r: AxiosResponse) => {
        setClient(r.data)
      })
      .catch((e: AxiosError) => {
        toast.error(e.response?.data as string)
      })
  }

  return {
    clients,
    fetchClient,

    sendMail,
    mailData,
    handleChanges,
  }
}

export default useClient
