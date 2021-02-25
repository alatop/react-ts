import React from "react";
import upArrowPict from './imgs/up.png';
import downArrowPict from './imgs/down.png';

const style = {cursor: 'pointer'};
const arrowImgstyle = {width: '20px'};

type SortSignPropsTypes = {
  onUp?: Function,
  onDown?: Function,
};

export default function SortSign(props: SortSignPropsTypes) {
  
  let [isUp, setUp] = React.useState(false);

  const {onUp, onDown} = props;

  React.useEffect(() => {
    if (isUp) {
      if (onUp) onUp();
    } else {
      if (onDown) onDown();
    }
  }, [isUp, onUp, onDown]);

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
