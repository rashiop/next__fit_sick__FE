import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    const { value, name, type } = e.target;

    let inputValue = value ?? 0;
    if (type === 'number') inputValue = +value;
    else if (type === 'file') [inputValue] = e?.target?.files;

    setInputs({
      ...inputs,
      [name]: inputValue,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, _]) => [key, ''])
    );
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
