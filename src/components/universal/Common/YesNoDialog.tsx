
import React from "react";
import ModalWindow from '@app-universal/Common/ModalWindow/ModalWindows';
import { ReactEventHandler } from "react";

type YesNoDialogPropsType = {
    title: string,
    text: string,
    onClose: ReactEventHandler,
    onAgree: Function,
}

export default function YesNoDialog({ title, text, onClose, onAgree }: YesNoDialogPropsType) {

    const onAgreeCallback = React.useCallback(() => {
        onAgree();
    },
        [onAgree]
    );

    return (
        <ModalWindow
            onClose={onClose}
        >
            <h2>{title}</h2>
            <div>
                {text}
            </div>
            <button onClick={onAgreeCallback}>
                Да, конечно
            </button>
            <button onClick={onClose}>
                Нет
            </button>
        </ModalWindow>
    );
}