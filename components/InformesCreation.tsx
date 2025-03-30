'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInform } from "@/app/(private)/informes/context";

type informSpecsType = {
    'Mes_informes': string
    'Informes_category': string
}

interface InformesCreationProps {
    setShowModal: (showModal : boolean) => void
}

const InformesCreation:React.FC<InformesCreationProps> = ({ setShowModal }) => {
  const [informSpecs, setInformSpecs] = useState<informSpecsType>({
    Mes_informes: '',
    Informes_category: ''
  });
  const { setInformData } = useInform();
  const router = useRouter();

  /*
  1. Mandar el mes y la categoria de informes
  2. Encontrar todos los platos de esa categoria en esos meses
  3. Crear informe
  4. Mostrar informe
  5. Almacenar el informe en otra coleccion de Informes, no Plate ni Costs. 
  6. Al hacer el fetch en page tiene que hacerlo a la coleccion Informes
  */

  const createInforms = async () => { 
    try {
      const response = await fetch('/api/informes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(informSpecs),
      });

      if (!response.ok) throw new Error('Failed to add costs');

      const data = await response.json();
     
      setInformData(data.data); // data.data es el informe recién creado

      router.push("/informes/results");
      
      setTimeout(() => {
        setShowModal(false);
      }, 400)
      
    } catch (error) {
      console.error("Error in handleAddCosts:", error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  
  return (
    <div className='bg-white p-4 rounded-lg border border-black shadow-xl flex flex-col gap-y-5'>
      <h1 className="col-span-2 text-xl font-bold">Creacion de Informes</h1>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mes</legend>
        <select 
          className="select" 
          name="Mes_informes" 
          onChange={(e) => setInformSpecs(prev => ({...prev, Mes_informes: e.target.value}))}
          value={informSpecs.Mes_informes}
        >
          <option value="">Seleccione un mes</option>
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
          value={informSpecs.Informes_category || ''}
          onChange={(e) => setInformSpecs(prev => ({...prev, Informes_category: e.target.value}))}
        >
          <option value="" disabled>Seleccione una categoría</option>
          <option value={"Entradas"}>ENTRADAS</option>
          <option value={"Fondos"}>FONDOS</option>
          <option value={"Postres"}>POSTRES</option>
          <option value={"Bebidas"}>BEBIDAS</option>
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
