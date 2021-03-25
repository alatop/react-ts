
import React from "react";
import './Modal.css';
import { NavLink } from "react-router-dom";
import { ReactEventHandler } from "react";

type ModalWindowPropsType = {
    children: React.ReactNode,
    backRoute?: string,
    onClose?: ReactEventHandler,
}

export default function ModalWindow({ backRoute, children, onClose }: ModalWindowPropsType) {


    const closeElementView = <span className="close">×</span>;
    const closeElement = backRoute ? <NavLink to={backRoute}> {closeElementView} </NavLink> : '';
    const onCloseCallback = onClose ? onClose : () => {};

    return (
        <div className="modal" >
            <div className="modal-content">

                {backRoute ?
                     closeElement 
                    :
                    <span className="close" onClick={onCloseCallback}>×</span>
                }
                {children}
            </div> 
        </div >
    );
}