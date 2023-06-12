import { useState } from "react";
import Form from "./form";
import axios from "axios";

const Confirmation = ({ confirm }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function sendPassword() {
    axios.post("http://127.0.0.1:5000/password", { password }).then((res) => {
      setConfirmed(res["data"]["confirmed"]);
      setError(res["data"]["error"]);
    });
  }

  return confirmed ? (
    <Form />
  ) : (
    <div className=" mt-6">
      <h2 className=" text-center">Подтвердите, что вы - Дарина</h2>
      <div className=" flex flex-col justify-center mt-4 ">
        <input
          className="border-black border-[1px] rounded-md p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2 className=" text-center mt-2 text-red-600">{error}</h2>
        <button
          className=" shadow-circle mt-4 rounded-md bg-green-700 text-slate-50 font-semibold p-2 hover:scale-110 active:scale-75 transition duration-300"
          onClick={sendPassword}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
