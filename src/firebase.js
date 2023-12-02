import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { GoogleAuthProvider } from 'firebase/auth'

const app = firebase.initializeApp ({
    apiKey:"",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "164249367439",
    appId: ""
})

export const auth = app.auth()
export const provider = () => {
    return new GoogleAuthProvider()
} 
export default app
