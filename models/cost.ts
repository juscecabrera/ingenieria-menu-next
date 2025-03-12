import mongoose, { Schema } from 'mongoose';

const costSchema = new Schema({
  Mes: { type: String, required: true, unique: true },
  Sueldo_Cocina: { type: Number, default: 0 },
  Sueldo_Servicio: { type: Number, default: 0 },
  Sueldo_Administrativos: { type: Number, default: 0 },
  Alquiler: { type: Number, default: 0 },
  Depreciacion: { type: Number, default: 0 },
  Servicios_basicos: { type: Number, default: 0 },
  Publicidad: { type: Number, default: 0 },
  Internet: { type: Number, default: 0 },
  Otros: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Cost = mongoose.models.Cost || mongoose.model('Cost', costSchema);

export default Cost;
