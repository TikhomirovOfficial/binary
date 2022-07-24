import React from 'react';

const WrapperForm = ({children, className = ""}) => {
    return (
        <div onClick={event => event.stopPropagation()} className={`WrapperForm ${className}`}>
            {children}
        </div>
    );
};

export default WrapperForm;