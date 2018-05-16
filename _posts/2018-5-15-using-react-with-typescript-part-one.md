---
layout: post
title: "Part One: Using Typescript with React"
category: ["React", "Typescript"]
tag: ["Javascript", "Frontend", "React", "Typescript"]
---

# Part One: Using Typescript with React

Learning Typescript with React can be challenging, and in my case, cursing Microsoft and throwing `any` on every variable. The goal of this series is to document what I've learned while developing applications in React, trying hard to shove in Typescript. Like many things, the initial learning curve may be staggering, but adding a type-checker repays dividends once the gears start turning. *One thing to note:* this isn't a post about setting up Typescript. We'll assume a **tsconfig.json** exists, and compiles our code to valid JavaScript.

We'll start out simple--making a counter.

### App

Starting out, we have a scaffolding of our application.

```js
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

Looks like a valid React class component, but a few Typescript differences stand out right away. First, because React lib doesn't have a default export, Typescript requires us to import the whole package (`import * as React from "react";`). Second, all React methods are defined as `public` (*private or protected* will not work), as seen in the **render** method. We can remove the **public** keyboard, and the component will work the same. I like to keep it around for consistency, and to differentiate between React and my methods. Generally, I define my methods as `private` unless otherwise needed. This enforces scope to just the component, and prevents unwanted side-effects.

### State

We'll need a way of storing the state of the counter. Let's also implement this in our App component.

```js
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

A lot is happening here, so we'll break it down line-by-line.

```js
interface IState {
  count: number;
}
```

First, we create a new [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html) that defines the *shape* of our component's state. 

Notice that as a practice we start the interface name with an uppercase **"I"**. This is borrowed from OOP languages, like C#, to allow us to better identify what is a variable *vs* type *vs* interface.

Another practice I've adopted: define Typescript types in PascalCase, and Javascript variables in camelCase. Yet another helpful naming scheme to prevent trying use a type definition as executable code!

Moving on, we define our component's state as having one field, count. In Typescript, there is no difference between a float `0.0001` and an int `10`. To say something is 'number-like', we give it the type `number`.


```js
class App extends React.Component<{}, IState> {
```

`React.Component` (also `React.PureComponent`) are generic types allowing us to provide the *shape* of the component's props and state. Component comes with a couple predefined properties, `children` and `ref` to name a few. Because App doesn't have any props, we'll use an empty object. The React Typescript definition combines the type we pass in with the default Component type, so with an empty object, the base component props will still be available (eg. children and ref)). For our component's state, we'll tell Typescript we want to use our state shape defined in IState.

To break it apart:
- Define a component with just state: `React.Component<{}, IState>`
- Define a component with just props: `React.Component<IProps>`
- Define both state and props: `React.Component<IProps, IState>`

