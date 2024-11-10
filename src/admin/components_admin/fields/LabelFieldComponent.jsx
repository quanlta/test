import React from "react";

export default function LabelFieldComponent({ label, labelDir, fieldSize, option, type, placeholder,onSearch, ...rest }) {
    return (
        <div className={`mc-label-field-group ${ label ? labelDir || "label-col" : "" }`}>
            {label && <label className="mc-label-field-title">{ label }</label>}
            {type ? 
                <input 
                    type={ type || "text" } 
                    placeholder={ placeholder || "Type here..." } 
                    className={`mc-label-field-input ${ fieldSize || "w-md h-sm" }`} 
                    onChange={onSearch} // Gán onChange cho input
                    { ...rest } 
                />
            :
                <>
                    <select style={{ backgroundImage: 'url(/images/dropdown.svg)' }} className={`mc-label-field-select ${ fieldSize || "w-md h-sm" }`} { ...rest }>
                        {option.map((item, index) => (
                            <option key={ index } value={ item }>{item}</option>
                        ))}
                    </select>
                </>
            }
        </div>
    )
}
