import React, { useState } from "react";
import "./DayTimeline.css";
export default function DayTimeline() {
  const [hours, setHours] = useState([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
  return (
    <div className="dt">
      <div className="dt__hours">
        {hours.map((h) => {
          return (
            <p className="dt__hour" key={h}>
              {h}
            </p>
          );
        })}
      </div>
    </div>
  );
}
