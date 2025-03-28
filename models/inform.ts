import  { Schema, model, models } from 'mongoose';

const InformSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    Mes_informes : {type: String, required: true},
    Informes_category : {type: String, required: true},
    //No se si deberia tener todos los resultados de todos los informes. 


}, {timestamps: true})

const Inform = models.Inform || model('Inform', InformSchema)

export default Inform
