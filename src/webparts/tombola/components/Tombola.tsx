import * as React from "react";
import styles from "./Tombola.module.scss";
import "../styles/TombolaStyles.scss";
import { ITombolaProps } from "../contracts/ITombolaProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Header from "./Header";
import InputNumber from "./InputNumber";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { useState, useRef, useEffect } from "react";
import * as _ from "lodash";

const Tombola = (props: ITombolaProps) => {
  // const [userNumbers, setUserNumbers] = useState<{ name: string; value: string }[]>([]);
  const [userNumbers, setUserNumbers] = useState(
    ([] as { name: string; value: number }[]) || []
  );
  const [tombolaNumbers, setTombolaNumbers] = useState<JSX.Element[]>(
    [] as JSX.Element[]
  );
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);

  //Funzione cambio dei numeri dell'utente
  const changeNumber = (event: any) => {
    const id = userNumbers.map((e) => e.name).indexOf(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    const userNumber = { name, value };
    //Se non è nell'array, lo si aggiunge
    if (id === -1) {
      setUserNumbers((prevUserNumbers) => {
        const nextUserNumbers = [...prevUserNumbers, userNumber];
        return nextUserNumbers;
      });
    }
    //se è già nell'array
    else {
      let newArray = [...userNumbers];
      newArray[id] = userNumber;
      setUserNumbers(newArray);
    }
    console.log(userNumbers);
  };

  const randomNumGenerator = () => {
    return Math.floor(Math.random() * 90) + 1;
  };
  var arrayNumbers: number[] = [];
  //Generatore numeri
  const numbersGenerator = () => {
    console.log("NEW GENERATION");
    var n = 50;
    // var arrayNumbers: number[] = [];
    // for (let i = 0; i < 50; i++) {
    //   arrayNumbers.push(randomNumGenerator());
    // }
    arrayNumbers = [];
    while (arrayNumbers.length < n) {
      const num = randomNumGenerator();
      if (arrayNumbers.includes(num)) console.log("già presente");
      else arrayNumbers.push(num);
    }
    // console.log(arrayNumbers);
    const arrayNumbersJsx: JSX.Element[] = arrayNumbers.map((el: number) => (
      <span style={{ color: "red" }} className="tombola_number" key={el}>
        {el}
      </span>
    ));

    setTombolaNumbers((v) => arrayNumbersJsx);
    checkNumbers();
  };

  const checkNumbers = () => {
    userNumbers.forEach((element) => {
      const value: number = element.value;

      console.log(`Elemento del forEach: ${value}`);
      console.log(arrayNumbers);
      /* if (arrayNumbers.includes(value)) {
        console.log("HAI TROVATO UN NUMERO!");
        setWinningNumbers((prevWinningNumbers) => {
          const nextWinningNumbers = [...prevWinningNumbers, value];
          return nextWinningNumbers;
        });
        
      } */
      // if (arrayNumbers.includes(value)) console.log("Numero vincente trovato");
      if (_.find(arrayNumbers, value) !== undefined)
        console.log(`Prova - Numero vincente trovato ${value}`);
      console.log(arrayNumbers.indexOf(value));
      if (arrayNumbers.indexOf(value) !== -1)
        console.log("Numero vincente trovato");
    });
    console.log(`Numeri vincenti: ${winningNumbers}`);
  };

  const checkConsole = () => {
    console.log(tombolaNumbers);
    console.log(winningNumbers);
  };
  return (
    <div className="tombola_wrapper">
      <Header />
      <body className="tombola_container">
        <div className="input_container">
          <input
            type="number"
            name="inputNumber1"
            placeholder="1"
            onChange={changeNumber}
          />
          <input
            type="number"
            name="inputNumber2"
            placeholder="1"
            onChange={changeNumber}
          />
          <input
            type="number"
            name="inputNumber3"
            placeholder="1"
            onChange={changeNumber}
          />
          <input
            type="number"
            name="inputNumber4"
            placeholder="1"
            onChange={changeNumber}
          />
          <input
            type="number"
            name="inputNumber5"
            placeholder="1"
            onChange={changeNumber}
          />
        </div>
        <div>{tombolaNumbers.length}</div>
        {tombolaNumbers.length > 0 && (
          <div className="numbers_container">{tombolaNumbers}</div>
        )}
        <PrimaryButton text="ConsoleLOOOOG" onClick={checkConsole} />
        <PrimaryButton text="Gioca" onClick={numbersGenerator} />
      </body>
    </div>
  );
};
export default Tombola;
