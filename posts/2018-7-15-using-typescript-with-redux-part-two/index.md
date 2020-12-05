---
title: "Part Two: Using Typescript with Redux"
tags: ["React", "Typescript", "Javascript"]
date: "2018-07-15"
series: "Using Typescript with React"
published: true
---

[![Click Here](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5w70j1916l)

Last time we went through using Typescript with React, and setup a small counter application. A lot of applications out there use Redux. A common pain-point for me was how to setup Typescript with Redux--it's a common hurdle with my team also. Though Redux is a totally different library, it holds a big share of the state management market in React applications. In part two we'll take a detour from base React, and look at converting our counter to using Redux!

_Note: Same with part one, I'm going to assume Typescript, and now Redux, is setup and compiles. This is a write-up on integrating types, and less on how to setup a project._

### Actions

We'll start out creating a few actions for our counter.

```jsx
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
      amount,
    },
  };
}

export function decrement(amount: number): IAction {
  return {
    type: DECREMENT,
    payload: {
      amount,
    },
  };
}
```

Going from top to bottom. We start out creating a few action types: _INCREMENT_ and _DECREMENT_. This will allow us to reuse these strings as types, and get rid of any 'magic strings'. Creating action types improves our code so we only have one place to update this value if our type should change. Additionally, reduces bugs that can occur due to human error (eg. we accidently put 'inCREMENT' or 'increment' instead of 'INCREMENT').

Moving on, we hit a Typescript type and a few interfaces. In _ActionTypes_ we use a union type to say, "we can use any of these types". This will come in handy later. Next, we define a general interface for our action creators. We provide the required Redux _type_ property that reuses _ActionTypes_. To keep different actions similar, we'll use payload to deliver a 'value' we want our reducer to work on. For the counter, we'll use **IPayload** which has one property _amount_ which is a number. We'll use this to set the amount we'll either increment or decrement the count.

Finally, we'll create an action creator for both increment and decrementing our counter. These functions are pretty straightforward. They are both functions that take a number, _amount_, and returns an _IAction_.

### Reducer

```jsx
export const defaultState = {
  count: 0,
};

export function rootReducer(state = defaultState, action: IAction) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + action.payload.amount,
      };

    case DECREMENT:
      return {
        count: state.count - action.payload.amount,
      };

    default:
      return state;
  }
}
```

I won't spend too much time on the reducer as Typescript doesn't play much role here (in this example). We'll export our _defaultState_ to use later!

### Component

```jsx
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

export const ConnectedApp = connect<IStateToProps, IDispatchToProps>(
  (state: typeof defaultState) => ({
    count: state.count
  }),
  {
    increment,
    decrement
  }
)(App);
```

In this example we're using a library _react-redux_--making it easier to connect React components to Redux. Starting out, we create two interfaces that we'll use both as **App**'s props and in the `connect()` function at the bottom of the code.

**IStateToProps** we tell Typescript what the mapped state will be named. In our case we'll keep the name _count_.
**IDispatchToProps** we define what actions our component will get. Using `typeof` we can easily tell Typescript to reuse the implied type definition of _increment_ and _decrement_ (our actions).

Next, we create a new type that combines both _IStateToProps_ and _IDispatchToProps_. This is more for convenience as we see in **App**'s prop definition. We could of also used `class App extends React.Component<IStateToProps & IDispatchToProps>` and avoided the need for _AllProps_. Combining all the props to a type becomes valuable when using multiple lifecycle hooks (`shouldComponentUpdate(nextProps: AllProps)`), or multiple functions that work off the props!

The **App** component is pretty similar to our part one example, so we'll skip this and look at the `connect()` function.

`connect()` is a generic type that can take three types `connect<IStateToProps, IDispatchToProps, IProps>()`. Going from left to right--first is the type definition for stateToProps. This is the connecting component's props we're mapping the Redux **state** to. Second, the type definition for dispatchToProps. This is the connecting component's props we're mapping Redux **actions** to. Lastly, we're not using it in this example, but we can provide the props of our component we're connecting.

We've successfully converted our counter to Redux, and provided useful types also!
