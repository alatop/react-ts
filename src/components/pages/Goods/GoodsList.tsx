import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadGoods } from '../../../actions/goodsActions';
import { getGoodsList } from '../../../reducers/commonSelectors';

export default function GoodsList() {


  const [state, setState] = React.useState({
    listLoaded: false,
  });
  const dispatch = useDispatch();
  const goods = useSelector(getGoodsList);

  const handleListLoaded = React.useCallback(() => {
    setState((state) => { 
      return {...state, listLoaded: true,}
    });
  }, [setState]);
  
  React.useEffect(() =>  {
      dispatch(loadGoods(handleListLoaded));
    }, 
    [handleListLoaded, dispatch]
  );

  
    return (
        <div>
          {state.listLoaded ? 
           
           goods.length ? 
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
            : 'Список товаров пуст'
           : 'Загрузка данных...'
          }
        </div>
    );
  }