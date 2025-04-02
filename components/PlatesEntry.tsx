'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface PlatesEntryProps {
  setShowModal: (showModal: boolean) => void;
  refreshButton: () => void;
  edit?: boolean;
  platesId?: string
  platesDataProps?: any
}

    //Precio_plato = Valor_Venta + 0.18(Valor_Venta) + 0.10(Valor_Venta)
const PlatesEntry: React.FC<PlatesEntryProps> = ({ setShowModal, refreshButton, edit = false, platesId = '', platesDataProps }) => {
  const { data: session } = useSession();
  const [plateData, setPlateData] = useState({   
      'userId': session?.user?.id || '',
      'Mes_plato': '',
      'Categoria_plato': '',
      'Nombre_plato': '',
      'Cantidad_vendida_plato': 0,
      'Costo_plato': 0,
      'Precio_plato': 0,
      'Dias_plato': 0,
      'Valor_Venta': 0,
      'Rentabilidad': 0,
      'Rentabilidad_total': 0,
      'Ventas_total': 0
  });

  useEffect(() => {
    if (platesDataProps) {
        setPlateData(prev => platesDataProps)
    } else {
        return
    }
  }, [])
  
  useEffect(() => {
      setPlateData((prev) => {
          const valorVenta = parseFloat((prev.Precio_plato / 1.28).toFixed(2));
          const rentabilidad = parseFloat((valorVenta - prev.Costo_plato).toFixed(2));
          const rentabilidadTotal = parseFloat((prev.Cantidad_vendida_plato * rentabilidad).toFixed(2));
          const ventasTotal = parseFloat((prev.Cantidad_vendida_plato * valorVenta).toFixed(2));

          return {
              ...prev,
              Valor_Venta: valorVenta,
              Rentabilidad: rentabilidad,
              Rentabilidad_total: rentabilidadTotal,
              Ventas_total: ventasTotal,
          };
      });
  }, [plateData.Precio_plato, plateData.Costo_plato, plateData.Cantidad_vendida_plato]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlateData(prev => ({
      ...prev,
      [name]: value
    }));

    //aqui agregar la logica de Valor_Venta, Rentabilidad, Rentabilidad_total y Ventas_total
    //
    //
    //
    //Precio_plato = Valor_Venta + 0.18(Valor_Venta) + 0.10(Valor_Venta)
    //Valor_Venta = Precio_plato / 1.28
    // plateData.Valor_Venta = plateData.Precio_plato / 1.28
    // 
    // plateData.Rentabilidad = plateData.Valor_Venta - plateData.Costo_plato
    // 
    // plateData.Rentabilidad_total = plateData.Cantidad_vendida_plato * plateData.Rentabilidad
    // 
    // plateData.Ventas_total = plateData.Cantidad_vendida_plato * plateData.Valor_Venta
    //
    // if (name === 'Precio_plato' || name === 'Costo_plato' || name === 'Cantidad_vendida_plato') {
        // setPlateData(prev => ({
            // ...prev,
            // 'Valor_Venta': plateData.Precio_plato / 1.28
        // }));
        // 
        // setPlateData(prev => ({
            // ...prev,
            // 'Rentabilidad': plateData.Valor_Venta - plateData.Costo_plato
        // }));
        // 
        // setPlateData(prev => ({
            // ...prev,
            // 'Rentabilidad_total': plateData.Cantidad_vendida_plato * plateData.Rentabilidad
        // }));
        // 
        // setPlateData(prev => ({
            // ...prev,
            // 'Ventas_total': plateData.Cantidad_vendida_plato * plateData.Valor_Venta
        // }));
// 
    // }
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

  const handleEditPlates = async () => {
    try {
      validateFields();

      const response = await fetch(`/api/plates?id=${platesId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plateData),
      });
      
      if (!response.ok) throw new Error('Failed to edit plate');
      
      setTimeout(() => {
        refreshButton();
        setShowModal(false);
      }, 400);
    } catch (error) {
      console.error("Error in handleEditPlates:", error);
      alert(error instanceof Error ? error.message : 'Error al editar platos');
    }
  }
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
                type="number"
                className="input border border-black"
                name="Cantidad_vendida_plato"
                value={plateData.Cantidad_vendida_plato || ''}
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
            <legend className="fieldset-legend">Dias en la Carta</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Dias_plato"
                value={plateData.Dias_plato || ''}
                onChange={handleChange}
            />
        </fieldset>



        {/* 
        Valores no modificables directamente que son resultados de los anteriores. Deben actualizarse en tiempo real como los anteriores. Quitar la logica del servidor y ponerlo aca
        - Valor Venta
        - Rentabilidad
        - Rentabilidad Total
        - Ventas Totales


        //Precio_plato = Valor_Venta + 0.18(Valor_Venta) + 0.10(Valor_Venta)
        //Valor_Venta = Precio_plato / 1.28
        plateData.Valor_Venta = plateData.Precio_plato / 1.28

        plateData.Rentabilidad = plateData.Valor_Venta - plateData.Costo_plato

        plateData.Rentabilidad_total = plateData.Cantidad_vendida_plato * plateData.Rentabilidad

        plateData.Ventas_total = plateData.Cantidad_vendida_plato * plateData.Valor_Venta


        */}

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Valor Venta</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Valor_Venta"
                value={plateData.Valor_Venta || ''}
                disabled
            />
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Rentabilidad</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Rentabilidad"
                value={plateData.Rentabilidad || ''}
                disabled
            />
        </fieldset>
        
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Rentabilidad Total</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Rentabilidad_total"
                value={plateData.Rentabilidad_total || ''}
                disabled
            />
        </fieldset>

        <fieldset className="fieldset">
            <legend className="fieldset-legend">Ventas Totales</legend>
            <input 
                type="number"
                className="input border border-black"
                name="Ventas_total"
                value={plateData.Ventas_total || ''}
                disabled
            />
        </fieldset>

        </div>

      <div className="row-start-4 col-span-2 flex justify-center items-center bg-white gap-x-5">

      {edit 
          ? <button onClick={handleEditPlates} className="btn">Confirmar Cambios</button>
          : <button onClick={handleAddPlate} className="btn">Agregar</button>
      }
        <button onClick={closeModal} className="btn btn-soft">Cancelar</button>
      </div>
    </div>
  );
};

export default PlatesEntry;
