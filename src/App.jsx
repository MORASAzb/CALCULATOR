import './App.css';
import Button from './component/Button/Button';
import ButtonBox from './component/ButtonBox/ButtonBox';
import Screen from './component/Screen/Screen';
import Wrapper from './component/Wrapper/Wrapper';
import { useEffect, useState } from 'react';





const btnValue = [
  ["C", "+/-", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{16})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  console.log('0')
  const [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const numHandler = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc((prevCalc) => ({
        ...prevCalc,
        num:
          prevCalc.num === 0 && value === '0'
            ? '0'
            : removeSpaces(prevCalc.num) % 1 === 0
              ? toLocaleString(removeSpaces(Number(prevCalc.num + value)))
              : toLocaleString(prevCalc.num + value),
        res: !prevCalc.sign ? 0 : prevCalc.res,
      }));
    }
  };

  const commaHandler = () => {
    if (!calc.num.toString().includes('.')) {
      setCalc((prevCalc) => ({
        ...prevCalc,
        num: prevCalc.num + '.',
      }));
    }
  };

  const handleKeyboardInput = (e) => {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      numHandler(key);
    } else {
      switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
          signHandler(key);
          break;
        case '%':
          percentHandler();
          break;
        case '.':
          commaHandler();
          break;
        case 'Enter':
        case '=':
          equalHandler();
          break;
        case 'Escape':
          resetHandler();
          break;
        default:
          break;
      }
    }
  };

  const signHandler = (value) => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      sign: value,
      res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
      num: 0,
    }));
  };

  const equalHandler = () => {
    if (calc.sign && calc.num) {
      const a = Number(removeSpaces(calc.res || 0));
      const b = Number(removeSpaces(calc.num));
      let result;

      switch (calc.sign) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) {
            result = 'Cannot divide by 0';
          } else {
            result = a / b;
          }
          break;
        default:
          result = b;
      }

      setCalc({
        sign: '',
        num: 0,
        res: toLocaleString(result),
      });
    }
  };

  const percentHandler = () => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      num: prevCalc.num ? toLocaleString(parseFloat(removeSpaces(prevCalc.num) / 100)) : 0,
      res: prevCalc.res ? toLocaleString(parseFloat(removeSpaces(prevCalc.res) / 100)) : 0,
      sign: '',
    }));
  };

  const invertHandler = () => {
    setCalc((prevCalc) => ({
      ...prevCalc,
      num: prevCalc.num ? toLocaleString(removeSpaces(prevCalc.num) * -1) : 0,
      res: prevCalc.res ? toLocaleString(removeSpaces(prevCalc.res) * -1) : 0,
      sign: '',
    }));
  };

  const resetHandler = () => {
    setCalc({
      sign: '',
      num: 0,
      res: 0,
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardInput);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numHandler]);



  return (




    <div className='App'>



      <div>
        <Wrapper>
          <Screen value={calc.num ? calc.num : calc.res} />
          <ButtonBox>
            {btnValue.flat().map((btn, i) => (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                id={btn === 'C' || btn === '+/-' || btn === '%' || btn === '/' || btn === '*' || btn === '-' || btn === '+' || btn === '.' ? 'signs' : ''}
                value={btn}
                onClick={() => {
                  if (btn === 'C') resetHandler();
                  else if (btn === '+/-') invertHandler();
                  else if (btn === '%') percentHandler('%');
                  else if (btn === '=' || btn === 'Enter') equalHandler();
                  else if (btn === '/' || btn === '*' || btn === '-' || btn === '+') signHandler(btn);
                  else if (btn === '.') commaHandler();
                  else numHandler(btn.toString());
                }

                }

              />
            ))}
          </ButtonBox>
        </Wrapper>
      </div>
    </div>

  );
}

export default App;