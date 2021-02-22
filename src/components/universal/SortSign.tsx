import React from "react";


const style = {cursor: 'pointer'};

export default function SortSign() {
  
  let [isUp, setUp] = React.useState(false);

  const onClick = React.useCallback(() => {
    setUp((prevVal: boolean) => {return !prevVal;})
  }, [setUp]);

    return (
      <div onClick={onClick} style={style}>
        {isUp ? 
         <p>Вниз</p> : <p>Вверх</p>}
      </div>
    );
}
