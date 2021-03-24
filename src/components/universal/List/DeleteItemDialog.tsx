import React from "react";
import YesNoDialog from '@app-universal/Common/YesNoDialog';
import { useDispatch, useSelector } from 'react-redux';

type DeleteItemDialogPropsTypes = {
  controlText: string,
  itemId: number,
};

export default function DeleteItemDialog({ controlText, itemId }: DeleteItemDialogPropsTypes) {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const onClose = React.useCallback(() => {
    setOpen(false);
  },
    [setOpen]);

  const onClickOpen = React.useCallback(() => {
    setOpen(true);
  },
    [setOpen]);

  const onAgree = React.useCallback(() => {


  }, [itemId]);

  return (
    <>
      <button onClick={onClickOpen}>
        {controlText}
      </button>
      {open ?
        <YesNoDialog
          onAgree={onAgree}
          title='Удаление товара'
          text='Вы дейстительно хотите удалить?'
          onClose={onClose}
        />
        : null
      }
    </>
  );
}
