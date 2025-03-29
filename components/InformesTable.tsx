
interface informesDataType {
    Mes_informes: string
    Informes_category: string
    createdAt: Date | string; //ver si esto llega o no
}

interface InformesTableProps {
    informesData: informesDataType[];
}

const InformesTable:React.FC<InformesTableProps> = ({ informesData }) => {
    return (
    <>
        <table>
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
                        <th>{index + 1}</th>
                        <td>{inform.Mes_informes}</td>
                        <td>{inform.Informes_category}</td>
                        <td>
                        {inform.createdAt instanceof Date
                            ? inform.createdAt.toLocaleDateString() // Formatea la fecha
                            : inform.createdAt} {/* Si ya es string, lo muestra directamente */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    )
}
