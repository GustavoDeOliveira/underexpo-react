import React from 'react'
import { Outlet } from 'react-router-dom'

export const Perfil = () => {
  return (
    <div>
        <h1>Perfil</h1>
        <Outlet />
    </div>
  )
}
