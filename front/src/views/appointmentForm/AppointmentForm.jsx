import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import styles from "./AppointmentForm.module.css";
import { validateAppointment, validTimes } from "../../helpers/validateAppointment";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData).user : null;

  if (!user) {
    alert("Debes iniciar sesión para agendar un turno.");
    navigate("/login");
    return null;
  } 
  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 14); 
    return maxDate.toISOString().split("T")[0];
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      description: ""
    },


    validate: validateAppointment,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await api.post("/appointments/schedule", {
            ...values,
          userId: user.id,
          });

        alert("Turno agendado con éxito");
        resetForm();
        navigate("/myappointments");
      } catch (error) {
        alert(error.response?.data?.error || "Error al agendar turno");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className={styles.container}>
      <h2>Agendar Turno</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
              min={getMinDate()} 
              max={getMaxDate()}
          />
          <p className={styles.info}>
  * Puedes seleccionar fechas entre mañana y los próximos 14 días (lunes a viernes)
</p>
          {formik.errors.date && (
            <div className={styles.error}>{formik.errors.date}</div>
          )}
        </div>

        <div>
          <label>Hora:</label>
          <select
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
          >
            <option value="">Seleccionar hora</option>
            {validTimes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {formik.errors.time && (
            <div className={styles.error}>{formik.errors.time}</div>
          )}
        </div>

        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && (
            <div className={styles.error}>{formik.errors.description}</div>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          Agendar
        </button>
      </form>
    </div>
  );

};
export default AppointmentForm;
