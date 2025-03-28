import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { executeInform } from '@/services/informesFunctions';
import Plate from '@/models/plate';


/*
Ponerle el modelo de Informes, no de Plates
*/


// 📌 POST: Crear un nuevo informe
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const plateData = await req.json();

    const mesInformes: string = plateData.Mes_informes
    const informesCategory: string = plateData.Informes_category

    const data = await Plate.find({ Mes_plato: mesInformes, Categoria_plato: informesCategory })

    const nombresPlatos = data.map((plato) => plato.Nombre_plato)

    const response = await executeInform(data)

    //response tiene que crear el informe en mongodb

    const payload = [nombresPlatos, response]

    return NextResponse.json({ message: 'Inform created successfully', data: payload  }, { status: 201 });
  } catch (error) {
    console.error('❌ Error adding plate:', error);
    return NextResponse.json({ message: 'Error adding plate', error }, { status: 500 });
  }
}

// 📌 GET: Obtener todos los informes creados
export async function GET(req: NextRequest) {

  try {
    await connectToDatabase();
    // const plates = await Plate.find();

    //aca no deberia buscar Plate, sino que deberia buscar Informes hechos. 
    const informes = {}
    return NextResponse.json({ message: 'Plates retrieved successfully', data: informes }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching plates:', error);
    return NextResponse.json({ message: 'Error fetching plates', error }, { status: 500 });
  }
}

// 📌 PUT: ACTUALIZAR INFORME: POR HACER: DE REPENTE ELIMINARLO PORQUE SI ACTUALIZAS UN INFORME CAMBIA EL RESULTADO
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    await connectToDatabase();
    const updatedPlate = await Plate.findByIdAndUpdate(id, await req.json(), { new: true });

    if (!updatedPlate) return NextResponse.json({ message: 'Plate not found' }, { status: 404 });

    return NextResponse.json({ message: 'Plate updated successfully', data: updatedPlate }, { status: 200 });
  } catch (error) {
    console.error('❌ Error updating plate:', error);
    return NextResponse.json({ message: 'Error updating plate', error }, { status: 500 });
  }
}

// 📌 DELETE: Eliminar un INFORME: POR HACER 
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    await connectToDatabase();
    const deletedPlate = await Plate.findByIdAndDelete(id);

    if (!deletedPlate) return NextResponse.json({ message: 'Plate not found' }, { status: 404 });

    return NextResponse.json({ message: 'Plate deleted successfully', data: deletedPlate }, { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting plate:', error);
    return NextResponse.json({ message: 'Error deleting plate', error }, { status: 500 });
  }
}
