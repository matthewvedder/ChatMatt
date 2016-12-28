import React from 'react'

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 18,
    alignSelf: 'flexEnd'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
}

const Input = ({ placeholder, label, onChangeText, value, onChange }) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{ label }</span>
      <input
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
