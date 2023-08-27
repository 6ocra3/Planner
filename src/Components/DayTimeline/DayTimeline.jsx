import React, { useState } from "react";
import "./DayTimeline.css";
import { FiMinus, FiPlus } from "react-icons/fi";
export default function DayTimeline() {
  const [hours, setHours] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
  return (
    <div className="dt">
      <div className="dt__buttons">
        <FiPlus className="dt__button" />
        <FiMinus className="dt__button" />
      </div>
      <div className="dt__hours">
        {hours.map((h) => {
          return (
            <p className="dt__hour" key={h}>
              {h}
            </p>
          );
        })}
      </div>
      <div className="dt__buttons">
        <FiPlus className="dt__button" />
        <FiMinus className="dt__button" />
      </div>
    </div>
  );
}
