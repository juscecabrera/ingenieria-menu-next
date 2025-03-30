
//Valor de Venta = precio final sin impuestos ni recargo por consumo
interface PlateStructure {
    _id: string;
    CodInt: number;
    Mes_plato: string;
    Categoria_plato: string;
    Nombre_plato: string;
    Cantidad_vendida_plato: number;
    Costo_plato: number;
    Precio_plato: number;
    Dias_plato: number;
    Valor_Venta: number;
    Rentabilidad: number;
    Rentabilidad_total: number;
    Ventas_total: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type OmnesResult = [1 | 0, 1 | 0, -1 | 0 | 1, number]

type BCGResult = ("Estrella" | "Impopular" | "Popular" | "Perdedor")[]

type ADLResult = [
    "Crecimiento" | "Introduccion" | "Madurez" | "Declinacion",
    "Dominante" | "Fuerte" | "Favorable" | "Debil" | "Marginal"
] //la primera categoria es Rentabilidad, la segunda es Cantidad Vendida

type IRPResult = number[]

type IndexPopularidadResult = number[]

type CostoMargenResult = ("Selecto" | "Estandar" | "Durmiente" | "Problema")[]

type MillerResult = ("Ganador" | "MarginalAlto" | "MarginalBajo" | "Perdedor")[]

type UmanResult = ("Potencial" | "Bandera" | "Perdedor" | "DificilVender")[]

type MerrickResult = ("A" | "B" | "C" | "D")[]

type PuntoEquilibrioResult = number[]

type MultiCriterioResult = number[]


export const executeInform = async (data : PlateStructure[]) => {
    // 1. Recibir data
    // 2. Separar la data 
    // 3. Ejecutar los informes
    // 4. Retornar los resultados

    //2. Separar la data
    const valoresVentas: number[] = data.map(plate => plate.Valor_Venta);

    const cantidadesVendidas: number[] = data.map(plate => plate.Cantidad_vendida_plato);
    const cantidadesVendidasPromedio: number = Number((cantidadesVendidas.reduce((acc, curr) => acc + curr, 0) / cantidadesVendidas.length).toFixed(2))
    const cantidadVendidaTotalAcumulada : number = cantidadesVendidas.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);
    
    const ventasTotalesPorPlato: number[] = data.map(plate => plate.Ventas_total); //Ventas_Total en modelo Plate: valoresVentas * cantidadesVendidas
    const ventasTotalesPorPlatoAcumuladas: number = ventasTotalesPorPlato.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

    const rentabilidadPorPlato: number[] = data.map(plate => plate.Rentabilidad);
    const rentabilidadPorPlatoPromedio: number = rentabilidadPorPlato.reduce((acc, curr) => acc + curr, 0) / rentabilidadPorPlato.length; //promedio de rentabilidadPorPlato
    const rentabilidadPorPlatoTotal: number[] = data.map(plate => plate.Rentabilidad_total); //cantidadVendida * rentabilidadPorPlato
    const rentabilidadPorPlatoTotalPromedio: number = rentabilidadPorPlatoTotal.reduce((acc, curr) => acc + curr, 0) / rentabilidadPorPlato.length; //promedio de rentabilidadPorPlatoTotal
    const rentabilidadPorPlatoTotalAcumulada : number = rentabilidadPorPlatoTotal.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);  

    const diasPlato: number[] = data.map(plate => plate.Dias_plato);
    const diasPlatoAcumulados: number = diasPlato.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

    const costoUnitarioPorPlato: number[] = data.map(plate => plate.Costo_plato);
    const costoUnitarioPorPlatoPromedio: number = Number((costoUnitarioPorPlato.reduce((acc, curr) => acc + curr, 0) / costoUnitarioPorPlato.length).toFixed(2)); //promedio de costoUnitarioPorPlato

    const costosFijos = 14180 //artificial porque tengo que sacarlo de otros datos

    //3. Ejecutar los informes
    const omnesResult = await omnesFunction({ valoresVentas, cantidadesVendidas }) 
    const BCGResult = await BCGPop({ rentabilidadPorPlato, cantidadVendidaTotalAcumulada, cantidadesVendidas })
    const ADLResult = await ADL({ cantidadesVendidas, rentabilidadPorPlato })
    const IRPResult = await IRP({ ventasTotalesPorPlato, ventasTotalesPorPlatoAcumuladas, rentabilidadPorPlatoTotal, rentabilidadPorPlatoTotalAcumulada })
    const indicePopularidadResult = await IndexPopularidad({ diasPlato, diasPlatoAcumulados, cantidadesVendidas, cantidadVendidaTotalAcumulada })
    const CostoMargenResult = await CostoMargen({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio })
    const MillerResult = await Miller({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, cantidadesVendidas, cantidadesVendidasPromedio })    
    const UmanResult = await Uman({ rentabilidadPorPlato, rentabilidadPorPlatoPromedio, rentabilidadPorPlatoTotal, rentabilidadPorPlatoTotalPromedio })
    const MerrickResult = await Merrick({ cantidadesVendidas, cantidadesVendidasPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio }) 
    const PuntoEquilibrioResult = await PuntoEquilibrio({ costosFijos, rentabilidadPorPlato, rentabilidadPorPlatoPromedio })
    const MultiCriterioResult = await multiCriterio({ BCGResult, CostoMargenResult, MillerResult, UmanResult, MerrickResult})
    
    //4. Retornar los resultados

    return {
        omnesResult,
        BCGResult,
        ADLResult,
        IRPResult,
        indicePopularidadResult,
        CostoMargenResult,
        MillerResult,
        UmanResult,
        MerrickResult,
        PuntoEquilibrioResult,
        MultiCriterioResult
    }
}

