const TextArea = ({
                        id,
                        value,
                        onChange,
                        border = '',
                        width, height = '30px',
                        className = 'form-control form-control-sm'
                    }) => {
    const classes = [
        border ? `border border-${border}` : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <textarea
            id={id}
            className={classes}
            value={value || ''}
            onChange={onChange}
            style={{ width, height }}
        />
    );
};

export default TextArea;
