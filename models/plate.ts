import mongoose, { Schema, model, models } from 'mongoose';

const PlateSchema = new Schema({
  CodInt: { type: Number, required: true },
  Mes_plato: { type: String, required: true },
  Categoria_plato: { type: String, required: true },
  Nombre_plato: { type: String, required: true },
  Cantidad_vendida_plato: { type: Number, required: true },
  Precio_plato: { type: Number, required: true },
  Costo_plato: { type: Number, required: true },
  Dias_plato: { type: Number, required: true }
  //Valor_Venta: Precio final del plato - IGV - Rec_consumo ///// Precio_plato / (1 + IGV + Rec_consumo)
  //Margen_total: Cantidad_vendida * Rentabilidad
  //Rentabilidad: Valor_venta - Costo_plato
  //Ventas totales: Cantidad_vendida * Valor Venta
}, { timestamps: true });

const Plate = models.Plate || model('Plate', PlateSchema);
export default Plate;
