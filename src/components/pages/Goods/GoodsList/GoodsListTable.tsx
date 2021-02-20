import React from "react";
import SortSign from '@app-universal/SortSign'; 
// import SortSign from 'test/SortSign';
// import SortSign from '../../../universal/SortSign';

 
export default function GoodsListTable(props: object) {
    const {goods: array}  =props;
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
                Цена
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