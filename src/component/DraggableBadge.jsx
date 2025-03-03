const DraggableBadge = ({
                            itemId,
                            children = '',
                            onClick,
                            onDragStart,
                            onDragEnd,
                            onDragOver,
                            onDragLeave,
                            onDrop,
                            isDragging = false,
                            isOver = false,
                            badge = '',
                            fontSize = '',
                            fontWeight = '',
                            cursor = 'grab',
                            noSelect = false,
                            p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                            m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                            className = '',
                            style = {},
                        }) => {
    const classes = [
        isOver? 'border border-danger' : '',
        badge ? `badge-${badge}` : '',
        fontSize ? `fs-${fontSize}` : '',
        fontWeight ? `fw-${fontWeight}` : '',
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
        <span
            data-item-id={itemId}
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
                cursor,
                userSelect: noSelect ? 'none' : '',
                ...style,
            }}
        >
            {children}
        </span>
    );
};

export default DraggableBadge;
