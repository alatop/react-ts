import React from "react";
import upArrowPict from './imgs/up.png';
import downArrowPict from './imgs/down.png';

const style = {cursor: 'pointer'};
const arrowImgstyle = {width: '20px'};

export default function SortSign() {
  
  let [isUp, setUp] = React.useState(false);

  const onClick = React.useCallback(() => {
    setUp((prevVal: boolean) => {return !prevVal;})
  }, [setUp]);

    return (
      <span onClick={onClick} style={style}>
        {isUp ? 
         <img src={upArrowPict} style={arrowImgstyle} alt="По возрастанию" />
          : <img src={downArrowPict} style={arrowImgstyle} alt="По убыванию" />}
      </span>
    );
}
