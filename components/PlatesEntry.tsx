'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

interface PlatesEntryProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
}


const PlatesEntry: React.FC<PlatesEntryProps> = ({ setShowModal, refreshButton }) => {
  const { data: session } = useSession();
  const [plateData, setPlateData] = useState({   
      'userId': session?.user?.id || '',
      'Mes_plato': '',
      'Categoria_plato': '',
      'Nombre_plato': '',
      'Cantidad_vendida_plato': '',
      'Costo_plato': '',
      'Precio_plato': '',
      'Dias_plato': ''
  });


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
    <div className="bg-white p-6 rounded-2xl border border-black/20 shadow-xl flex flex-col gap-y-5">
      <h1 className="col-span-2 text-xl font-bold">Registro de Platos</h1>
      <h2>2025</h2> 
      <div className="col-span-2 row-start-3 grid p-4 grid-cols-2 gap-x-5 gap-y-5 border border-black rounded-lg">

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Mes</legend>
          <select 
            className="select border border-black" 
            name="Mes_plato" 
            value={plateData.Mes_plato || ''} 
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
          <legend className="fieldset-legend">Categoria</legend>
          <select 
            className="select border border-black" 
            name="Categoria_plato" 
            value={plateData.Categoria_plato || ''} 
            onChange={handleChange}
          >
            <option value="" disabled>Seleccione un mes</option>
            <option value="Fondos">FONDOS</option>
            <option value="Postres">POSTRES</option>
            <option value="Entradas">ENTRADAS</option>
            <option value="Bebidas">BEBIDAS</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre del Plato</legend>
            <input 
                type="text"
                className="input border border-black"
                name="Nombre_plato"
                value={plateData.Nombre_plato || ''}
                onChange={handleChange}
            />
        </fieldset>


        <fieldset className="fieldset">
            <legend className="fieldset-legend">Cantidad Vendida</legend>
            <input 
                type="text"
                className="input border border-black"
                name="Cantidad_vendida_plato"
                value={plateData.Cantidad_vendida_plato || ''}
                onChange={handleChange}
            />
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Costo Plato</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Costo_plato"
                value={plateData.Costo_plato || ''}
                onChange={handleChange}
            />
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Precio Plato</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Precio_plato"
                value={plateData.Precio_plato || ''}
                onChange={handleChange}
            />
        </fieldset>
      


        <fieldset className="fieldset">
            <legend className="fieldset-legend">Dias en la Carta</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Dias_plato"
                value={plateData.Dias_plato || ''}
                onChange={handleChange}
            />
        </fieldset>



        </div>

      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={handleAddPlate} className="btn">Agregar</button>
        <button onClick={closeModal} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  );
};

export default PlatesEntry;
