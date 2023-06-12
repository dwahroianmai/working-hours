import "./styles.css";
import axios from "axios";
import Circle from "./components/circle";
import Sum from "./components/all";
import Confirmation from "./components/confirm";
import { useEffect, useState } from "react";

function App() {
  const [money, setMoney] = useState(0);
  const [percent, setPercent] = useState(0);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/all")
      .then((res) => setMoney(res["data"]["money"]));
  }, []);

  useEffect(countPercent, [money]);

  function countPercent() {
    setPercent(Math.round(money / 180));
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-center text-3xl lg:text-5xl pt-6">
        Заработано на страховку:{" "}
      </h1>
      <Circle percent={percent} />
      <Sum sum={money} />
      <button
        className=" bg-green-700 font-semibold text-slate-50 p-2 rounded-md mt-8 hover:scale-110 active:scale-75 transition duration-300"
        onClick={() =>
          component === null
            ? setComponent(<Confirmation />)
            : setComponent(null)
        }
      >
        Дарина поработала
      </button>
      {component}
    </div>
  );
}

export default App;
