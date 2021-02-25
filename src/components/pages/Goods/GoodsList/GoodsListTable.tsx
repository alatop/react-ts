import SortSign from '@app-universal/SortSign/SortSign';
import React from "react";

type GoodType = {
    id: number,
    name: string,
    price: string,
}

export  type GoodsListType =  Array<GoodType>; 

type GoodsListTablePropsType = {
    goods: GoodsListType,
}
 
export default function GoodsListTable(props: GoodsListTablePropsType) {
    const {goods}  =props;

    return (
        <table>
            <thead>
            <tr>
                <th>
                ID
                </th>
                <th>
                Название
                 <SortSign />
                 {/* <Test /> */} 
                </th>
                <th>
                Цена <SortSign />
                </th>
            </tr>
            </thead>
            <tbody>
            {goods.map((item, index) => {
                return (
                    <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price} ₽</td>
                    </tr>
                );
            })}
            </tbody>

        </table>
    );
  }