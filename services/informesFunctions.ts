import Plate from "@/models/plate";


//Valor de Venta = precio final sin impuestos ni recargo por consumo

export const executeInform = async (Mes_informes: string, Informes_category: string) => {
    // 1. Recibir el mes y la categoria de informes
    // 2. Encontrar todos los platos de esa categoria en esos meses
    // 3. Separar la data 
    // 4. Ejecutar los informes
    // 5. Retornar los resultados

    const data = Plate.find({ Mes_plato: Mes_informes, Categoria_plato: Informes_category })

    //la data viene del find de MongoDB
    //data artificial
    const valoresVentas: number[] = [1,2,3]

    const cantidadesVendidas: number[] = [1,2,3]
    const cantidadVendidaTotalAcumulada : number = cantidadesVendidas.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);
    
    const ventasTotalesPorPlato: number[] = [1,2,3] //Ventas_Total en modelo Plate: valoresVentas * cantidadesVendidas
    const ventasTotalesPorPlatoAcumuladas: number = ventasTotalesPorPlato.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

    const rentabilidadPorPlato: number[] = [1,2,3]
    const rentabilidadPorPlatoPromedio: number = rentabilidadPorPlato.reduce((acc, curr) => acc + curr, 0) / rentabilidadPorPlato.length; //promedio de rentabilidadPorPlato
    const rentabilidadPorPlatoTotal: number[] = [1,2,3] //cantidadVendida * rentabilidadPorPlato
    const rentabilidadPorPlatoTotalAcumulada : number = rentabilidadPorPlatoTotal.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);  

    const diasPlato: number[] = [1,2,3]
    const diasPlatoAcumulados: number = diasPlato.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0);

    const costoUnitarioPorPlato: number[] = [1,2,3]
    const costoUnitarioPorPlatoPromedio: number = Number((costoUnitarioPorPlato.reduce((acc, curr) => acc + curr, 0) / costoUnitarioPorPlato.length).toFixed(2)); //promedio de costoUnitarioPorPlato

    //informes
    const omnesResult = await omnesFunction({ valoresVentas, cantidadesVendidas }) 
    const BCGResult = await BCGPop({ rentabilidadPorPlato, cantidadVendidaTotalAcumulada, cantidadesVendidas })
    const ADLResult = await ADL({ cantidadesVendidas, rentabilidadPorPlato })
    const IRPResult = await IRP({ ventasTotalesPorPlato, ventasTotalesPorPlatoAcumuladas, rentabilidadPorPlatoTotal, rentabilidadPorPlatoTotalAcumulada })
    const indicePopularidadResult = await IndexPopularidad({ diasPlato, diasPlatoAcumulados, cantidadesVendidas, cantidadVendidaTotalAcumulada })
    const CostoMargenResult = await CostoMargen({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio })

    return data
}

interface OmnesFunctionProps {
    valoresVentas: number[] //array de los valores de venta de los platos en el mes y categoria indicados
    cantidadesVendidas: number[] //array de las cantidades vendidas de los platos en el mes y categoria indicados
}

export const omnesFunction = async ({ valoresVentas, cantidadesVendidas} : OmnesFunctionProps) => {
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

    const cumpleOmnes1 = platosZ1 + platosZ3 === platosZ2 ? "Cumple" : "No cumple"

    /*
    2do principio:
    La proporción entre el valor de venta más bajo y el valor de venta más alto debe ser de hasta 2.5 veces hasta 9 platos. A partir de 10 platos o más, debe ser de máximo 3 veces.

    */

    //1. Calculamos la cantidad de platos
    const cantidadPlatos = valoresVentas.length 

    //2. Calculamos la proporcion entre el valor de venta mas alto y el mas bajo
    const proporcionPlatos = valorMayor / valorMenor

    //3. Definimos si cumple o no con el 2do principio de Omnes
    const cumpleOmnes2 = cantidadPlatos <= 9 ? (proporcionPlatos <= 2.5 ? 'Cumple' : 'No cumple') : (proporcionPlatos <= 3 ? 'Cumple' : 'No cumple')



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


    const cumpleOmnes4 = `Promoción debe ser menor a ${Number(PMP.toFixed(2))}`

    const omnesResult = {
        '1 principio': cumpleOmnes1,
        '2 principio': cumpleOmnes2,
        '3 principio': cumpleOmnes3,
        '4 principio': cumpleOmnes4
    }

    return omnesResult
}

interface BCGPopProps {
    rentabilidadPorPlato: number[]
    cantidadVendidaTotalAcumulada: number
    cantidadesVendidas: number[]
}

type BCGClassification = "Estrella" | "Impopular" | "Popular" | "Perdedor"

export const BCGPop = async ({ rentabilidadPorPlato, cantidadVendidaTotalAcumulada, cantidadesVendidas }: BCGPopProps): Promise<BCGClassification[]>  => {
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
    
    const resultados: BCGClassification[] = cantidadesVendidas.map((cantidad, index) => {
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

type ADLResult = [
    "Crecimiento" | "Introduccion" | "Madurez" | "Declinacion",
    "Dominante" | "Fuerte" | "Favorable" | "Debil" | "Marginal"
] //la primera categoria es Rentabilidad, la segunda es Cantidad Vendida

export const ADL = async ({ cantidadesVendidas, rentabilidadPorPlato }: ADLProps): Promise<ADLResult[]> => {
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

type IRPResult = number[]

export const IRP = async ({ ventasTotalesPorPlato, ventasTotalesPorPlatoAcumuladas, rentabilidadPorPlatoTotalAcumulada, rentabilidadPorPlatoTotal }: IRPProps):Promise<IRPResult> => {
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

type IndexPopularidadResult = number[]

export const IndexPopularidad = async ({ diasPlato, diasPlatoAcumulados, cantidadesVendidas, cantidadVendidaTotalAcumulada }: IndexPopularidadProps): Promise<IndexPopularidadResult> => {
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

type CostoMargenResult = ("Selecto" | "Estandar" | "Durmiente" | "Problema")[]

export const CostoMargen = async ({ costoUnitarioPorPlato, costoUnitarioPorPlatoPromedio, rentabilidadPorPlato, rentabilidadPorPlatoPromedio }: CostoMargenProps): Promise<CostoMargenResult> => {
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
        const rentabilidadAlta = rentabilidad >= rentabilidadPorPlatoPromedio
        
        // Determine classification based on cost and profitability
        if (costoBajo && rentabilidadAlta) {
            return "Selecto"
        } else if (!costoBajo && rentabilidadAlta) {
            return "Estandar"
        } else if (costoBajo && !rentabilidadAlta) {
            return "Durmiente"
        } else {
            return "Problema"
        }
    })

    return clasificaciones
}

