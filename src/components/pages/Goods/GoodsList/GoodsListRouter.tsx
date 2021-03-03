import React from "react";
import {
  Route, Switch
} from "react-router-dom";
import GoodsEdit from '../GoodsEdit';
import GoodsList from './GoodsList';

type GoodsListRouterPropsType = any;

export default function GoodsListRouter(props: GoodsListRouterPropsType) {

  const parentRoutePath = props.match.path;


  return (

    <div>
      <GoodsList  {...props} />
      <Switch>
        <Route
          path={parentRoutePath + "/edit/:goods_id"}
          render={props =>
            <GoodsEdit  {...props} />}
        />
      </Switch>
  </div>
  );
}