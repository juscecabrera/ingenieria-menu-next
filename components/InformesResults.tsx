import React from 'react'

const InformesResults = ({ informesData }: any) => {
  
  const mes = 'Marzo'
  const categoria = 'Postres'

  const nombresPlato = informesData[0] || []

  const dataTable = informesData[1] || {}
  
  const omnes = dataTable.omnesResult || ''
  const BCG = dataTable.BCGResult || ''
  const ADL = dataTable.ADLResult || ''
  const IRP = dataTable.IRPResult || ''
  const indicePopularidad = dataTable.indicePopularidadResult || ''
  const CostoMargen = dataTable.CostoMargenResult || ''
  const Miller = dataTable.MillerResult || ''
  const Uman = dataTable.UmanResult || ''
  const Merrick = dataTable.MerrickResult || ''
  const PuntoEquilibrio = dataTable.PuntoEquilibrioResult || ''
  const MultiCriterio = dataTable.MultiCriterioResult || ''

  return (
    <div>
      <h2>Mes: {mes}</h2>
      <h2>Categoria: {categoria}</h2>

      <div className='mt-2'>
        <p>Omnes: {JSON.stringify(omnes)}</p>
        <table className='table mt-2 table-lg'>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>BCG</th>
              <th>ADL</th>
              <th>IRP</th>
              <th>Indice Popularidad</th>
              <th>Costo Margen</th>
              <th>Miller</th>
              <th>Uman</th>
              <th>Merrick</th>
              <th>Punto Equilibrio</th>
              <th>Multi Criterio</th>
            </tr>
          </thead>
          <tbody>
            {nombresPlato.map((plato: string, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{plato}</td>
                <td>{BCG[index] || '-'}</td>
                <td>{JSON.stringify(ADL[index]) || '-'}</td>
                <td>{IRP[index] || '-'}</td>
                <td>{indicePopularidad[index] || '-'}</td>
                <td>{CostoMargen[index] || '-'}</td>
                <td>{Miller[index] || '-'}</td>
                <td>{Uman[index] || '-'}</td>
                <td>{Merrick[index] || '-'}</td>
                <td>{PuntoEquilibrio[index] || '-'}</td>
                <td>{MultiCriterio[index] || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InformesResults