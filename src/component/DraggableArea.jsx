import { useState } from "react";

const DraggableArea = ({
                           children,
                           onClick,
                           onDragStart,
                           onDragEnd,
                           onDragOver,
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
                           draggable = true
                       }) => {

    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (e) => {
        if (onDragStart) {
            onDragStart(e);
        }
        setDraggedIndex(true);
        e.dataTransfer.setData("text/plain", "dragging");
    };

    const handleDragEnd = (e) => {
        if (onDragEnd) {
            onDragEnd(e);
        }
        setDraggedIndex(null);
    };

    const handleDragOver = (e) => {
        if (onDragOver) {
            onDragOver(e);
        }
        e.preventDefault();
    };

    const handleDrop = (e) => {
        if (onDrop) {
            onDrop(e);
        }
        e.preventDefault();
        setDraggedIndex(null);
    };

    const classes = [
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
            className={classes}
            style={style}
            onClick={onClick}
            draggable={draggable}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </div>
    );
};

export default DraggableArea;
