import { filterByName, loadGoods, resetGoodsList } from '@app-actions/goodsActions';
import { filteringByNameSubstrSelector, 
  getGoodsListIsLoaded, goodsLisSortedtSelector
} from '@app-reducers/commonSelectors';
import UrlSyncedTextInput from '@app-universal/Form/UrlSyncedTextInput';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import GoodsListTable, { GoodsListType } from './GoodsListTable';
import { History } from 'history';
import { match } from 'react-router';
import queryString from 'query-string';

// указываем допустимые в нашем случае параметры
type filterParams = {
  name?: string,
}

type GoodsListPropsType = {
  history: History,
  match: match<filterParams>,
}

export default function GoodsList(props: GoodsListPropsType) {

  const { history, match } = props;
  const dispatch = useDispatch();
  const goods: GoodsListType = useSelector(goodsLisSortedtSelector);
  const goodsListIsLoaded: Boolean = useSelector(getGoodsListIsLoaded);
  const filterParamName = 'name';

  React.useEffect(() => {
    dispatch(loadGoods);

    return () => {
      dispatch(resetGoodsList);
    };
  },
    [dispatch]
  );

  React.useEffect(() => { // обработка изначального фильтра
    console.log(' match.params', match.params);
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

  console.log('OUT match.params', match.params);

  const filteringNameSubstring = useSelector(filteringByNameSubstrSelector);
  const onChangeNameFilter = React.useCallback((evt) => {
    dispatch(filterByName(evt.target.value));
  }, [dispatch]);

  return (

    <div>
      <UrlSyncedTextInput
        history={history}
        value={filteringNameSubstring}
        onChange={onChangeNameFilter}
        getParamName={filterParamName}
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