interface OmnesFunctionProps {
    valoresVentas: number[] //array de los valores de venta de los platos en el mes y categoria indicados
    cantidadesVendidas: number[] //array de las cantidades vendidas de los platos en el mes y categoria indicados
}


const omnesFunction = async ({ valoresVentas, cantidadesVendidas} : OmnesFunctionProps): Promise<OmnesResult> => {
    //4 principios

    /*
    1er principio
    Amplitud de gama = (el valor de venta mas alto - el valor de venta mas bajo) / 3
    Hay 3 zonas de precios y cada uno tiene la longitud de una Amplitud de Gama (AG)
    Zona 1 = entre el valor de venta más bajo Y el valor de venta más bajo + amplitud de gama
    Zona 2 = el valor de venta más bajo + amplitud de gama Y el valor de venta más bajo y 2 (amplitud de gama)
    Zona 3 = el valor de venta más bajo + 2 (amplitud de gama) Y el valor de venta más bajo + 3 (amplitud de gama)


    Para que cumpla con el primer principio, la cantidad de platos en la Z1 + la cantidad de platos en la Z3 debe ser igual a la cantidad de platos en la Z2

    */

    //1. Se calcula el Valor de Venta mas alto
    const valorMayor = Math.max(...valoresVentas)

    //2. Se calcula el Valor de Venta mas bajo
    const valorMenor = Math.min(...valoresVentas)    

    //3. Calculamos Amplitud de Gama (AG)
    const AG = Number(((valorMayor - valorMenor) / 3).toFixed(2));

    //4. Calculamos las zonas
    const Z1 : [number, number] = [valorMenor, valorMenor + AG] 
    const Z2 : [number, number] = [valorMenor + AG, valorMenor + (2* AG)]
    const Z3 : [number, number] = [valorMenor + (2* AG), valorMenor + (3 * AG)]

    //5. Calculamos cuantos platos hay en cada zona
    const definePlatosZones = (elementos: number[], rango: [number, number]) => {
        return elementos.filter(elemento => elemento >= rango[0] && elemento < rango[1]).length;
    };

    const platosZ1 = definePlatosZones(valoresVentas, Z1)
    const platosZ2 = definePlatosZones(valoresVentas, Z2)
    const platosZ3 = definePlatosZones(valoresVentas, Z3)

    //6. Definimos si cumple o no con el primer principio de Omnes

    const cumpleOmnes1: (1 | 0) = platosZ1 + platosZ3 === platosZ2 ? 1 : 0 //1 es que cumple, 0 es que no cumple

    /*
    2do principio:
    La proporción entre el valor de venta más bajo y el valor de venta más alto debe ser de hasta 2.5 veces hasta 9 platos. A partir de 10 platos o más, debe ser de máximo 3 veces.

    */

    //1. Calculamos la cantidad de platos
    const cantidadPlatos = valoresVentas.length 

    //2. Calculamos la proporcion entre el valor de venta mas alto y el mas bajo
    const proporcionPlatos = valorMayor / valorMenor

    //3. Definimos si cumple o no con el 2do principio de Omnes
    const cumpleOmnes2: (1 | 0) = cantidadPlatos <= 9 ? (proporcionPlatos <= 2.5 ? 1 : 0) : (proporcionPlatos <= 3 ? 1 : 0) //1 es que cumple, 0 es que no cumple

    /*
    3er principio:

    Si el resultado está entre 0.85 y 1.05 se sugiere mantener los precios.
    Si el resultado es menor a 0.85 se sugiere disminuir los precios y calcular un nuevo precio.

    Relacion Precio Medio Ofertado (PMO) y Precio Medio Pedido (PMP)

    Ventas Totales = Cantidad Vendida del Plato * Valor de Venta del Plato 
    Ventas Totales Acumuladas = Suma de Ventas Totales
    
    Cantidades Vendidas Acumuladas = Suma de Cantidades Vendidas

    Valores Venta Acumulados = Suma de Todos los Valores de Venta
    Cantidad de Platos = Cantidad de Platos Ofrecidos

    PMP = Ventas Totales Acumuladas / Cantidades Vendidas Acumuladas
    PMO = Valores Venta Acumulados / Cantidad de Platos

    */

    //1. Calculamos Ventas Totales Acumuladas

    const ventasTotalesAcumuladas: number = valoresVentas.map((num, index) => num * cantidadesVendidas[index]).reduce((acc, curr) => acc + curr, 0);

    //2. Calculamos Cantidades Vendidas Acumuladas

    const cantidadesVendidasAcumuladas: number = cantidadesVendidas.reduce((acc, curr) => acc + curr, 0)

    //3. Calculamos Valores Venta Acumulados

    const valoresVentasAcumulados: number = valoresVentas.reduce((acc, curr) => acc + curr, 0)

    //4. Reusamos la variable Cantidad de Platos del 2do principio
    //cantidadPlatos

    //5. Calculamos PMP = Ventas Totales Acumuladas / Cantidades Vendidas Acumuladas

    const PMP = ventasTotalesAcumuladas / cantidadesVendidasAcumuladas  

    //6. Calculamos PMO = Valores Venta Acumulados / Cantidad de Platos

    const PMO = valoresVentasAcumulados / cantidadPlatos

    //7. Calculamos resultado 3er principio

    const relacionPrecios: number = Number((PMP / PMO).toFixed(2))

    //8. Definimos la relacion
    
    //Si el resultado está entre 0.85 y 1.05 se sugiere mantener los precios.
    //Si el resultado es menor a 0.85 se sugiere disminuir los precios y calcular un nuevo precio.
    //-1 significa menor a 0.85, 0 significa entre 0.85 y 1.05, 1 significa mas de 1.05
    
    const cumpleOmnes3 = relacionPrecios < 0.85 ? -1 : ((relacionPrecios >= 0.85 && relacionPrecios <= 1.05) ? 0 : 1)

    /*
    4to principio:
    La promoción debe ser menor a PMP (ticket promedio)
    */

    const cumpleOmnes4 : number = Number(PMP.toFixed(2)) //numero al que la promocion debe ser menor

    const omnesResult: OmnesResult = [cumpleOmnes1, cumpleOmnes2, cumpleOmnes3, cumpleOmnes4]

    return omnesResult
}

