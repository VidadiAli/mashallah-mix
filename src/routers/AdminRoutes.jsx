import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Admin from '../app/admin/pages/Admin'
import Musics from '../app/admin/pages/Musics'
import AddMusic from '../app/admin/components/AddMusic'
import Profile from '../app/admin/components/Profile'
import ChangePassword from '../app/admin/components/ChangePassword'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />}>
                <Route index element={<Musics />} />
                <Route path="add-music" element={<AddMusic />} />
                <Route path="profile" element={<Profile />} />
                <Route path='changePassword' element={<ChangePassword />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes