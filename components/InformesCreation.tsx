'use client'

import { useState } from "react";

interface InformesCreationProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
}


const InformesCreation:React.FC<InformesCreationProps> = ({ setShowModal, refreshButton }) => {
  const [informesData, setInformesData] = useState({
    Mes: '',
    Informes_category: ''
  });


  const createInforms = async () => { 
    try {
      //funciona
      
      
      // const response = await fetch('/api/informes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(informesData),
      // });

      // if (!response.ok) throw new Error('Failed to add costs');


      setTimeout(() => {
        refreshButton();
        setShowModal(false);
      }, 400)
      
    } catch (error) {
      console.error("Error in handleAddCosts:", error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
    refreshButton();
  };

  
  return (
    <div className='bg-white p-4 rounded-lg border border-black shadow-xl flex flex-col gap-y-5'>
      <h1 className="col-span-2 text-xl font-bold">Creacion de Informes</h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mes</legend>
        <select 
          className="select" 
          name="Mes" 
          onChange={(e) => setInformesData(prev => ({...prev, Mes: e.target.value}))}
          value={informesData.Mes || ''}
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
        <legend className="fieldset-legend">Categoría</legend>
        <select 
          className="select" 
          name="Informes_category" 
          value={informesData.Informes_category || ''}
          onChange={(e) => setInformesData(prev => ({...prev, Informes_category: e.target.value}))}
        >
          <option value="" disabled>Seleccione una categoría</option>
          <option value={"ENTRADAS"}>ENTRADAS</option>
          <option value={"FONDOS"}>FONDOS</option>
          <option value={"POSTRES"}>POSTRES</option>
          <option value={"BEBIDAS"}>BEBIDAS</option>
        </select>
      </fieldset>

      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">
        <button onClick={() => createInforms()} className="btn">Crear Informes</button>
        <button onClick={() => closeModal()} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  )
}

export default InformesCreation