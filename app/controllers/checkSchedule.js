// Middleware function to check if appointment time is within employee's schedule
const EmploiDuTemps = require('../models/emploiDuTemps.model')

exports.checkSchedule = async (req, res, next) => {
        const { Employe, Heure } = req.body;
        // Fetch employee's schedule
        const schedule = await EmploiDuTemps.findOne({ employe: Employe });
        // if (!schedule) {
        //     return res.status(404).json({ message: "Edt not found for this employee" });
        // }

        // Extracting start and end time from schedule
        const { matinDebut, matinFin, soirDebut, soirFin } = schedule ;

        // Convert appointment time to minutes for easy comparison
        const appointmentTime = convertToMinutes(Heure);

        // Convert schedule times to minutes for comparison
        const morningStart = convertToMinutes(matinDebut);
        const morningEnd = convertToMinutes(matinFin);
        const eveningStart = convertToMinutes(soirDebut);
        const eveningEnd = convertToMinutes(soirFin);

        // Check if appointment time falls within morning or evening schedule
        if ((appointmentTime >= morningStart && appointmentTime <= morningEnd) ||
            (appointmentTime >= eveningStart && appointmentTime <= eveningEnd)) {
            next(); // Appointment time is within schedule, proceed
        } else {
            return res.status(400).json({ message: "Le rendez-vous sélectionné n'est pas dans l'emploi du temps de l'employé " });
        }
   
};

// Helper function to convert time to minutes for comparison
function convertToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}
