"use client";

import { useInform } from "../context";
import InformesResults from "@/components/InformesResults";

export default function InformesResultsPage () {
  const { informData } = useInform();

  if (!informData) {
    return <p>Cargando informe...</p>;
  }


    const nombresPlatos = ['Plato 1', 'Plato 2'] //data temporal 

    const informDataTable = [nombresPlatos, informData.results]

    return (
        <div>

                <h2 className="text-2xl font-bold">Resultados del Informe</h2>
            <p><strong>Mes:</strong> {informData.Mes_informes}</p>
            <p><strong>Categoría:</strong> {informData.Informes_category}</p>

            <h3 className="text-xl mt-4">Resultados:</h3>
                <InformesResults informesData={informDataTable} />


        </div>
    )
}
