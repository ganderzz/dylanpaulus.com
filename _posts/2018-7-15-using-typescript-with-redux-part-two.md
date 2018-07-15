---
layout: post
title: "Part Two: Using Typescript with Redux"
category: ["React", "Typescript"]
tag: ["Javascript", "Frontend", "React", "Redux", "Typescript"]
---

[![Click Here](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5w70j1916l)

# Part Two: Using Typescript with ~~React~~ Redux

Last time we went through using Typescript with React, and setup a small counter application. A lot of applications out there use Redux. A common pain-point for me was how to setup Typescript with Redux--it's a common hurdle with my team also. Though Redux is a totally different library, it holds a big share of the state management market in React applications. In part two we'll take a detour from base React, and look at converting our counter to using Redux!

*Note: Same with part one, I'm going to assume Typescript, and now Redux, is setup and compiles. This is a writeup on integrating types, and less on how to setup a project.*

### Actions

We'll start out creating a few actions for our counter. 

```js
// Action Types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export type ActionTypes = typeof INCREMENT | typeof DECREMENT;

export interface IAction {
  type: ActionTypes;
  payload: IPayload;
}

export interface IPayload {
  amount: number;
}

// Action Creators
export function increment(amount: number): IAction {
  return {
    type: INCREMENT,
    payload: {
      amount
    }
  };
}

export function decrement(amount: number): IAction {
  return {
    type: DECREMENT,
    payload: {
      amount
    }
  };
}

```

Going from top to bottom. We start out creating a few action types: *INCREMENT* and *DECREMENT*. This will allow us to reuse these strings as types, and get rid of any 'magic strings'. Creating action types improves our code so we only have one place to update this value if our type should change. Additionally, reduces bugs that can occur due to human error (eg. we accidently put 'rEDUCE' or 'reduce' instead of 'REDUCE').

Moving on, we hit a Typescript type and a few interfaces. Our *ActionTypes* type will allow us to say, "we want to use any of these types". This will come in handy later. Next, we define an interface for our counter action creators. It has the required Redux *type* property that can be either of our action type values. To keep actions similar, we'll use payload to deliver whatever 'value' we want our reducer to work on. For the counter, we'll use **IPayload** which has one property *amount* which is a number. We'll use this to set the amount we'll either increment or decrement.

Finally, we'll create an action creator for both increment and decrementing our counter. These functions are pretty straightforward. They are both functions that take a number, *amount*, and returns an *IAction*.

### Reducer

```js
const defaultState = {
  value: 0
};

export function rootReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case INCREMENT:
      return {
        value: state.value + action.payload.amount
      };

    case DECREMENT:
      return {
        value: state.value - action.payload.amount
      };

    default:
      return state;
  }
}
```

I won't spend too much time on the reducer as Typescript doesn't play much role here (in this example). Notice how we use our *IAction* interface we created in actions to enforce our counter actions!

### Component

```js
interface IStateToProps {
  count: number;
}

interface IDispatchToProps {
  increment: typeof increment;
  decrement: typeof decrement;
}

type AllProps = IStateToProps & IDispatchToProps;

class App extends React.Component<AllProps> {
  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type: string = event.currentTarget.title;

    if (type === "decrement") {
      this.props.decrement(1);
    } else {
      this.props.increment(2);
    }
  };

  public render() {
    return (
      <div>
        <button title="decrement" onClick={this.handleClick}>
          -
        </button>
        {this.props.count}
        <button title="increment" onClick={this.handleClick}>
          +
        </button>
      </div>
    );
  }
}

const ConnectedApp = connect<IStateToProps, IDispatchToProps>(
  (state: { value: number }) => ({
    count: state.value
  }),
  {
    increment,
    decrement
  }
)(App);

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
```