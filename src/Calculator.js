// Using useEffect for input by keyboard
import React, { useEffect, useCallback } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function Calculator({ input, setInput, history, setHistory }) {
  const handleButtonClick = (value) => {
    setInput(prevInput => prevInput + value);
  };

  const handleClear = useCallback(() => {
    setInput("");
  }, [setInput]);

  const handleEqual = useCallback(() => {
    try {
      // Using mathjs to replace eval() to calculate the result
      const result = evaluate(input); // If using evaluate of mathjs, then unnecessary to replace from ^ to **
      const newEntry = `${input} = ${result}`;
      setHistory([newEntry, ...history]); // Add new result into history record
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
    /* Using useCallback() for if input and history do not change the value,
    then the function will not rebuild.
    Otherwise it will rebuild every time, to prevent rerun useEffect every single time. */
  }, [input, history, setInput, setHistory]);
  
  const handlePercentage = useCallback(() => {
    try {
      const result = evaluate(input) / 100;
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  }, [input, setInput]);
  
  const handleSquareRoot = useCallback(() => {
    try {
      const result = evaluate(`sqrt(${input})`);
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  }, [input, setInput]);
  
  const handleBackSpace = useCallback(() => {
    setInput((prevInput) => prevInput.slice(0, -1));
  }, [setInput]);

  const handleToggleSign = useCallback(() => {
    setInput((prevInput) => {
      if (prevInput === "" || prevInput === "0") return prevInput;
      const match = prevInput.match(/(-?\d+\.?\d*)$/);
      if (match) {
        const lastNumber = parseFloat(match[0]);
        const toggleNumber = lastNumber * -1;
        return prevInput.slice(0, prevInput.length - match[0].length) + toggleNumber;
      }
      return prevInput;
    });
  }, [setInput]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
        // To handle a negative number, determine it is a negative number or an operator
        if (key === '-') {
          // If the input box is empty or the last char is operator, then '-' is apart negative number
          if (input === '' || ['+', '-', '*', '/', '.', '(', ')'].includes(input.slice(-1))) {
            setInput((prevInput) => prevInput + '-');
          } else {
            // Otherwise, it is an operator
            setInput((prevInput) => prevInput + key);
          }
        } else { setInput((prevInput) => prevInput + key); }
      } else if (key === 'Enter') {
        handleEqual();
      } else if (key === 'Backspace') {
        handleBackSpace();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === '%') {
        handlePercentage();
      } else if (key === '√') {
        handleSquareRoot();
      } else if (key === '±') {
        handleToggleSign();   // Use ± to toggle sign
      }
    };

    // Add a keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // Having dependencies of useEffect
    // If dependencies are changed, useEffect rerun automatically, ensure the logical is latest version
  }, [input, setInput, handleEqual, handlePercentage, handleSquareRoot, handleBackSpace, handleToggleSign, handleClear]);

  return (
    <div className='calculator'>
      <div className='display'>
        {input || "0"}
      </div>
      <div className='buttons'>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleButtonClick("(")}>(</button>
        <button onClick={() => handleButtonClick(")")}>)</button>
        <button onClick={handleBackSpace}>←</button>

        <button onClick={handleSquareRoot}>√</button>
        <button onClick={() => handleButtonClick("^")}>^</button> {/* Using ^ meaning POWER*/}
        <button onClick={handlePercentage}>%</button>
        <button onClick={handleToggleSign}>±</button>

        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("/")}>/</button>

        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        
        <button onClick={handleEqual} className='span-1'>=</button>
        <button onClick={() => handleButtonClick("0")} className='span-1'>0</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
      </div>
    </div>
  );
}

export default Calculator;