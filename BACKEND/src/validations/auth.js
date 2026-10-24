const yup = require("yup");

const loginSchema = yup.object().shape({
  nombre_usuario: yup
    .string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre de usuario no puede exceder 50 caracteres"),
  password: yup
    .string()
    .required("La contraseña es requerida"),
});

const passwordValidation = yup
  .string()
  .required("La contraseña es requerida")
  .min(12, "La contraseña debe tener al menos 12 caracteres")
  .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
  .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
  .matches(/\d/, "La contraseña debe contener al menos un número")
  .matches(/[@$!%*?&.#\-_~^()+=<>{}[\]\/\\]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&.#-_~^()+=<>{}[])");

const registerSchema = yup.object().shape({
  nombre_usuario: yup
    .string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre de usuario no puede exceder 50 caracteres"),
  password: passwordValidation,
  correo: yup
    .string()
    .required("El correo es requerido")
    .email("El correo debe tener un formato válido")
    .max(255, "El correo no puede exceder 255 caracteres"),
  rut: yup
    .string()
    .matches(/^([0-9]{1,2}(\.[0-9]{3})*-[0-9kK]|[0-9]+-[0-9kK])$/, "El RUT debe tener formato válido")
    .optional(),
});

module.exports = {
  loginSchema,
  registerSchema,
};