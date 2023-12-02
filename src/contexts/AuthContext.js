import { React, createContext, useContext, useState, useEffect } from "react"
import { auth, provider } from "../firebase"
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [profilePic, setProfilePic ] = useState()
  const [name, setName] = useState()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function signInGoogle() {
    const googleProvider = provider()
    auth.signInWithPopup(googleProvider)
  }

  // Returns the signed-in user's display name.
  function getUserName() {
    return currentUser.displayName || currentUser.email;
  }

  // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
    return currentUser.photoURL || '/images/profile_placeholder.png';
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signInGoogle,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