interface BCGPopProps {
    rentabilidadPorPlato: number[]
    cantidadVendidaTotalAcumulada: number
    cantidadesVendidas: number[]
}


 const BCGPop = async ({ rentabilidadPorPlato, cantidadVendidaTotalAcumulada, cantidadesVendidas }: BCGPopProps): Promise<BCGResult>  => {
    /*
    2do informe: BCG

    Mide dos variables POR PLATO: 
        1. Popularidad: % de platos vendidos que el plato representa sobre el total. 
            -  Alta: popularidad >=  % promedio
            -   Baja: popularidad <  % promedio
            Calculo: (Cantidad_vendida / SUM(Cantidad_vendida)) * 100%
        2. Rentabilidad: Valor de venta - Costo unitario
            - Alta: mayor a 15 soles (consultar con Rodrigo)
            - Baja: menor a 15 soles 
            Posiblemente es un % del valor de venta, revisar despues
            Calculo: (Valor_Venta - Costo)

    Necesita:
        - cantidad de platos vendidos acumulados totales (todos los platos)
        - cantidad de platos vendidos por plato
        - rentabilidad por plato
    */

    const numeroPlatos = cantidadesVendidas.length
    const promedioPopularidad = 100 / numeroPlatos // Equal distribution percentage
    
    const resultados: BCGResult = cantidadesVendidas.map((cantidad, index) => {
        const popularidadPorcentaje = (cantidad / cantidadVendidaTotalAcumulada) * 100
        
        const popularidad = popularidadPorcentaje >= promedioPopularidad ? "Alta" : "Baja"
        
        //no estoy 100% seguro que sea 15 soles el limite de rentabilidad, de repente es % de valor de venta
        const rentabilidad = rentabilidadPorPlato[index] >= 15 ? "Alta" : "Baja"
        
        if (popularidad === "Alta" && rentabilidad === "Alta") {
            return "Estrella"
        } else if (popularidad === "Baja" && rentabilidad === "Alta") {
            return "Impopular"
        } else if (popularidad === "Alta" && rentabilidad === "Baja") {
            return "Popular"
        } else {
            return "Perdedor"
        }
    })
    
    return resultados
} 

