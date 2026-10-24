import * as yup from "yup";
// Regex: Mínimo 12 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#\-_~^()+=<>{}[\]\/\\]).{12,}$/;

export const loginSchema = yup.object().shape({
  nombre_usuario: yup
    .string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre de usuario no puede exceder 50 caracteres"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(1, "La contraseña es requerida"),
});

export const registerUserSchema = yup.object().shape({
  nombre_usuario: yup
    .string()
    .required("El nombre de usuario es requerido")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre de usuario no puede exceder 50 caracteres"),
  correo: yup
    .string()
    .required("El correo es requerido")
    .email("El correo debe tener un formato válido")
    .max(255, "El correo no puede exceder 255 caracteres"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(12, "La contraseña debe tener al menos 12 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/\d/, "Debe contener al menos un número")
    .matches(/[@$!%*?&.#\-_~^()+=<>{}[\]\/\\]/, "Debe contener al menos un símbolo especial"),
  contrasena_hash: yup
    .string()
    .min(12, "La contraseña debe tener al menos 12 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/\d/, "Debe contener al menos un número")
    .matches(/[@$!%*?&.#\-_~^()+=<>{}[\]\/\\]/, "Debe contener al menos un símbolo especial"),
});

export const registerEmpresaSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre de la empresa es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  calle: yup
    .string()
    .required("La calle es requerida")
    .max(255, "La calle no puede exceder 255 caracteres"),
  comuna: yup
    .string()
    .required("La comuna es requerida")
    .max(100, "La comuna no puede exceder 100 caracteres"),
  region: yup
    .string()
    .required("La región es requerida")
    .max(100, "La región no puede exceder 100 caracteres"),
  telefono: yup
    .string()
    .required("El teléfono es requerido")
    .max(50, "El teléfono no puede exceder 50 caracteres"),
  correo: yup
    .string()
    .required("El correo corporativo es requerido")
    .email("El correo debe tener un formato válido")
    .max(255, "El correo no puede exceder 255 caracteres"),
});
