import React from "react";

type DeleteItemDialogPropsTypes = {
  text: string,
};

export default function DeleteItemDialog({ text }: DeleteItemDialogPropsTypes) {

  return (
    <button>
      {text}
    </button>
  );
}
