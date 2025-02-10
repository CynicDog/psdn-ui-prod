const Area = ({
                  children,
                  onClick,
                  flex = false,
                  border = '',
                  rounded = '',
                  shadow = '',
                  bg = '',
                  textPosition = '',
                  justifyContent = '',
                  alignItems = '',
                  gap = '',
                  p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                  m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                  className = '',
                  style = {}
}) => {
    const classes = [
        flex ? 'd-flex' : '',
        border ? `border border-${border}` : '',
        rounded ? `rounded rounded-${rounded}` : '',
        shadow ? `shadow shadow-${shadow}` : '',
        bg ? `bg-${bg}` : '',
        textPosition ? `text-${textPosition}` : '',
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
        <div className={classes} onClick={onClick} style={style}>
            {children}
        </div>
    );
};

export default Area; 