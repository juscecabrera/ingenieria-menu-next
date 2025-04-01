'use client'

import { useRouter } from "next/navigation";
import { useInform } from "@/app/(private)/informes/context";
import { formatDynamicAPIAccesses } from "next/dist/server/app-render/dynamic-rendering";

interface informesDataType {
    Mes_informes: string
    Informes_category: string
    results: any
    createdAt: Date | string; 
}

interface InformesTableProps {
    informesData: informesDataType[];
}

export const InformesTable:React.FC<InformesTableProps> = ({ informesData }) => {
  const { setInformData } = useInform();
  const router = useRouter();


    const goInform = (inform: any) => {
        setInformData(inform)

        router.push('/informes/results')
    }


    const deleteInform = (inform: any) => {
        // hacer llamado al api para hacer el delete 
       return
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
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {informesData?.map((inform, index) => (
                    <tr key={index}>
                        <th>{index + 1 || ''}</th>
                        <td>{inform.Mes_informes || ''}</td>
                        <td>{inform.Informes_category || ''}</td>
                        <td>
                        {/*
                        {inform.createdAt instanceof Date
                            ? inform.createdAt.toLocaleDateString() || '' // Formatea la fecha
                            : inform.createdAt || ''} {/* Si ya es string, lo muestra directamente */}

                            {inform.createdAt ? formatDate(inform.createdAt) : '' }


                        </td>
                        <td><button className="btn" onClick={() => goInform(inform)}>Ver</button></td>
                        <td><button className="btn" onClick={() => deleteInform(inform)}>Eliminar</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    )
}
