import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAodQ1Kz2YcGZzUeehJ0llrS-GytqLr3i4",
  authDomain: "global-ae56f.firebaseapp.com",
  projectId: "global-ae56f",
  storageBucket: "global-ae56f.appspot.com",
  messagingSenderId: "152297262719",
  appId: "1:152297262719:web:cd7dd634107828a556f94a",
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export default storage
