'use client'


import { useState } from "react";
import { useSession } from "next-auth/react";


interface CostsEntryProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
}

const CostsEntry: React.FC<CostsEntryProps> = ({ setShowModal, refreshButton }) => {
    const { data: session } = useSession();
    const [costsData, setCostsData] = useState({
        'userId': session?.user?.id || '',
        'Mes': '',
        'Sueldo_Cocina': '',
        'Sueldo_Servicio': '',
        'Sueldo_Administrativos': '',
        'Alquiler': '',
        'Depreciacion': '',
        'Servicios_basicos': '',
        'Publicidad': '',
        'Internet': '',
        'Otros': ''
  })

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
  
  const calculateTotalCosts = (data: typeof costsData) => {
      const {
          Sueldo_Cocina,
          Sueldo_Servicio,
          Sueldo_Administrativos,
          Alquiler,
          Depreciacion,
          Servicios_basicos,
          Publicidad,
          Internet,
          Otros
      } = data;

      // Convertimos los valores a número y sumamos, manejando casos donde puedan estar vacíos
      return [
          Sueldo_Cocina,
          Sueldo_Servicio,
          Sueldo_Administrativos,
          Alquiler,
          Depreciacion,
          Servicios_basicos,
          Publicidad,
          Internet,
          Otros
      ].reduce((total, value) => total + (Number(value) || 0), 0);
  };

  const handleAddCosts = async () => {
    try {
      validateFields();

      const totalCosts = calculateTotalCosts(costsData);
      const updatedCostsData = {
          ...costsData,
          Total_Costos: totalCosts 
      };

      const response = await fetch('/api/costs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCostsData),
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
    <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col gap-y-5">
      <h1 className="col-span-2 text-xl font-bold">Registro de Costos Fijos</h1>
      
      <button className="btn max-w-48">Nuevo Concepto</button>

      <div className="grid p-4 grid-cols-2 gap-x-5 gap-y-5 my-4 border border-black rounded-lg">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mes</legend>
          <select 
            className="select border border-black" 
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
          
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Sueldo de Cocina</legend>
          <input
            type="number"
            className="input border border-black"
            name='Sueldo_Cocina'
            value={costsData.Sueldo_Cocina || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Sueldo de Servicio</legend>
          <input
            type="number"
            className="input border border-black"
            name='Sueldo_Servicio'
            value={costsData.Sueldo_Servicio || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Sueldo de Administrativos</legend>
          <input
            type="number"
            className="input border border-black"
            name='Sueldo_Administrativos'
            value={costsData.Sueldo_Administrativos || ''}
            onChange={handleChange}
          />
        </fieldset>


        <fieldset className="fieldset">
          <legend className="fieldset-legend">Alquiler</legend>
          <input
            type="number"
            className="input border border-black"
            name='Alquiler'
            value={costsData.Alquiler || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Depreciacion</legend>
          <input
            type="number"
            className="input border border-black"
            name='Depreciacion'
            value={costsData.Depreciacion || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Servicios Básicos</legend>
          <input
            type="number"
            className="input border border-black"
            name='Servicios_basicos'
            value={costsData.Servicios_basicos || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Publicidad</legend>
          <input
            type="number"
            className="input border border-black"
            name='Publicidad'
            value={costsData.Publicidad || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Internet</legend>
          <input
            type="number"
            className="input border border-black"
            name='Internet'
            value={costsData.Internet || ''}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Otros</legend>
          <input
            type="number"
            className="input border border-black"
            name='Otros'
            value={costsData.Otros || ''}
            onChange={handleChange}
          />
        </fieldset>


    </div>
      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={handleAddCosts} className="btn">Agregar</button>
        <button onClick={closeModal} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  );
};

export default CostsEntry;
