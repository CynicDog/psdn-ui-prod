const InputField = ({
                        id,
                        value,
                        type = 'text',
                        onChange,
                        border = '',
                        width,
                        className = 'form-control form-control-sm'
                    }) => {
    const classes = [
        border ? `border border-${border}` : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <input
            id={id}
            type={type}
            className={classes}
            value={value || ''}
            onChange={onChange}
            style={{ width: width }}
        />
    );
};

export default InputField;
