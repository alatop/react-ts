import SortSign from '@app-universal/SortSign/SortSign';
import React from "react";
import {
    sortByPriceUp, sortByPriceDown,
    sortByNameUp, sortByNameDown
} from '@app-actions/goodsActions';
import { useDispatch } from 'react-redux';

type GoodType = {
    id: number,
    name: string,
    price: string,
}

export type GoodsListType = Array<GoodType>;

type GoodsListTablePropsType = {
    goods: GoodsListType,
}

export default function GoodsListTable(props: GoodsListTablePropsType) {
    const { goods } = props;

    const dispatch = useDispatch();

    const onSortByPriceUp = React.useCallback(() => {
        console.log('up action!');
        dispatch(sortByPriceUp);
    }, [dispatch]);

    const onSortByPriceDown = React.useCallback(() => {
        dispatch(sortByPriceDown);
    }, [dispatch]);

    const onSortByNameUp = React.useCallback(() => {
        console.log('up action!');
        dispatch(sortByNameUp);
    }, [dispatch]);

    const onSortByNameDown = React.useCallback(() => {
        dispatch(sortByNameDown);
    }, [dispatch]);

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Название
                        <SortSign
                            onUp={onSortByNameUp }
                            onDown={onSortByNameDown}
                        />
                    </th>
                    <th>
                        Цена <SortSign
                            onUp={onSortByPriceUp}
                            onDown={onSortByPriceDown}
                        />
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