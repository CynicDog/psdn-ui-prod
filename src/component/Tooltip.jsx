import { useState, useRef, useEffect } from "react";

const Tooltip = ({
                     content,
                     position = "top",
                     children,
                     border = '',
                     rounded = '',
                     bg = '',
                     shadow = '',
                     gap = 2,
                     p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                     shownWhen = "mouseEnter", // Default behavior
                 }) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ left: 0, top: 0 });
    const [ready, setReady] = useState(false);

    const targetRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (visible && targetRef.current && tooltipRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let newCoords = {};

            switch (position) {
                case "top":
                    newCoords = {
                        left: targetRect.left + window.scrollX + targetRect.width / 2 - tooltipRect.width / 2,
                        top: targetRect.top + window.scrollY - tooltipRect.height - gap,
                    };
                    break;
                case "bottom":
                    newCoords = {
                        left: targetRect.left + window.scrollX + targetRect.width / 2 - tooltipRect.width / 2,
                        top: targetRect.bottom + window.scrollY + gap,
                    };
                    break;
                case "left":
                    newCoords = {
                        left: targetRect.left + window.scrollX - tooltipRect.width - gap,
                        top: targetRect.top + window.scrollY + targetRect.height / 2 - tooltipRect.height / 2,
                    };
                    break;
                case "right":
                    newCoords = {
                        left: targetRect.right + window.scrollX + gap,
                        top: targetRect.top + window.scrollY + targetRect.height / 2 - tooltipRect.height / 2,
                    };
                    break;
                default:
                    newCoords = {};
            }

            setCoords(newCoords);
            setReady(true);
        } else {
            setReady(false);
        }
    }, [visible]);

    useEffect(() => {
        if (shownWhen === "click") {
            const handleClickOutside = (event) => {
                if (
                    tooltipRef.current &&
                    !tooltipRef.current.contains(event.target) &&
                    targetRef.current &&
                    !targetRef.current.contains(event.target)
                ) {
                    setVisible(false);
                }
            };

            if (visible) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }

            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [visible, shownWhen]);

    const handleTrigger = () => {
        if (shownWhen === "mouseEnter") {
            setVisible(true);
        } else if (shownWhen === "click") {
            setVisible((prev) => !prev); // Toggle on click
        }
    };

    const handleMouseLeave = () => {
        if (shownWhen === "mouseEnter") {
            setVisible(false);
        }
    };

    const classes = [
        'text-secondary',
        border ? `border border-${border}` : '',
        rounded ? `rounded rounded-${rounded}` : '',
        bg ? `bg-${bg}` : '',
        shadow ? `shadow shadow-${shadow}` : '',
        p ? `p-${p}` : '',
        px ? `px-${px}` : '',
        py ? `py-${py}` : '',
        pt ? `pt-${pt}` : '',
        pb ? `pb-${pb}` : '',
        ps ? `ps-${ps}` : '',
        pe ? `pe-${pe}` : '',
    ].filter(Boolean).join(' ');

    return (
        <div
            ref={targetRef}
            onMouseEnter={shownWhen === "mouseEnter" ? handleTrigger : undefined}
            onMouseLeave={shownWhen === "mouseEnter" ? handleMouseLeave : undefined}
            onClick={shownWhen === "click" ? handleTrigger : undefined}
            style={{ display: "inline-block", cursor: shownWhen === "click" ? "pointer" : "default" }}
        >
            {children}
            {visible && (
                <div
                    ref={tooltipRef}
                    className={classes}
                    style={{
                        fontSize: "x-small",
                        position: "absolute",
                        whiteSpace: "nowrap",
                        zIndex: 9999,
                        opacity: ready ? 1 : 0,
                        visibility: ready ? "visible" : "hidden",
                        transition: "opacity 0.2s ease-in-out",
                        left: `${coords.left}px`,
                        top: `${coords.top}px`,
                    }}
                >
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
