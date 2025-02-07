const Area = ({
                  children,
                  onClick,
                  border = false, borderWidth = '',
                  rounded = false, roundedSize = '',
                  shadow = false, shadowSize = '',
                  flex = false,
                  justifyContent = '',
                  alignItems = '',
                  gap = '',
                  p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                  m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                  className = '',
}) => {
    const classes = [
        border ? 'border' : '',
        borderWidth ? `border-${borderWidth}` : '',
        rounded ? 'rounded' : '',
        roundedSize ? `rounded-${roundedSize}` : '',
        shadow ? 'shadow' : '',
        shadowSize ? `shadow-${shadowSize}` : '',
        flex ? 'd-flex' : '',
        justifyContent ? `justify-content-${justifyContent}` : '',
        alignItems ? `align-items-${alignItems}` : '',
        gap ? `gap-${gap}` : '',
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
        <div className={classes} onClick={onClick}>
            {children}
        </div>
    );
};

export default Area; 