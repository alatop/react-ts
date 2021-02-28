import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadGoods, resetGoodsList, filterByName } from '@app-actions/goodsActions';
import { goodsLisSortedtSelector, getGoodsListIsLoaded } from '@app-reducers/commonSelectors';
import GoodsListTable, { GoodsListType } from './GoodsListTable';
import { filteringByNameSubstrSelector } from '@app-reducers/commonSelectors';

export default function GoodsList() {


  // const [state, setState] = React.useState({
  //   listLoaded: false,
  // });
  const dispatch = useDispatch();
  const goods: GoodsListType = useSelector(goodsLisSortedtSelector);
  const goodsListIsLoaded: Boolean = useSelector(getGoodsListIsLoaded);


  React.useEffect(() => {
    dispatch(loadGoods);

    return () => {
      dispatch(resetGoodsList);
    };
  },
    [dispatch]
  );

  const filteringNameSubstring = useSelector(filteringByNameSubstrSelector);
  const onChangeNameFilter = React.useCallback((evt) => {
    dispatch(filterByName(evt.target.value));
  }, [dispatch]);

  return (

    <div>
      <input value={filteringNameSubstring} onChange={onChangeNameFilter} />
      <div>
        {goodsListIsLoaded ?

          goods.length ?
            <GoodsListTable
              goods={goods}
            />
            : 'Список товаров пуст'
          : 'Загрузка данных...'
        }
      </div>
    </div>
  );
}