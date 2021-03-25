import SortSign from '@app-universal/SortSign/SortSign';
import React from "react";
import {
    sortByPriceUp, sortByPriceDown,
    sortByNameUp, sortByNameDown,
    deleteGoodsItem,
} from '@app-actions/goodsActions';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { GoodsItemType } from '@app-types';
import DeleteItemDialog from '@app-universal/List/DeleteItemDialog'


export type GoodsListType = Array<GoodsItemType>;

type GoodsListTablePropsType = {
    goods: GoodsListType,
    reloadListCallback: Function,
}

export default function GoodsListTable(
    { goods, reloadListCallback }: GoodsListTablePropsType) {

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
        <div>

            <table>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Название
                        <SortSign
                                onUp={onSortByNameUp}
                                onDown={onSortByNameDown}
                            />
                        </th>
                        <th>
                            Цена <SortSign
                                onUp={onSortByPriceUp}
                                onDown={onSortByPriceDown}
                            />
                        </th>
                        <th>
                            Действия
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
                                <td><NavLink
                                    to={`/goods/edit/${item.id}`}
                                >
                                    Редактировать
					            </NavLink>
                                    <DeleteItemDialog
                                        controlText="Удалить"
                                        itemId={item.id}
                                        deleteAction={deleteGoodsItem}
                                        onDeleteCallback={reloadListCallback}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
}