interface ADLProps {
    cantidadesVendidas: number[]
    rentabilidadPorPlato: number[]
}


 const ADL = async ({ cantidadesVendidas, rentabilidadPorPlato }: ADLProps): Promise<ADLResult[]> => {
    /*
    3er informe: ADL
     
    1. Margen de Contribucion: level size = (mayor margen - menor margen) / 4
        Crecimiento: [..., mayor margen]
        Introduccion: [...]
        Madurez: [...]
        Declinacion: [menor margen, menor margen + level size]

    2. Cantidad vendida: level size = (mayor cantidad de ventas - menor cantidad de ventas) / 5
        Dominante: [..., mayor cantidad de ventas]
        Fuerte: [...]
        Favorable: [...]
        Debil: [...]
        Marginal: [menor cantidad de ventas, menor cantidad de ventas + level size]

    Cada plato tiene dos atributos: margen de contribucion y cantidad vendida
    */

    const CVA = Math.max(...cantidadesVendidas)
    const CVB = Math.min(...cantidadesVendidas)
    const maxRent = Math.max(...rentabilidadPorPlato)
    const minRent = Math.min(...rentabilidadPorPlato)


    const CantidadVentasSize = (CVA - CVB) / 5

    const RentabilidadSize = (maxRent - minRent) / 4

    //Rentabilidad
    const Crecimiento = [minRent +  (3 * RentabilidadSize),  maxRent]
    const Introduccion = [minRent +  (2 * RentabilidadSize),  minRent +  (3 * RentabilidadSize)]
    const Madurez = [minRent + RentabilidadSize,  minRent +  (2 * RentabilidadSize)]
    const Declinacion = [minRent, minRent + RentabilidadSize]


    //Cantidad Vendida
    const Dominante = [CVB + (4 * CantidadVentasSize), CVA]
    const Fuerte = [CVB + (3 * CantidadVentasSize), CVB + (4 * CantidadVentasSize)]
    const Favorable = [CVB + (2 * CantidadVentasSize), CVB + (3 * CantidadVentasSize)]
    const Debil = [CVB + CantidadVentasSize, CVB + (2 *CantidadVentasSize)]
    const Marginal = [CVB, CVB + CantidadVentasSize]

    // Function to classify rentability
    const classifyRentability = (value: number): "Crecimiento" | "Introduccion" | "Madurez" | "Declinacion" => {
        if (value >= Crecimiento[0] && value <= Crecimiento[1]) return "Crecimiento"
        if (value >= Introduccion[0] && value < Introduccion[1]) return "Introduccion"
        if (value >= Madurez[0] && value < Madurez[1]) return "Madurez"
        return "Declinacion"
    }

    // Function to classify sales quantity
    const classifySales = (value: number): "Dominante" | "Fuerte" | "Favorable" | "Debil" | "Marginal" => {
        if (value >= Dominante[0] && value <= Dominante[1]) return "Dominante"
        if (value >= Fuerte[0] && value < Fuerte[1]) return "Fuerte"
        if (value >= Favorable[0] && value < Favorable[1]) return "Favorable"
        if (value >= Debil[0] && value < Debil[1]) return "Debil"
        return "Marginal"
    }

    // Map through the arrays and classify each dish
    const resultados: ADLResult[] = cantidadesVendidas.map((cantidad, index) => {
        const rentabilidad = rentabilidadPorPlato[index]
        return [
            classifyRentability(rentabilidad),
            classifySales(cantidad)
        ] as ADLResult
    })

    return resultados

    
}

