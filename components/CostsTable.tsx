'use client'

import { ConfirmDelete } from "./ConfirmDelete"

import { useState } from "react"
import CostsEntry from "./CostsEntry";

interface CostsDataType {
  _id?: string; // Opcional, se agrega al recuperar de la DB
  // userId: string; // Aunque en el esquema es ObjectId, en TS se suele manejar como string
  Mes: string;
  Sueldo_Cocina: number;
  Sueldo_Servicio: number;
  Sueldo_Administrativos: number;
  Alquiler: number;
  Depreciacion: number;
  Servicios_basicos: number;
  Publicidad: number;
  Internet: number;
  Otros: number;
  Total_Costos: number;
  // createdAt?: string; // Opcional, se convierte a string al usarlo en frontend
}

interface InformesTableProps {
    costsData: CostsDataType[]; 
    refreshButtonAction: () => void;
}


function CostsTable({ costsData, refreshButtonAction }: InformesTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [costsId, setCostsId] = useState<string>('')
    const [costsDataProps, setCostsDataProps] = useState({})

    const updateButton = (_id: string, costs: CostsDataType) => {
        setCostsId(_id)
        setCostsDataProps(costs)
        setShowEditModal(prev => true)
    }

    const openModal = (_id: string) => {
        setCostsId(_id)
        setShowDeleteModal(prev => true)
    }

    const deleteCosts = async (_id: string) => {
        try {
            const response = await fetch(`/api/costs?id=${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el informe');
            }
            
            refreshButtonAction()
        
        } catch (error) {
            console.error('Error en deleteInform:', error);
            throw error;
        }
    }


    return (
    <>
        <table className='table'>
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
                <th>Total</th>
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
                <td>{costs.Total_Costos  || ''}</td>
                <td><button className='btn' onClick={() => updateButton( costs._id, costs)}>Editar</button></td>
                <td><button className='btn' onClick={() => openModal(costs._id)}>Eliminar</button></td>
            </tr>
            ))}
        </tbody>
    </table>

    {showDeleteModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
           <ConfirmDelete objectId={costsId} deleteFunction={deleteCosts} setShowModal={setShowDeleteModal} /> 
        </div>
    )}

    {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
            <CostsEntry costsDataProps={costsDataProps} costsId={costsId} setShowModal={setShowEditModal} refreshButton={refreshButtonAction} edit={true}/>
        </div>
    )}

    </>
  )
}

export default CostsTable
