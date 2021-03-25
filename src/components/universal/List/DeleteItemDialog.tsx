import React from "react";
import YesNoDialog from '@app-universal/Common/YesNoDialog';
import { useDispatch } from 'react-redux';

type DeleteItemDialogPropsTypes = {
  controlText: string,
  itemId: number,
  deleteAction: (id: number, suucessCallback: Function) => {},
  onDeleteCallback: Function,
};

export default function DeleteItemDialog(
  { controlText, itemId, deleteAction, onDeleteCallback }: DeleteItemDialogPropsTypes) {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const onClose = React.useCallback(() => {
    setOpen(false);
  },
    [setOpen]);

  const onClickOpen = React.useCallback(() => {
    setOpen(true);
  },
    [setOpen]
  );

  const onSuccessDelete = React.useCallback(() => {
    setOpen(false);
    onDeleteCallback();
  },
    [setOpen, onDeleteCallback]
  );

  const onAgree = React.useCallback(() => {
    dispatch(deleteAction(itemId, onSuccessDelete))
  }, [itemId, onSuccessDelete, deleteAction, dispatch]);

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
