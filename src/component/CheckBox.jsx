const CheckBox = ({ checked, onChange, className = "", disabled = false }) => {
    return (
        <input
            type="checkbox"
            className={`form-check-input ${className}`.trim()}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default CheckBox;
