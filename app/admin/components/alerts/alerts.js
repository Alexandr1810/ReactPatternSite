import axios from "axios";
import React, {useState, useEffect, useRef} from 'react'


function Alerts(props) {
  return (
    <div className="alertsContainer">
      {props.activeAlert == "successAlert" && (
        <div className="successAlert">
          Успешно!
        </div>
      )}
      {props.activeAlert == "errorAlert" && (
        <div className="errorAlert">
          Ошибка сервера
        </div>
      )}
    </div>
  );
}


export default Alerts;