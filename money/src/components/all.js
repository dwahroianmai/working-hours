import { useEffect, useState } from "react";
import axios from "axios";

const Sum = ({ sum }) => {
  const [rub, setRub] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/rubles", { sum })
      .then((res) => setRub(res["data"]["rub"]));
  }, [sum]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/rubles", { sum: 18000 })
      .then((res) => setPrice(res["data"]["rub"]));
  }, []);

  return (
    <div className="pt-32">
      <p className="text-center">
        Заработано {sum}Kč / {rub}₽ из 18000Kč / {price}₽.
      </p>
    </div>
  );
};

export default Sum;
