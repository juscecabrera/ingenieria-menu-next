import { Schema, model, models } from 'mongoose';

const InformSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    Mes_informes: { type: String, required: true },
    Informes_category: { type: String, required: true },
    results: {
        omnesResult: { type: [Number], required: true },
        BCGResult: { type: [String], required: true },
        ADLResult: {
            type: [[String]], // Array con dos strings dentro
            required: true
        },
        IRPResult: { type: [Number], required: true },
        indicePopularidadResult: { type: [Number], required: true },
        CostoMargenResult: { type: [String], required: true },
        MillerResult: { type: [String], required: true },
        UmanResult: { type: [String], required: true },
        MerrickResult: { type: [String], required: true },
        PuntoEquilibrioResult: { type: [Number], required: true },
        MultiCriterioResult: { type: [Number], required: true }
    }
}, { timestamps: true });

const Inform = models.Inform || model('Inform', InformSchema);

export default Inform;

