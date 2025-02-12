const Span = ({
                  children = '',
                  onClick,
                  variant = '',
                  fontSize = '',
                  fontWeight = '',
                  badge = '',
                  underline = false,
                  p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                  m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                  cursor = '',
                  className = ''
}) => {
    const classes = [
        variant ? `text-${variant}` : '',
        fontSize ? `fs-${fontSize}` : '',
        fontWeight ? `fw-${fontWeight}` : '',
        badge ? `badge-${badge}` : '',
        p ? `p-${p}` : '',
        px ? `px-${px}` : '',
        py ? `py-${py}` : '',
        pt ? `pt-${pt}` : '',
        pb ? `pb-${pb}` : '',
        ps ? `ps-${ps}` : '',
        pe ? `pe-${pe}` : '',
        m ? `m-${m}` : '',
        mx ? `mx-${mx}` : '',
        my ? `my-${my}` : '',
        mt ? `mt-${mt}` : '',
        mb ? `mb-${mb}` : '',
        ms ? `ms-${ms}` : '',
        me ? `me-${me}` : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} onClick={onClick} style={{
            cursor: cursor,
            textDecoration: underline ? 'underline solid #AFCBFF 4px' : 'none'
        }}>
            {children}
        </span>
    );
};

export default Span;
