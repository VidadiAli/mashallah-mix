import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateAdmin from '../app/admin/CreateAdmin'
import Login from '../app/admin/Login'
import AdminRoutes from './AdminRoutes'
import Main from '../app/user/components/Main'

const Routers = () => {
    return (
        <Routes>
            <Route path="/create-admin" element={<CreateAdmin />} />
            <Route path="/login-admin" element={<Login />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path='/' element={<Main/>} />
            <Route path='/likeds' element={<Main/>} />
            <Route path='/artists' element={<Main/>} />
            <Route path='/my-lists' element={<Main/>} />
        </Routes>
    )
}

export default Routers