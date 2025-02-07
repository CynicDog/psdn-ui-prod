const Switch = ({id, isChecked, onChange}) => {
    return (
        <div className=" form-check form-switch form-inline">
            <label className="form-check-label" htmlFor={id}>
            </label>
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                checked={isChecked}
                onChange={onChange}
            />
        </div>
    );
};

export default Switch