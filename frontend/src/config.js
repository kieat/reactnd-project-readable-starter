import React from 'react';

export const rootURL = process.env.REACT_APP_BACKEND
	//? `${window.location.protocol}//${window.location.hostname}:3001`
	? `${process.env.REACT_APP_BACKEND}`
	//: `${window.location.origin}`.replace('3000','3001')
	//:	`http://localhost:3001`
	:	`${window.location.protocol}//${window.location.hostname}:3001`

const headers = {
	headers: {
		'Authorization': 'whatever-you-want',
		'Accept': '*/*'
	}
}

export const requestConfig = process.env.REACT_APP_BACKEND && process.env.REACT_APP_BACKEND !== window.location.origin
	? {
			...headers,
		  credentials: 'include',
			withCredentials: true
	}
	: {
		...headers,
		credentials: 'include'
	}


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
