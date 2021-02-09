import React from "react";

export default function GoodsListTable(props) {
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