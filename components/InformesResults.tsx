import React from 'react'

const InformesResults = ({ informesData }: any) => {
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

      <div className='mt-2'>
        <p>Omnes: {JSON.stringify(omnes)}</p>
        <table className='border border-black table mt-2 table-lg'>
          <thead className='border border-black'>
            <tr className='border border-black'>
              <th className='border border-black'>Código</th>
              <th className='border border-black'>Nombre</th>
              <th className='border border-black'>BCG</th>
              <th className='border border-black'>ADL</th>
              <th className='border border-black'>IRP</th>
              <th className='border border-black'>Indice Popularidad</th>
              <th className='border border-black'>Costo Margen</th>
              <th className='border border-black'>Miller</th>
              <th className='border border-black'>Uman</th>
              <th className='border border-black'>Merrick</th>
              <th className='border border-black'>Punto Equilibrio</th>
              <th className='border border-black'>Multi Criterio</th>
            </tr>
          </thead>
          <tbody>
            {nombresPlato.map((plato: string, index: number) => (
              <tr key={index} className='text-center'>
                <td className='border border-black'>{index + 1}</td>
                <td className='border border-black'>{plato}</td>
                <td className='border border-black'>{BCG[index] || '-'}</td>
                <td className='border border-black'>{JSON.stringify(ADL[index]) || '-'}</td>
                <td className='border border-black'>{IRP[index] || '-'}</td>
                <td className='border border-black'>{indicePopularidad[index] || '-'}</td>
                <td className='border border-black'>{CostoMargen[index] || '-'}</td>
                <td className='border border-black'>{Miller[index] || '-'}</td>
                <td className='border border-black'>{Uman[index] || '-'}</td>
                <td className='border border-black'>{Merrick[index] || '-'}</td>
                <td className='border border-black'>{PuntoEquilibrio[index] || '-'}</td>
                <td className={"border border-black " + ( 
                    MultiCriterio[index] >= 5 && MultiCriterio[index] <= 7 
                        ? 'bg-red-400' 
                        : MultiCriterio[index] >= 8 && MultiCriterio[index] <= 11 
                            ? 'bg-yellow-400' 
                            : MultiCriterio[index] >= 12 && MultiCriterio[index] <= 20 
                                ? 'bg-green-400' 
                                : '')
                } >
                {MultiCriterio[index] || '-'}
                </td>               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InformesResults
