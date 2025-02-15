const Area = ({
                  children,
                  onClick,
                  flex = false,
                  flexDirection = '',
                  flexWrap = '',
                  border = '',
                  borderTop = '',
                  borderBottom = '',
                  borderStyle = '',
                  borderRadius = '',
                  rounded = '',
                  shadow = '',
                  bg = '',
                  textBg = '',
                  textPosition = '',
                  justifyContent = '',
                  alignItems = '',
                  gap = '',
                  p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                  m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                  marginTop = '',
                  width = '', height = '', maxWidth = '', maxHeight = '',
                  fontSize = '',
                  cursor = '',
                  transition = '',
                  className = '',
                  style = {},
              }) => {
    const classes = [
        flex ? 'd-flex' : '',
        flexDirection ? `flex-${flexDirection}` : '',
        flexWrap ? `flex-${flexWrap}` : '',
        border ? `border border-${border}` : '',
        borderStyle ? `border-${borderStyle}` : '',
        borderTop ? `border-top border-${borderTop}` : '',
        borderBottom ? `border-bottom border-${borderBottom}` : '',
        rounded ? `rounded rounded-${rounded}` : '',
        shadow ? `shadow shadow-${shadow}` : '',
        bg ? `bg-${bg}` : '',
        textBg ? `text-bg-${textBg}` : '',
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

    const inlineStyles = {
        width,
        height,
        maxWidth,
        maxHeight,
        cursor,
        transition,
        marginTop,
        borderRadius,
        fontSize,
        ...style,
    };

    return (
        <div className={classes} onClick={onClick} style={inlineStyles}>
            {children}
        </div>
    );
};

export default Area;
