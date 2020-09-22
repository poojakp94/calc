import React, { useState } from "react";
import "./App.css";


function App() {
  const [enteredValue, setEnteredValue] = useState(0);
  const [equation, setequation] = useState([]);

  const handleClick = (event)=> {
    event.preventDefault();
    let currentValue = event.target.value;
    // console.log(typeof(currentValue), Number(currentValue));
    setEnteredValue(currentValue);
    // console.log( "last state",equation)
    if(equation.includes('=')){
      setequation(equation[equation.length-1])
    }
    if(equation.includes('NAN')){
      setequation([])
    }

    setequation((state)=> {
      // console.log('new state', state);
      let lastState = state[(state.length -1)];

      if((lastState === '+' || lastState === '/' || lastState === '*') && (currentValue === '+' || currentValue === '/' || currentValue === '*')) {
        let copyArr = state.slice();
        // console.log(copyArr)
        copyArr.splice(-1,1, currentValue)
        return copyArr;
        
      }
      else if((lastState === '-' ) && (currentValue === '+' || currentValue === '/' || currentValue === '*' || currentValue === '-')) {
        let copyArr = state.slice();
        if(state[state.length-2] === '/' || state[state.length-2] === '*' || state[state.length-2] === '+' || state[state.length-2] === '-'){
          copyArr.splice(-2,2, currentValue)
        return copyArr;
        }
        copyArr.splice(-1,1, currentValue)
        return copyArr;
      }
      else if(state.length > 0 && !(currentValue === '+' || currentValue === '/' || currentValue === '*' || currentValue === '-') &&
       !(lastState === '+' || lastState === '/' || lastState === '*' || lastState === '-')){
        console.log('numbers')
        if(currentValue === '.' && lastState.includes('.')){ 
          console.log('.is ')
          let copyArr = state.slice(); 
          return copyArr;
        }
        else if(currentValue === '.' && !(lastState.includes('.'))) { 
          console.log('. is not')
          let copyArr = state.slice(); 
          let mergeNumbers = `${lastState}${currentValue}`; 
          setEnteredValue(mergeNumbers)
          copyArr.splice(-1, 1, mergeNumbers);
          return copyArr
        }
        else if(currentValue === '0' && lastState === '0'){
          console.log('zero is');
          let copyArr = state.slice();
          return copyArr;
        }
        else if(lastState === '0' && !(currentValue === '0') ) {
          console.log('zero followed by num');
          let copyArr = state.slice();
          copyArr.splice(-1, 1, currentValue)
          return copyArr;
        }
        else{
          console.log('append numbers')
        let copyArr = state.slice();
        let mergeNumbers = `${lastState}${currentValue}`;
        setEnteredValue(mergeNumbers) 
        copyArr.splice(-1, 1, mergeNumbers)
        return copyArr;
        }
      }
      else if(currentValue === '.' && (lastState === '+' || lastState === '/' || lastState === '*' || lastState === '-')){
        console.log('...', equation)
          return [...state, '0.']
      }
      else if(state.length === 0 && currentValue === '.' ){
          return [...state, '0.'];
      }
            
      
      return [...state, currentValue]
    })
    
  }
  
  // console.log('after set state',equation)
  const evaluate = ()=> {
    let copyArr = equation.slice();
    if((copyArr[0] === '/' || copyArr[0] ==='*'|| copyArr[0] ==='+'|| copyArr[0] ==='-') && copyArr.length === 1){
      return (setEnteredValue('NAN' ), setequation(state => {
        return[...state, '=', 'NAN']
      }))
    }
    if((copyArr[0] === '/' || copyArr[0] ==='*') && copyArr.length > 1){
      return setequation(copyArr)
    }

   
    if(copyArr[0] === '-' && copyArr.length < 4){
      return (setequation([...copyArr, '=', copyArr[0], copyArr[1]]), setEnteredValue(copyArr));
    }
    if(copyArr[0] === '+' && copyArr.length < 4){
      return( setequation([...copyArr, '=', copyArr[1]]), setEnteredValue(copyArr[1]))
    }
    if(copyArr.length < 3 && (copyArr[1] === '/' || copyArr[1] ==='*'|| copyArr[1] ==='+'|| copyArr[1] ==='-')){
      return (setequation([...copyArr, '=', copyArr[0]]), setEnteredValue(copyArr[0]))
    }

    for(let n=0; n < copyArr.length; n++){
      console.log('forloop')
      if(copyArr[n] === '-' && (copyArr[n-1] === '/' || copyArr[n-1] === '*' || copyArr[n-1] === '+')){
        let newElement = `${copyArr[n]}${copyArr[n+1]}`
        copyArr.splice(copyArr.indexOf(copyArr[n]), 2, newElement);
      }
      console.log(copyArr);
    }
      
    const operators = ['/', '*', '-', '+']
    for(let x=0; x < operators.length; x++){
      console.log('inside operator', operators[x])
      if(copyArr.length > 1) {
        // console.log('while');

        copyArr.forEach((currentCAV, index)=> {
          console.log('inside forEach', currentCAV);
          if(currentCAV === operators[x]){
            let newequation = eval(`${copyArr[index-1]}${operators[x]}${copyArr[index+1]}`);
            console.log('result:',newequation)
            let delEle = copyArr.splice(index-1, 3, newequation.toString())
            console.log('deleted',delEle);
            console.log('finalArr:', copyArr);   
            x = 0;    
         }
        });
        
      } 
      
     }
    setEnteredValue(copyArr);
    setequation(state => {
      return[...state, '=', copyArr]
    });
    
  } 
  

  return (
    <div className="App">
      <div className="formula-screen">{equation}</div>
      <div className="outputScreen" id="display" >
        {enteredValue}
      </div>
      <div id="calc-wrapper">
        <button id="clear" className="btn" onClick={()=>{
          setEnteredValue(0);
          setequation([]);
        }}>
          AC
        </button>
        <button id="divide" className="btn operators-bg-color" value="/" onClick={handleClick}>
          /
        </button>
        <button id="multiply" className="btn operators-bg-color" value="*" onClick={handleClick}>
          *
        </button>
        <button id="seven" className="btn num-bg-color" value="7" onClick={handleClick}>
          7
        </button>
        <button id="eight" className="btn num-bg-color" value="8" onClick={handleClick}>
          8
        </button>
        <button id="nine" className="btn num-bg-color" value="9" onClick={handleClick}>
          9
        </button>
        <button id="subtract" className="btn operators-bg-color" value="-" onClick={handleClick}>
          -
        </button>
        <button id="four" className="btn num-bg-color" value="4" onClick={handleClick}>
          4
        </button>
        <button id="five" className="btn num-bg-color" value="5" onClick={handleClick}>
          5
        </button>
        <button id="six" className="btn num-bg-color" value="6" onClick={handleClick}>
          6
        </button>
        <button id="add" className="btn operators-bg-color" value="+" onClick={handleClick}>
          +
        </button>
        <button id="one" className="btn num-bg-color" value="1" onClick={handleClick}>
          1
        </button>
        <button id="two" className="btn num-bg-color" value="2" onClick={handleClick}>
          2
        </button>
        <button id="three" className="btn num-bg-color" value="3" onClick={handleClick}>
          3
        </button>
        <button id="zero" className="btn num-bg-color" value="0" onClick={handleClick}>
          0
        </button>
        <button id="decimal" className="btn num-bg-color" value="." onClick={handleClick}>
          .
        </button>
        <button id="equal" className="btn" value="=" onClick={evaluate} >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
