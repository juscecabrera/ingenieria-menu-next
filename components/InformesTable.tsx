'use client'

import { useRouter } from "next/navigation";
import { useInform } from "@/app/(private)/informes/context";
import { useState } from "react";
import { ConfirmDelete } from "./ConfirmDelete";

interface informesDataType {
    _id: string
    Mes_informes: string
    Informes_category: string
    results: any
    createdAt: Date | string; 
}

interface InformesTableProps {
    informesData: informesDataType[];
    refreshButtonAction: () => void;
}

export const InformesTable:React.FC<InformesTableProps> = ({ informesData, refreshButtonAction }) => {
  const { setInformData } = useInform();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false)
  const [informId, setInformId] = useState<string>('')

    const goInform = (inform: any) => {
        setInformData(inform)

        router.push('/informes/results')
    }

    const openModal = (_id: string) => {
        setShowModal(prev => true)
        setInformId(_id)
    }

    const deleteInform = async (_id: string) => {
        try {
            const response = await fetch(`/api/informes?id=${_id}`, {
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
            throw error; // Maneja el error como prefieras
        }
    }

    const formatDate = (isoDate: string | Date) => {
        const date = new Date(isoDate);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses empiezan en 0
        const year = date.getUTCFullYear();

        return `${day}-${month}-${year}`;
    };


    return (
    <>
        <table className="table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Mes</th>
                    <th>Categoría</th>
                    <th>Fecha de creacion</th>
                </tr>
            </thead>
            <tbody>
                {informesData?.map((inform, index) => (
                    <tr key={index}>
                        <th>{index + 1 || ''}</th>
                        <td>{inform.Mes_informes || ''}</td>
                        <td>{inform.Informes_category || ''}</td>
                        <td>{inform.createdAt ? formatDate(inform.createdAt) : '' }</td>
                        <td><button className="btn" onClick={() => goInform(inform)}>Ver</button></td>
                        <td><button className="btn" onClick={() => openModal(inform._id)}>Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

        {showModal && (

        <div className='fixed top-0 left-0 w-full h-full bg-black/20 flex justify-center items-center z-50'>
           <ConfirmDelete objectId={informId} deleteFunction={deleteInform} setShowModal={setShowModal} /> 
        </div>
        )}
    </>
    )
}
