'use client'

import { useState } from "react"


const AccountPage = () => {
    const [userData, setUserData] = useState({
        'Nombre': '',
        'Apellido': '',
        'Correo': '',
        'Contraseña': '',
        'Foto': ''
    })

    const handleChange = () => {
        return
    }
    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl">Cuenta</h2>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Nombre</legend>
                <input
                    type="number"
                    className="input border border-black"
                    name='Sueldo_Cocina'
                    value={userData.Nombre || ''}
                    onChange={handleChange}
                />
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Apellido</legend>
                <input
                    type="number"
                    className="input border border-black"
                    name='Sueldo_Cocina'
                    value={userData.Apellido || ''}
                    onChange={handleChange}
                />
            </fieldset>


            <fieldset className="fieldset">
                <legend className="fieldset-legend">Correo</legend>
                <input
                    type="number"
                    className="input border border-black"
                    name='Sueldo_Cocina'
                    value={userData.Correo || ''}
                    onChange={handleChange}
                />
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Contraseña</legend>
                <input
                    type="number"
                    className="input border border-black"
                    name='Sueldo_Cocina'
                    value={userData.Contraseña || ''}
                    onChange={handleChange}
                />
            </fieldset>
        
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Foto</legend>
                <input
                    type="image"
                    className="input border border-black"
                    name='Sueldo_Cocina'
                    value={userData.Foto || ''}
                    onChange={handleChange}
                />
            </fieldset>

            </div>


    )
}

export default AccountPage
