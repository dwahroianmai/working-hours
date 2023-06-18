import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [time, setTime] = useState("");
  const [hours, setHours] = useState(0);
  const [job, setJob] = useState("");
  const [sent, setSent] = useState("");

  return (
    <div className="flex flex-col items-center gap-5 pt-6 ml-auto mr-auto">
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className=" w-3/4 border-black border-[1px] rounded-md p-2"
      />
      <input
        type="number"
        min="1"
        max="6"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        className=" w-3/4 rounded-md border-black border-[1px] p-2"
      />
      <div className="flex gap-4 justify-center">
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="rohlik"
            id="rohlik"
            value={job}
            onChange={() => setJob("rohlik")}
            className=" w-3 h-3"
          />
          <label for="rohlik">Rohlik</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            id="populo"
            type="checkbox"
            name="populo"
            value={job}
            onChange={() => setJob("populo")}
          />
          <label for="populo">Populo</label>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="rohlik-p"
            id="rohlik-p"
            value={job}
            onChange={() => setJob("rohlik-p")}
            className=" w-3 h-3"
          />
          <label for="rohlik-p">Rohlik - picking</label>
        </div>
      </div>
      <p>{sent}</p>
      <button
        className=" shadow-circle mt-4 rounded-md bg-green-700 text-slate-50 font-semibold p-2 hover:scale-110 active:scale-75 transition duration-300"
        onClick={() =>
          axios
            .post("https://prace.fly.dev/data", {
              time,
              hours,
              job,
            })
            .then(() => setSent("Отправлено"))
        }
      >
        Отправить
      </button>
    </div>
  );
};

export default Form;
