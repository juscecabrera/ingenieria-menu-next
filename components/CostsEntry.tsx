'use client'
import { useState } from "react";

interface CostsEntryProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
}

const costsEntryTableConcepts = {
  'Sueldo Personal de Cocina': 'Sueldo_Cocina',
  'Sueldo Personal de Servicio': 'Sueldo_Servicio',
  'Sueldos Administrativos': 'Sueldo_Administrativos',
  'Alquiler (arriendo)': 'Alquiler',
  'Depreciación': 'Depreciacion',
  'Servicios básicos (luz, agua, teléfono)': 'Servicios_basicos',
  'Publicidad': 'Publicidad',
  'Internet': 'Internet',
  'Otros': 'Otros'
} as const;

type CostField = typeof costsEntryTableConcepts[keyof typeof costsEntryTableConcepts] | 'Mes';

const CostsEntry: React.FC<CostsEntryProps> = ({ setShowModal, refreshButton }) => {
  const [costsData, setCostsData] = useState<Partial<Record<CostField, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCostsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFields = () => {
    if (!costsData.Mes) {
      throw new Error('El mes es requerido');
    }
    // Add more validation as needed
    return true;
  };

  const handleAddCosts = async () => {
    try {
      validateFields();
      const response = await fetch('/api/costs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(costsData),
      });
      
      if (!response.ok) throw new Error('Failed to add costs');
      
      setTimeout(() => {
        refreshButton();
        setShowModal(false);
      }, 400);
    } catch (error) {
      console.error("Error in handleAddCosts:", error);
      alert(error instanceof Error ? error.message : 'Error al agregar costos');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    refreshButton();
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-black shadow-xl flex flex-col gap-y-5">
      <h1 className="col-span-2 text-xl font-bold">Registro de Costos Fijos</h1>
      
      <button className="btn max-w-48">Nuevo Concepto</button>

      <div className="grid p-4 grid-cols-2 gap-x-5 gap-y-5 my-4 border border-black rounded-lg">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mes</legend>
          <select 
            className="select" 
            name="Mes" 
            value={costsData.Mes || ''} 
            onChange={handleChange}
          >
            <option value="" disabled>Seleccione un mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </fieldset>

        {Object.entries(costsEntryTableConcepts).map(([key, value]) => (
          <fieldset key={value} className="fieldset">
            <legend className="fieldset-legend">{key}</legend>
            <input
              type="number"
              className="input"
              name={value}
              value={costsData[value] || ''}
              onChange={handleChange}
            />
          </fieldset>
        ))}
      </div>

      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={handleAddCosts} className="btn">Agregar</button>
        <button onClick={closeModal} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  );
};

export default CostsEntry;