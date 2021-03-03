
import React from "react";
import './Modal.css';
import { NavLink } from "react-router-dom";

type ModalWindowPropsType = {
    children: React.ReactNode,
    backRoute?: string, 
}

export default function ModalWindow(props: ModalWindowPropsType) {
    
    const {backRoute, children}  = props;

    const closeElementView = <span className="close">×</span>;
    const closeElement = backRoute ? <NavLink to={backRoute}> {closeElementView} </NavLink> : '';

    return (
        <div className="modal" >
            <div className="modal-content">
                {closeElement}
                {children}
            </div>
        </div >
    );
}