import { filterByName, loadGoods, resetGoodsList } from '@app-actions/goodsActions';
import {
  filteringByNameSubstrSelector,
  getGoodsListIsLoaded, goodsLisSortedtSelector
} from '@app-reducers/commonSelectors';
import UrlSyncedTextInput from '@app-universal/Form/Input/UrlSyncedTextInput';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import GoodsListTable, { GoodsListType } from './GoodsListTable';
import { History } from 'history';
import { match } from 'react-router';
import queryString from 'query-string';
import { NavLink } from "react-router-dom";

// указываем допустимые в нашем случае параметры
type filterParams = {
  name?: string,
}

type GoodsListPropsType = {
  history: History,
  match: match<filterParams>,
}

export default function GoodsList(props: GoodsListPropsType) {

  const { history } = props;
  const dispatch = useDispatch();
  const goods: GoodsListType = useSelector(goodsLisSortedtSelector);
  const goodsListIsLoaded: Boolean = useSelector(getGoodsListIsLoaded);
  const filterParamName = 'name';


  const reloadGoods = React.useCallback(() => {
    dispatch(loadGoods);
  }, [dispatch]);

  React.useEffect(() => {
    reloadGoods();

    return () => {
      dispatch(resetGoodsList);
    };
  },
    [dispatch, reloadGoods]
  );

  React.useEffect(() => { // обработка изначального фильтра
    // console.log(' match.params', match.params);
    const params = queryString.parse(history.location.search);

    let initFilterValue: string | null = null;
    let filerValue = params[filterParamName];
    if ((typeof filerValue === 'string')) {
      initFilterValue = filerValue;
    }
    if (initFilterValue) {
      dispatch(filterByName(initFilterValue));
    }
  },
    // eslint-disable-next-line
    [dispatch]
  );

  const filteringNameSubstring = useSelector(filteringByNameSubstrSelector);
  const onChangeNameFilter = React.useCallback((evt) => {
    dispatch(filterByName(evt.target.value));
  }, [dispatch]);

  return (

    <div>
      <NavLink
        to={`/goods/add`}
      >
        Добавить товар
			</NavLink>
      <UrlSyncedTextInput
        history={history}
        value={filteringNameSubstring}
        onChange={onChangeNameFilter}
        getParamName={filterParamName}
        placeholder="Поиск..."
      />

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
