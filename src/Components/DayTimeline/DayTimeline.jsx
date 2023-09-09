import React, { useState } from "react";
import "./DayTimeline.css";
import { FiMinus, FiPlus } from "react-icons/fi";
export default function DayTimeline() {
  const [hours, setHours] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
  return (
    <div className="dt">
      <div className="dt__buttons">
        <FiPlus onClick={() => { hours[0] > 0 && setHours([hours[0] - 1, ...hours])}} className="dt__button" />
        <FiMinus onClick={() => {setHours(hours.slice(1))}} className="dt__button" />
      </div>
      <div className="dt__hours">
        {hours.map((h, index) => {
          const [borderPlace, setBorderPlace] = useState()
          function mouseMoveHandler(e, index){
            let div = e.target
            if(e.target.nodeName != "DIV"){
              div = e.target.parentNode
            }
            const { clientY } = e;
        
            const { top, bottom } = div.getBoundingClientRect();
            const height = bottom - top;
            const position = clientY - top;
            console.log(position, height / 4 * 3)
            if(position <= (height / 4)){
              div.classList.remove("middle")
              div.classList.remove("bottom")
              if(index != 0 ){
              div.classList.add("top")}
            }
            else if (position >= (height / 4 * 3)){
              div.classList.remove("middle")
              if(index != hours.length - 1){
              div.classList.add("bottom")}
              div.classList.remove("top")

            }
            else{
              div.classList.add("middle")
              div.classList.remove("bottom")
              div.classList.remove("top")
            }
        
          }


          return (
            <div onMouseLeave={(e) => {e.target.classList.remove("top"); 
            e.target.classList.remove("bottom"); 
            e.target.classList.remove("middle")}} 
            onMouseMove={(e) => mouseMoveHandler(e, index)} className={["dt__hour-container"].join(" ")} key={h}>
              <p className="dt__hour">{h}</p>
            </div>
          );
        })}
      </div>
      <div className="dt__buttons">
        <FiPlus onClick={() => {hours[hours.length - 1] < 24 && setHours([...hours, hours[hours.length - 1] + 1])}} className="dt__button" />
        <FiMinus onClick={() => {setHours(hours.slice(0, -1))}} className="dt__button" />
      </div>
    </div>
  );
}
