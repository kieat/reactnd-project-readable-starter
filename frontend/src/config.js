import axios from 'axios'
import React from 'react';

export const rootURL = 'http://localhost:3001'

axios.defaults.headers.common['Authorization'] = 'udacity-project'

export const renderField = ({
  input,
  type,
  placeholder,
  optionList,
  meta: { touched, error, warning }
}) => (
  <div className="parent">
    { type === 'text' && <input {...input} type={type} placeholder={placeholder} /> }
    { type === 'textarea' && <textarea {...input} placeholder={placeholder} /> }
    { type === 'select' && <select {...input}><optgroup label={placeholder}>{optionList.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</optgroup></select> }

    {touched &&
      ((error && <div className="parent"><span>{error}</span></div>) ||
        (warning && <div className="parent"><span>{warning}</span></div>))}
  </div>
)