interface IRPProps {
    ventasTotalesPorPlato: number[]
    ventasTotalesPorPlatoAcumuladas: number
    rentabilidadPorPlatoTotal: number[]
    rentabilidadPorPlatoTotalAcumulada: number
}


 const IRP = async ({ ventasTotalesPorPlato, ventasTotalesPorPlatoAcumuladas, rentabilidadPorPlatoTotalAcumulada, rentabilidadPorPlatoTotal }: IRPProps):Promise<IRPResult> => {
    /* 4to informe: IRP

    % de margen = rentabilidadPorPlatoTotal / rentabilidadPorPlatoTotalAcumulada
    % de venta = ventasTotalesPorPlato / ventasTotalesPorPlatoAcumuladas
    IRP = % de margen / % de venta
    Mayor a 1 o menor a 1.
    */ 


   // Calculate percentage margin for each dish with 2 decimal places
    const margenPorcentajes = rentabilidadPorPlatoTotal.map(
        rentabilidad => Number((rentabilidad / rentabilidadPorPlatoTotalAcumulada).toFixed(2))
    )

    // Calculate percentage sales for each dish with 2 decimal places
    const ventaPorcentajes = ventasTotalesPorPlato.map(
        venta => Number((venta / ventasTotalesPorPlatoAcumuladas).toFixed(2))
    )

    // Calculate IRP for each dish with 2 decimal places
    const irpValores: IRPResult = margenPorcentajes.map(
        (margen, index) => Number((margen / ventaPorcentajes[index]).toFixed(2))
    )

    return irpValores
}

interface IndexPopularidadProps {
    diasPlato: number[]
    diasPlatoAcumulados: number
    cantidadesVendidas: number[]
    cantidadVendidaTotalAcumulada: number
}


 const IndexPopularidad = async ({ diasPlato, diasPlatoAcumulados, cantidadesVendidas, cantidadVendidaTotalAcumulada }: IndexPopularidadProps): Promise<IndexPopularidadResult> => {
    /*
    5to informe

    - Indice de ventas: cantidad vendida del plato / cantidad vendida total
    - Indice de presentacion: cantidad de dias de presentacion / cantidad de dias totales 

    Indice de popularidad: indice de ventas / indice de presentacion
    */


    const indiceVentas = cantidadesVendidas.map(
        cantidad => Number((cantidad / cantidadVendidaTotalAcumulada).toFixed(2))
    )

    const indicePresentacion = diasPlato.map(
        dias => Number((dias / diasPlatoAcumulados).toFixed(2))
    )

    const indicePopularidad = indiceVentas.map(
        (indice, index) => Number((indice / indicePresentacion[index]).toFixed(2))
    )
    
    return indicePopularidad
}

