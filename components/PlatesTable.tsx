import React from 'react';

interface PlatesTableProps {
  platesData: any[];
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PlatesTable;
