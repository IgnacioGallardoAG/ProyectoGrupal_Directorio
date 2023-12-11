import db from "../database/db.config";

export const ConsultasSQL = async (req, res) => {
    return res.status(200).json({ message: "Consultas SQL" });
}