interface CostoMargenProps {
    costoUnitarioPorPlato: number[]
    costoUnitarioPorPlatoPromedio: number
    rentabilidadPorPlato: number[]
    rentabilidadPorPlatoPromedio: number
}


 const CostoMargen = async ({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio }: CostoMargenProps): Promise<CostoMargenResult> => {
    /*
    6to informe

    - Costo unitario
    - Costo unitario promedio
    - Rentabilidad unitaria
    - Rentabilidad unitaria promedio

    Si el costo unitario es menor al costo unitario promedio, tiene costo bajo
    Si la rentabilidad unitaria es menor a la rentabilidad unitaria promedio, es rentabilidad baja

    Costo || Rentabilidad || Clasificacion
    Bajo || Alto || Selecto
    Alto || Alto || Estandar
    Bajo || Bajo || Durmiente
    Alto || Bajo || Problema

    Costo Margen = Costo / Margen

    */

    const clasificaciones: CostoMargenResult = costoUnitarioPorPlato.map((costo, index) => {
        const rentabilidad = rentabilidadPorPlato[index]
        
        // Determine cost classification
        const costoBajo = costo < costoUnitarioPorPlatoPromedio
        
        // Determine profitability classification
        const cantidadVendidaAlta = rentabilidad >= rentabilidadPorPlatoPromedio
        
        // Determine classification based on cost and profitability
        if (costoBajo && cantidadVendidaAlta) {
            return "Selecto"
        } else if (!costoBajo && cantidadVendidaAlta) {
            return "Estandar"
        } else if (costoBajo && !cantidadVendidaAlta) {
            return "Durmiente"
        } else {
            return "Problema"
        }
    })

    return clasificaciones
}

interface MillerProps {
    costoUnitarioPorPlato: number[]
    costoUnitarioPorPlatoPromedio: number
    cantidadesVendidas: number[]
    cantidadesVendidasPromedio: number

}


const Miller = async ({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, cantidadesVendidas, cantidadesVendidasPromedio }: MillerProps): Promise<MillerResult> => {
    /*
    7mo informe
    
    - Costo Unitario Por Plato
    - Costo Unitario Por Plato Promedio
    - Cantidades Vendidas
    - Cantidades Vendidas Promedio

    Si Costo Unitario menor al Costo unitario Promedio, es Costo de Alimentos Bajo
    Si Cantidades Vendidas menor a Cantidades Vendidas Promedio, es Cantidad Vendida Bajo

    Costo || Cantidad Vendida || Clasificacion
    Bajo || Alto || Ganador
    Alto || Alto || MarginalAlto
    Bajo || Bajo || MarginalBajo
    Alto || Bajo || Perdedor
    */

    const clasificaciones: MillerResult = costoUnitarioPorPlato.map((costo, index) => {
        const cantidadVendida = cantidadesVendidas[index]
        
        // Determine cost classification
        const costoBajo = costo < costoUnitarioPorPlatoPromedio
        
        // Determine profitability classification
        const cantidadVendidaAlta = cantidadVendida >= cantidadesVendidasPromedio
        
        // Determine classification based on cost and profitability
        if (costoBajo && cantidadVendidaAlta) {
            return "Ganador"
        } else if (!costoBajo && cantidadVendidaAlta) {
            return "MarginalAlto"
        } else if (costoBajo && !cantidadVendidaAlta) {
            return "MarginalBajo"
        } else {
            return "Perdedor"
        }
    })

    return clasificaciones
}

interface UmanProps {
    rentabilidadPorPlato: number[]
    rentabilidadPorPlatoPromedio: number
    rentabilidadPorPlatoTotal: number[]
    rentabilidadPorPlatoTotalPromedio: number
}


const Uman = async ({ rentabilidadPorPlato, rentabilidadPorPlatoPromedio, rentabilidadPorPlatoTotal, rentabilidadPorPlatoTotalPromedio }: UmanProps) => {
    /*
    8vo informe
    - Rentabilidad Por Plato Total Promedio
    - Rentabilidad Por Plato Total: si es mayor al promedio es Alto, sino Bajo
    - Rentabilidad Por Plato: si es mayor al promedio es Alto, sino Bajo
    
    Rentabilidad Por Plato Total || Rentabilidad Por Plato || Clasificacion
    Alto || Bajo || Potencial
    Alto || Alto || Bandera
    Bajo || Bajo || Perdedor
    Bajo || Alto || Dificil de Vender
    */

    const clasificaciones: UmanResult = rentabilidadPorPlato.map((rentabilidad, index) => {
        const rentabilidadUnitariaTotal = rentabilidadPorPlatoTotal[index]
        
        // Determine cost classification
        const rentabilidadBajo = rentabilidad < rentabilidadPorPlatoPromedio
        
        // Determine profitability classification
        const rentabilidadTotalAlta = rentabilidadUnitariaTotal >= rentabilidadPorPlatoTotalPromedio
        
        // Determine classification based on cost and profitability
        if (rentabilidadBajo && rentabilidadTotalAlta) {
            return "Potencial"
        } else if (!rentabilidadBajo && rentabilidadTotalAlta) {
            return "Bandera"
        } else if (rentabilidadBajo && !rentabilidadTotalAlta) {
            return "Perdedor"
        } else {
            return "DificilVender"
        }
    })

    return clasificaciones
}


