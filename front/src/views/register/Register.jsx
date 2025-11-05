import { useFormik } from "formik";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import validateUser from "../../helpers/validateUser";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateUser,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const response = await api.post("/users/register", {
            ...values,
            nDni: Number(values.nDni),
          });

        setStatus("Registro exitoso");

        alert("🎉 Tu cuenta fue creada exitosamente");

        resetForm();

        navigate("/login");
      } catch (error) {
        console.error("Error al registrar:", error);
        const backendError =
          error.response?.data?.error || error.response?.data?.message;
        setStatus(backendError || "Error al registrar");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const fields = [
    { id: "name", type: "text", placeholder: "Nombre completo" },
    { id: "email", type: "text", placeholder: "Correo electrónico" },
    { id: "birthdate", type: "date", placeholder: "" },
    { id: "nDni", type: "text", placeholder: "DNI" },
    { id: "username", type: "text", placeholder: "Nombre de usuario" },
    { id: "password", type: "password", placeholder: "Contraseña" },
    { id: "confirmPassword", type: "password", placeholder: "Confirmar contraseña" },
  ];

  return (
    <div className={styles.registerBackground}>
    <div className={styles.container}>
      <h2>Registrarse</h2>
      <form onSubmit={formik.handleSubmit}>
        {fields.map(({ id, type, placeholder }) => (
          <div key={id}>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              className={styles.input}
              value={formik.values[id]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[id] && formik.errors[id] && (
              <div className={styles.error}>{formik.errors[id]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className={styles.button}
          disabled={formik.isSubmitting}
        >
          Registrarse
        </button>
      </form>

      {formik.status && (
        <p className={styles.message}>{formik.status}</p>
      )}
    </div>
    </div>
  );
};

export default Register;
