const DraggableArea = ({
                           children,
                           order,
                           isDragging = false,
                           isOver = false,
                           onClick,
                           onDragStart,
                           onDragEnd,
                           onDragOver,
                           onDragLeave,
                           onDrop,
                           flex = false,
                           border = '',
                           rounded = '',
                           shadow = '',
                           bg = '',
                           justifyContent = '',
                           alignItems = '',
                           gap = '',
                           p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                           m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                           className = '',
                           style = {},
                       }) => {

    const classes = [
        isOver? 'border border-danger' : '',
        flex ? 'd-flex' : '',
        border ? `border border-${border}` : '',
        rounded ? `rounded rounded-${rounded}` : '',
        shadow ? `shadow shadow-${shadow}` : '',
        bg ? `bg-${bg}` : '',
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
        <div
            data-order={order}
            draggable
            className={classes}
            onClick={onClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            style={{
                opacity: isDragging || isOver ? 0.3 : 1,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default DraggableArea;
