import React from 'react'

function CostsTable({ costsData }: any) {
    
    const updateButton = () => {
        alert('voy a llevarte pa pr')
    }



    const deleteButton = () => {
        return
    }

    return (
    <>
        <table className='table table-lg w-1/2'>
        <thead>
            <tr>
                <th>Código</th> 
                <th>Mes</th> 
                <th>Sueldo Cocina</th>
                <th>Sueldo Servicio</th>
                <th>Sueldo Administrativos</th>
                <th>Alquiler</th>
                <th>Depreciación</th>
                <th>Servicios Básicos</th>
                <th>Publicidad</th>
                <th>Internet</th>
                <th>Otros</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {costsData?.map((costs: any, index: number) => (
            <tr key={index}>
                <th>{index + 1 || ''}</th> {/*Este es el id artificial solamente para aspectos esteticos, NO es el mismo que en las tablas de MySQL */}
                <td>{costs.Mes  || ''}</td>
                <td>{costs.Sueldo_Cocina  || ''}</td>
                <td>{costs.Sueldo_Servicio  || ''}</td>
                <td>{costs.Sueldo_Administrativos  || ''}</td>
                <td>{costs.Alquiler  || ''}</td>
                <td>{costs.Depreciacion  || ''}</td>
                <td>{costs.Servicios_basicos  || ''}</td>
                <td>{costs.Publicidad  || ''}</td>
                <td>{costs.Internet  || ''}</td>
                <td>{costs.Otros  || ''}</td>
                <td><button className='' onClick={() => updateButton()}>Actualizar</button></td>
                <td><button onClick={() => deleteButton()}>Eliminar</button></td>
            </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default CostsTable
