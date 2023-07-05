// And by default, we call our main component the App component. And as you see,a component in React is really just a function.Now, these functions in React,so these components, can return something called JSX,which is a syntax that looks like HTMLand which will basically describe what we can seeon the screen.So just like HTML.

import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  // So whenever we need something to change in the user interface, we change the state. So we update something that we call state. So to create a new state, we need to do it here at the top level in the function,
  // So this useState here is a function in React,which returns an array.And so here, we are destructuring that array.So in the first position of the array,we have the value of the state that we call advice here.And the second value is a setter function.So a function that we can useto update the piece of state.

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  // Now, maybe you noticed that when we load this for the first time, we have no advice here at all, and of course, we start at zero. So let's change that so that whenever we open up the app for the first time, we already are greeted here with our very first piece of advice. And we can do that with something called an effect.
  // So useEffect takes two arguments.First, a function that we want to get executedat the beginning.So when this component first gets loaded, basically.And then a second argument,which is called the dependency array.
  useEffect(function () {
    getAdvice();
  }, []);
  // Due to strict mode the useEffect get executed 2 times.

  return (
    // JSX is a combination of HTML and Javascript
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get advice</button>
      {/* So in React, we try to divide user interfaces into components. */}
      <Message count={count} />
    </div>
  );
}

// So just like App, this one also needs to be uppercase. That's a convention in React for all components.
// And, well, right now this component has no way of knowin about the value of this variable. And so what we need to do is to pass it right into the component. So we do that using something called props. And the prop is basically just like parameters to a function.
// So it's not like a normal function where we simply accept count. Instead, what we accept is an object called props. And it's on this props object that count is now a property.
function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces od advice
    </p>
  );
}
