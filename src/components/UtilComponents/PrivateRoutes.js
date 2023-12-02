import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Login from "../Signin";

export default function PrivateRoutes() {
    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Login />
}
