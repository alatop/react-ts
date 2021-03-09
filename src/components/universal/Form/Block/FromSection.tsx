
import React from "react";
import './form-section.css';

type FromSectionPropsType = {
    children: React.ReactNode,
}

export default function FromSection(
    { children }: FromSectionPropsType) {

    return (
        <div className="form-section">
            {children}
        </div>
    );
}