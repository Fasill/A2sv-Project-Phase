import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../app/features/coutner/counterSlice';

const counter = () => {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);
    useEffect(() => {
        console.log(count);
    }, [count]);
  return (
    <div>
        <button onClick={() => dispatch(increment())}>+</button>
        {/* <span>{count}</span> */}
        <input type="number" value={count} onChange={(e) => dispatch(incrementByAmount(Number(e.target.value)))} />
        <button onClick={() => dispatch(decrement())}>-</button>
        </div>
  )
}

export default counter