interface MerrickProps {
    cantidadesVendidas: number[]
    cantidadesVendidasPromedio: number
    rentabilidadPorPlato: number[]
    rentabilidadPorPlatoPromedio: number
}


const Merrick = async ({ cantidadesVendidas, cantidadesVendidasPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio }: MerrickProps): Promise<MerrickResult> => {
    /*
    9no informe:
    - Rentabilidad Por Plato: mayor al promedio es Alto, sino es Bajo
    - Cantidad Vendida: mayor al promedio es Alto, sino Bajo

    Rentabilidad Por Plato || Cantidad Vendida || Clasificacion
    Alto || Alto || A
    Bajo || Alto || B
    Alto || Bajo || C
    Bajo || Bajo || D
    */ 


    const clasificaciones: MerrickResult = rentabilidadPorPlato.map((rentabilidad, index) => {
        const cantidadVendida = cantidadesVendidas[index]
        
        // Determine cost classification
        const rentabilidadBajo = rentabilidad < rentabilidadPorPlatoPromedio
        
        // Determine profitability classification
        const cantidadVendidaAlta = cantidadVendida >= cantidadesVendidasPromedio
        
        // Determine classification based on cost and profitability
        if (!rentabilidadBajo && cantidadVendidaAlta) {
            return "A"
        } else if (rentabilidadBajo && cantidadVendidaAlta) {
            return "B"
        } else if (!rentabilidadBajo && !cantidadVendidaAlta) {
            return "C"
        } else {
            return "D"
        }
    })
    return clasificaciones
}

interface PuntoEquilibrioProps {
    costosFijos: number
    rentabilidadPorPlato: number[]
    rentabilidadPorPlatoPromedio: number
}


