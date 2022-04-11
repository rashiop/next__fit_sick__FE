import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    const { value, name, type } = e.target;

    let inputValue = value;
    if (type === 'number') inputValue = parseInt(value);
    else if (type === 'file') [inputValue] = e?.target?.files;

    setInputs({
      ...inputs,
      [name]: inputValue,
    });
  }

  function resetForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, _]) => [key, ''])
    );
    setInputs(blankState);
  }

  function clearForm() {}

  return { inputs, handleChange, resetForm, clearForm };
}
