import React from 'react';

const Container = ({
                       children,
                       fluid = false,
                       p = '', px = '', py = '', pt = '', pb = '', ps = '', pe = '',
                       m = '', mx = '', my = '', mt = '', mb = '', ms = '', me = '',
                       className = '',
                   }) => {
    const classes = [
        fluid ? 'container-fluid' : 'container',
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
        <div className={classes}>
            {children}
        </div>
    );
};

export default Container;
