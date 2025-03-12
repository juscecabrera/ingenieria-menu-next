import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Cost from '@/models/cost';

// 📌 POST: Crear un nuevo costo
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const costData = await req.json();
    const newCost = new Cost(costData);
    await newCost.save();
    return NextResponse.json({ message: 'Cost added successfully', data: newCost }, { status: 201 });
  } catch (error) {
    console.error('❌ Error adding cost:', error);
    return NextResponse.json({ message: 'Error adding cost', error }, { status: 500 });
  }
}

// 📌 GET: Obtener todos los costos
export async function GET() {
  try {
    await connectToDatabase();
    const costs = await Cost.find();
    return NextResponse.json({ message: 'Costs retrieved successfully', data: costs }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching costs:', error);
    return NextResponse.json({ message: 'Error fetching costs', error }, { status: 500 });
  }
}

// 📌 PUT: Actualizar un costo por ID
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    await connectToDatabase();
    const updatedCost = await Cost.findByIdAndUpdate(id, await req.json(), { new: true });

    if (!updatedCost) return NextResponse.json({ message: 'Cost not found' }, { status: 404 });

    return NextResponse.json({ message: 'Cost updated successfully', data: updatedCost }, { status: 200 });
  } catch (error) {
    console.error('❌ Error updating cost:', error);
    return NextResponse.json({ message: 'Error updating cost', error }, { status: 500 });
  }
}

// 📌 DELETE: Eliminar un costo por ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'ID is required' }, { status: 400 });

    await connectToDatabase();
    const deletedCost = await Cost.findByIdAndDelete(id);

    if (!deletedCost) return NextResponse.json({ message: 'Cost not found' }, { status: 404 });

    return NextResponse.json({ message: 'Cost deleted successfully', data: deletedCost }, { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting cost:', error);
    return NextResponse.json({ message: 'Error deleting cost', error }, { status: 500 });
  }
}
