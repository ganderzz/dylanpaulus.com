---
title: "Part One: Using Typescript with React"
tags: ["React", "Typescript", "Javascript"]
date: "2018-05-16"
series: "Using Typescript with React"
published: true
---

Finished Example: [Click Here](https://codesandbox.io/s/n3138x65p0?hidenavigation=1)

Learning Typescript with React can be challenging, and in my case, cursing Microsoft and throwing `any` on every variable. The goal of this series is to document what I've learned while developing applications in React, and trying hard to shove in Typescript. Like many things, the initial learning curve may be staggering, but adding a type-checker repays dividends once the gears start turning. _One thing to note:_ this isn't a post about setting up Typescript. We'll assume a **tsconfig.json** exists, and compiles our code to valid JavaScript.

We'll go through part one by creating a counter, and adding types where needed.

### App

Starting out, we have a scaffolding of our application.

```jsx
// Note, Typescript requires the whole React package to be imported.
// More information can be found: https://stackoverflow.com/a/37491916
import * as React from "react";

class App extends React.Component {
  public render() {
    return (
      <div>
        test
      </div>
    );
  }
}
```

Looks like a valid React class component, but a few Typescript differences stand out right away. First, because React lib doesn't have a default export, Typescript requires us to import the whole package (`import * as React from "react";`). Second, all React methods are defined as `public` (_private or protected_ will not work), as seen in the **render** method. _We can remove the **public** keyboard, and the component will work the same._ I like to explicitly define scope of my methods to help differentiate between my methods and React's. Generally, I define my methods as `private` unless otherwise needed. This enforces the scope of the method to just the component, and prevents unwanted side-effects.

### State

We'll need a way of storing the state of the counter. Let's implement this.

```jsx
// Note, Typescript requires the whole React package to be imported.
// More information can be found: https://stackoverflow.com/a/37491916
import * as React from "react";

interface IState {
  count: number;
}

class App extends React.Component<{}, IState> {
  public readonly state = {
    count: 0
  };

  public render() {
    return (
      <div>
        {this.state.count}
      </div>
    );
  }
}
```

A lot is happening here, so we'll break it down change-by-change.

##### Interface

```jsx
interface IState {
  count: number;
}
```

First, we create a new [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html) that defines the _shape_ of our component's state.

Notice that as a practice we start the interface name with an uppercase **"I"**. This is borrowed from OOP languages, like C#, to allow us to better identify a variable _vs_ type _vs_ interface.

Another practice I've adopted: define Typescript types in PascalCase, and Javascript variables in camelCase. Yet another helpful naming scheme to prevent trying use a type definition as executable code!

Moving on, we define our component's state as having one field, count. In Typescript there is no difference between a float `0.0001` and an int `10`. To say something is 'number-like', we give it the type `number`.

##### Class Definition

```jsx
class App extends React.Component<{}, IState> {
```

`React.Component` (also `React.PureComponent`) are generic types allowing us to provide the _shape_ of the component's props and state. Component comes with a couple predefined properties (`children` and `ref` to name a few). Because App doesn't have any props, we'll use an empty object. The React Typescript definition combines the type we pass in with the default Component type, so even with an empty object, the inherited component props will still be available (eg. children and ref). For our component's state, we'll tell Typescript we want to use our state shape defined in IState.

To break it apart:

- Define a component with just state: `React.Component<{}, IState>`
- Define a component with just props: `React.Component<IProps>`
- Define both state and props: `React.Component<IProps, IState>`

##### Defining State

```jsx
public readonly state = {
  count: 0
};
```

Finally, we define the state for the component. Remember, so far we've only told Typescript what the _shape_ of our state is. This is where we define its actual value in React. Because state is needed by React, we define it as `public`. Also, since we don't want anyone mutating the state directly, we then add `readonly`. This will throw a Typescript error whenever we try to reassign state directly to a value (eg. `this.state.count = this.state.count + 1; // Error!`). Next, we define our public readonly variable to have the name _state_, and assign it an object that matches the shape we defined in **IState**. Since we defined `React.Component` with **IState** as our state shape, Typescript knows that the state should have a **count** field with a number value.

### Adding Events

Let's finish our counter by adding some buttons, and a click event that either decrements or increments the count.

```jsx
// Note, Typescript requires the whole React package to be imported.
// More information can be found: https://stackoverflow.com/a/37491916
import * as React from "react";

interface IState {
  count: number;
}

class App extends React.Component<{}, IState> {
  public readonly state = {
    count: 0
  };

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const type: string = event.currentTarget.title;

    this.setState(({ count }) => ({
      count: type === "decrement" ? count - 1 : count + 1
    }));
  };

  public render() {
    return (
      <div>
        <button title="decrement" onClick={this.handleClick}>
          -
        </button>
        {this.state.count}
        <button title="increment" onClick={this.handleClick}>
          +
        </button>
      </div>
    );
  }
}
```

The big change is the addition of a new method.

`private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {`

We create a new private method called `handleClick` that will take care of our button click events. Notice that since React uses synthetic events--we have to use one of React's types. The event was triggered by a click of the mouse, so we'll use `React.MouseEvent`. **React.MouseEvent** is a generic type that takes the type of element the event is triggered from. In our case, it's the default HTML button element (defined as `HTMLButtonElement`). We finish off by incrementing or decrementing the count based on the title of the button.

Our counter is now complete with TypeScript types!

[To be continued in part two...](/posts/using-typescript-with-redux-part-two)
