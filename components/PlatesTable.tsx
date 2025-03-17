import React from 'react';

interface platesDataType {
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
}

const PlatesTable: React.FC<PlatesTableProps> = ({ platesData }) => {
  return (
    <>
      <table className='table table-lg w-1/2'>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlatesTable;
