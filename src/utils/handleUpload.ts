import * as React from "react"

import storage from "@/utils/firebase"
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const useUpload = (prod: boolean) => {
  const [image, setImage]: any = React.useState()
  const [url, setUrl]: any = React.useState("")
  const upload = async (nxt: any) => {
    if (!upload) return
    const id = v4()
    const storageRef = ref(
      storage,
      `${prod ? "prodImages/" : "catImages"}/${image.name + id}`
    )
    await uploadBytes(storageRef, image)
      .then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          setUrl(url)
          console.log(url)
          localStorage.setItem("img", String(url))

          await nxt(url)
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return { image, setImage, upload, url, setUrl }
}

export default useUpload
