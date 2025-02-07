const Span = ({
                  children = '',
                  fontSize = '',
                  fontWeight = '',
                  badge = '',
                  badgeColor = '',
                  p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                  m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                  className = ''
}) => {
    const classes = [
        fontSize ? `fs-${fontSize}` : '',
        fontWeight ? `fw-${fontWeight}` : '',
        badge ? 'badge' : '',
        badge && badgeColor ? `badge-${badgeColor}` : '',
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
        <span className={classes}>
            {children}
        </span>
    );
};

export default Span;
