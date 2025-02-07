// Grid Row Component
const Row = ({
                 children,
                 className = "",
                 p = "", px = "", py = "", pt = "", pb = "", ps = "", pe = "",
                 m = "", mx = "", my = "", mt = "", mb = "", ms = "", me = ""
             }) => {
    const classes = [
        "row",
        p ? `p-${p}` : "", px ? `px-${px}` : "", py ? `py-${py}` : "",
        pt ? `pt-${pt}` : "", pb ? `pb-${pb}` : "", ps ? `ps-${ps}` : "", pe ? `pe-${pe}` : "",
        m ? `m-${m}` : "", mx ? `mx-${mx}` : "", my ? `my-${my}` : "",
        mt ? `mt-${mt}` : "", mb ? `mb-${mb}` : "", ms ? `ms-${ms}` : "", me ? `me-${me}` : "",
        className
    ].filter(Boolean).join(" ");

    return <div className={classes}>{children}</div>;
};

// Grid Column Component
const Col = ({
                 children,
                 width,
                 responsive = "",
                 className = "",
                 p = "", px = "", py = "", pt = "", pb = "", ps = "", pe = "",
                 m = "", mx = "", my = "", mt = "", mb = "", ms = "", me = ""
             }) => {
    const colClass = `col${responsive ? `-${responsive}` : ""}-${width}`.trim();

    const classes = [
        colClass,
        p ? `p-${p}` : "", px ? `px-${px}` : "", py ? `py-${py}` : "",
        pt ? `pt-${pt}` : "", pb ? `pb-${pb}` : "", ps ? `ps-${ps}` : "", pe ? `pe-${pe}` : "",
        m ? `m-${m}` : "", mx ? `mx-${mx}` : "", my ? `my-${my}` : "",
        mt ? `mt-${mt}` : "", mb ? `mb-${mb}` : "", ms ? `ms-${ms}` : "", me ? `me-${me}` : "",
        className
    ].filter(Boolean).join(" ");

    return <div className={classes}>{children}</div>;
};

export { Row, Col };
