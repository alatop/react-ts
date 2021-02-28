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

  const onClick = React.useCallback(() => {
    if (isUp) {
      setUp(false);
      if (onDown) onDown();
    } else {
      setUp(true);
      if (onUp) onUp();
    }
  }, [setUp, isUp, onUp, onDown]);

    return (
      <span onClick={onClick} style={style}>
        {isUp ? 
         <img src={upArrowPict} style={arrowImgstyle} alt="По возрастанию" />
          : <img src={downArrowPict} style={arrowImgstyle} alt="По убыванию" />}
      </span>
    );
}
