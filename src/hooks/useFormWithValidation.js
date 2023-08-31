import { useState } from 'react';

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Обработчик изменений в инпуте
  const handleChange = event => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value.trim(),
    });

    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    setIsValid(event.target.closest('form').checkValidity());
  }

  return { values, handleChange, errors, setErrors, isValid, setValues };
}

export default useFormWithValidation;