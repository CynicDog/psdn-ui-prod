const Dropdown = ({
                           options,
                           id,
                           value,
                           onChange,
                           border = '',
                           width,
                           className = 'form-select form-select-sm'
                       }) => {

    const classes = [
        border ? `border border-${border}` : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <select
            id={id}
            className={classes}
            value={value}
            onChange={onChange}
            style={{width: width}}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default Dropdown
