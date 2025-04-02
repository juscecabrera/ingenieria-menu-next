'use client'

import { ConfirmDelete } from "./ConfirmDelete"

import { useState } from "react"
import PlatesEntry from "./PlatesEntry"

interface platesDataType {
  _id: string
  Mes_plato: string
  Categoria_plato: string
  Nombre_plato: string
  Cantidad_vendida_plato: number
  Costo_plato: number
  Precio_plato: number
  Dias_plato: number
  Valor_Venta: number
  Rentabilidad: number
  Rentabilidad_total: number
  Ventas_total: number
}

interface PlatesTableProps {
  platesData: platesDataType[];
  refreshButtonAction: () => void
}

const PlatesTable: React.FC<PlatesTableProps> = ({ platesData, refreshButtonAction }) => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [platesId, setPlatesId] = useState<string>('')
    const [platesDataProps, setPlatesDataProps] = useState({})

    const updateButton = (_id: string, plates: platesDataType) => {
        setPlatesId(_id)
        setPlatesDataProps(plates)
        setShowEditModal(prev => true)
    }

    const openModal = (_id: string) => {
        setPlatesId(_id)
        setShowDeleteModal(prev => true)
    }

    const deletePlate = async (_id: string) => {
        try {
            const response = await fetch(`/api/plates?id=${_id}`, {
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
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Cantidad Vendida</th>
            <th>Precio</th>
            <th>Costo</th>
            <th>Días</th>
            <th>Valor Venta</th>
            <th>Rentabilidad</th>
            <th>Rentabilidad Total</th>
            <th>Ventas Totales</th>
          </tr>
        </thead>
        <tbody>
          {platesData?.map((plate, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{plate.Mes_plato}</td>
              <td>{plate.Categoria_plato}</td>
              <td>{plate.Nombre_plato}</td>
              <td>{plate.Cantidad_vendida_plato}</td>
              <td>{plate.Precio_plato}</td>
              <td>{plate.Costo_plato}</td>
              <td>{plate.Dias_plato}</td>
              <td>{plate.Valor_Venta}</td>
              <td>{plate.Rentabilidad}</td>
              <td>{plate.Rentabilidad_total}</td>
              <td>{plate.Ventas_total}</td>
              <td><button className='btn' onClick={() => updateButton(plate._id, plate)}>Editar</button></td>
              <td><button className='btn' onClick={() => openModal(plate._id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>


    {showDeleteModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
           <ConfirmDelete objectId={platesId} deleteFunction={deletePlate} setShowModal={setShowDeleteModal} /> 
        </div>
    )}

    {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
            <PlatesEntry platesDataProps={platesDataProps} platesId={platesId} setShowModal={setShowEditModal} refreshButton={refreshButtonAction} edit={true}/>
        </div>
    )}
    </>
  );
};

export default PlatesTable;
