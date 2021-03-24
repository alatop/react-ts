import React from "react";
import {
  Route, Switch
} from "react-router-dom";
import GoodsList from './GoodsList';
import GoodsAdd from '../GoodsAdd';
import GoodsEdit from '../GoodsEdit';

type GoodsListRouterPropsType = any;

export default function GoodsListRouter(props: GoodsListRouterPropsType) {

  const parentRoutePath = props.match.path;

  return (
    <div>
      <GoodsList  {...props} />
      <Switch>
        <Route
          path={parentRoutePath + "/add"}
          render={props =>
            <GoodsAdd  {...props} />}
        />
        <Route
          path={parentRoutePath + "/edit/:goods_id"}
          render={props =>
            <GoodsEdit  {...props} />}
        />
      </Switch>
    </div>
  );
}