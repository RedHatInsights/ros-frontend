import React, { PropsWithChildren } from 'react';

type TextWithColorDotProps = {
  color: string;
};

const TextWithColorDot = ({
    color,
    children
}: PropsWithChildren<TextWithColorDotProps>) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
                className="pf-v6-u-mr-sm"
                style={{
                    display: 'block',
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: color
                }}
            ></span>
            <span className="pf-v6-u-font-size-xs">{children}</span>
        </div>
    );
};

export default TextWithColorDot;
