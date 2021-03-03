import React from "react";
import ModalWindow from '@app-universal/Common/ModalWindow/ModalWindows';

type GoodsEditPropsType = any;

export default function GoodsEdit(props: GoodsEditPropsType) {

  return (
    <ModalWindow
      backRoute='/goods'
    >
      Редактирование товара
    </ModalWindow>
  );
}