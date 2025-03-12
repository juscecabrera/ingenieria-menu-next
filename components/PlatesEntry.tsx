'use client';

import { useState } from "react";

interface PlatesEntryProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
}

const platesEntryTableFields = {
  'Mes del Plato': 'Mes_plato',
  'Categoría': 'Categoria_plato',
  'Nombre del Plato': 'Nombre_plato',
  'Cantidad Vendida': 'Cantidad_vendida_plato',
  'Precio': 'Precio_plato',
  'Costo': 'Costo_plato',
  'Días Disponible': 'Dias_plato'
} as const;

type PlateField = typeof platesEntryTableFields[keyof typeof platesEntryTableFields] | 'CodInt';

const PlatesEntry: React.FC<PlatesEntryProps> = ({ setShowModal, refreshButton }) => {
  const [plateData, setPlateData] = useState<Partial<Record<PlateField, string>>>({ CodInt: "1" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFields = () => {
    if (!plateData.Mes_plato || !plateData.Nombre_plato) {
      throw new Error('El mes y el nombre del plato son requeridos');
    }
    return true;
  };

  const handleAddPlate = async () => {
    try {
      validateFields();
      const response = await fetch('/api/plates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plateData),
      });
      
      if (!response.ok) throw new Error('Failed to add plate');
      
      setTimeout(() => {
        refreshButton();
        setShowModal(false);
      }, 400);
    } catch (error) {
      console.error("Error in handleAddPlate:", error);
      alert(error instanceof Error ? error.message : 'Error al agregar el plato');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    refreshButton();
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-black grid grid-cols-2 grid-rows-[1fr_1fr_6fr_1fr] gap-x-[5%] gap-y-[2%]">
      <h1 className="col-span-2 text-xl font-bold">Registro de Platos</h1>
      
      <div className="col-span-2 row-start-3 grid p-4 grid-cols-2 gap-x-5 gap-y-5 my-4 border border-black rounded-lg">
        {Object.entries(platesEntryTableFields).map(([key, value]) => (
          <fieldset key={value} className="fieldset">
            <legend className="fieldset-legend">{key}</legend>
            <input
              type={value === 'Cantidad_vendida_plato' || value === 'Precio_plato' || value === 'Costo_plato' || value === 'Dias_plato' ? 'number' : 'text'}
              className="input"
              name={value}
              value={plateData[value] || ''}
              onChange={handleChange}
            />
          </fieldset>
        ))}
      </div>

      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={handleAddPlate} className="btn">Agregar</button>
        <button onClick={closeModal} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  );
};

export default PlatesEntry;