const PuntoEquilibrio = async ({ costosFijos, rentabilidadPorPlato, rentabilidadPorPlatoPromedio }: PuntoEquilibrioProps) : Promise<PuntoEquilibrioResult> => {
    /*
    10mo informe

    PuntoEquilibrio(Qe):number = Costos Fijos / Margen de Contribucion Promedio = Cantidad de Platos por vender para cubrir costos fijos

    - Costos Fijos
    - Rentabilidad por Plato


    No asume que siempre se puede llegar exactamente a costos fijos pero se mantiene en un rango de 1 a 5 rentabilidades minimas. 
    Se mantiene lo mas cerca posible a la 
    */

   // Calcular el punto de equilibrio total (Qe) usando la rentabilidad promedio proporcionada
   const qeTotal = costosFijos / rentabilidadPorPlatoPromedio

   // Calcular la suma total de rentabilidad para el cálculo de proporciones
   const sumaRentabilidad = rentabilidadPorPlato.reduce((sum, val) => sum + val, 0)

   // Distribución inicial proporcional (usando floor para empezar por debajo o igual)
   const cantidadesPorPlato: number[] = rentabilidadPorPlato.map(rentabilidad => {
       const proporcion = rentabilidad / sumaRentabilidad
       return Math.floor(qeTotal * proporcion)
   })

   // Calcular la contribución actual con la distribución inicial
   let contribuciónActual = cantidadesPorPlato.reduce((sum, qty, index) => 
       sum + qty * rentabilidadPorPlato[index], 0)

   // Definir el rango aceptable de diferencia (1 a 5 platos en términos de contribución)
   const minRentabilidad = Math.min(...rentabilidadPorPlato)
   const maxDiferencia = 5 * minRentabilidad // Máximo 5 platos de la rentabilidad más baja

   // Ajustar las cantidades para acercarse lo más posible a costosFijos
   while (contribuciónActual < costosFijos) {
       // Encontrar el plato que nos acerque más a costosFijos sin exceder demasiado
       let mejorIndice = -1
       let mejorDiferencia = Infinity

       for (let i = 0; i < rentabilidadPorPlato.length; i++) {
           const nuevaContribución = contribuciónActual + rentabilidadPorPlato[i]
           const diferencia = Math.abs(nuevaContribución - costosFijos)
           if (diferencia < mejorDiferencia && nuevaContribución <= costosFijos + maxDiferencia) {
               mejorDiferencia = diferencia
               mejorIndice = i
           }
       }

       // Si no hay mejora posible sin exceder el rango, salir del bucle
       if (mejorIndice === -1) break

       // Incrementar la cantidad del mejor plato
       cantidadesPorPlato[mejorIndice]++
       contribuciónActual += rentabilidadPorPlato[mejorIndice]

       // Verificar si estamos dentro del rango aceptable
       const diferenciaActual = Math.abs(contribuciónActual - costosFijos)
       if (diferenciaActual <= maxDiferencia) break
   }

   // Si aún estamos por debajo, ajustar para superar ligeramente si es necesario
   if (contribuciónActual < costosFijos) {
       let mejorIndice = 0
       let menorExceso = Infinity
       for (let i = 0; i < rentabilidadPorPlato.length; i++) {
           const exceso = rentabilidadPorPlato[i] - (costosFijos - contribuciónActual)
           if (exceso >= 0 && exceso < menorExceso) {
               menorExceso = exceso
               mejorIndice = i
           }
       }
       cantidadesPorPlato[mejorIndice]++
       contribuciónActual += rentabilidadPorPlato[mejorIndice]
   }

   return cantidadesPorPlato as PuntoEquilibrioResult
}

interface MultiCriterioProps {
    BCGResult: BCGResult
    CostoMargenResult: CostoMargenResult
    MillerResult: MillerResult
    UmanResult: UmanResult
    MerrickResult: MerrickResult
}


const multiCriterio = async ({ BCGResult, CostoMargenResult, MillerResult, UmanResult, MerrickResult }: MultiCriterioProps): Promise<MultiCriterioResult> => {
   /*
    BCG, Costo-Margen, Miller, Uman, Merrick

    Suma los puntajes de cada informe para cada plato. Minimo de 5, maximo de 20. 
    */

    // Mapas de puntajes para cada clasificación
    const bcgPuntajes: Record<string, number> = {
        "Estrella": 4,
        "Impopular": 3,
        "Popular": 2,
        "Perdedor": 1
    }

    const costoMargenPuntajes: Record<string, number> = {
        "Selecto": 4,
        "Estandar": 3,
        "Durmiente": 2,
        "Problema": 1
    }

    const millerPuntajes: Record<string, number> = {
        "Ganador": 4,
        "MarginalAlto": 3,
        "MarginalBajo": 2,
        "Perdedor": 1
    }

    const umanPuntajes: Record<string, number> = {
        "Potencial": 4,
        "Bandera": 3,
        "Perdedor": 2,
        "DificilVender": 1
    }

    const merrickPuntajes: Record<string, number> = {
        "A": 4,
        "B": 3,
        "C": 2,
        "D": 1
    }

    // Calcular el puntaje total para cada plato
    const puntajesTotales: MultiCriterioResult = BCGResult.map((_, index) => {
        const bcgPuntaje = bcgPuntajes[BCGResult[index]]
        const costoMargenPuntaje = costoMargenPuntajes[CostoMargenResult[index]]
        const millerPuntaje = millerPuntajes[MillerResult[index]]
        const umanPuntaje = umanPuntajes[UmanResult[index]]
        const merrickPuntaje = merrickPuntajes[MerrickResult[index]]

        // Sumar todos los puntajes para este plato
        return bcgPuntaje + costoMargenPuntaje + millerPuntaje + umanPuntaje + merrickPuntaje
    })

    return puntajesTotales
}
