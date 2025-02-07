const Select = ({ options, id, value, onChange }) => {

    return (
        <select id={id} value={value} onChange={onChange} className="border-0 bg-body">
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default Select