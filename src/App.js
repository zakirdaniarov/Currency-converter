import React, { useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')
  const [fromValue, setFromValue] = React.useState(0)
  const [toValue, setToValue] = React.useState(1)
  
  const ratesRef = React.useRef({})

  React.useEffect(()=>{
    fetch('https://v6.exchangerate-api.com/v6/8c6653918d7e35ff406aa2dd/latest/USD')
    .then(obj=>obj.json()).then(json=>{ratesRef.current = json.conversion_rates;
    onChangeToValue(1);}).catch((err)=>{
      console.warn(err);
      alert("There is no data in this endpoint");
    })
    }, []);

  const onChangeFromValue = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToValue(result.toFixed(3));
    setFromValue(value); 
  };

  const onChangeToValue = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromValue(result.toFixed(3));
    setToValue(value);
  };


  React.useEffect(()=>{
    onChangeFromValue(fromValue);
      }, [fromCurrency]);

  React.useEffect(()=>{
    onChangeToValue(toValue);
      }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromValue} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromValue}/>
      <Block value={toValue} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToValue}/>
    </div>
  );
}

export default App;
