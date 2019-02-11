---
title: "Encapsulating State with Functional Children"
tags: ["React", "Javascript"]
path: "/blog/encapsulating-state-functional-children"
date: "2017-09-14"
---

### Introduction

There is a technique for creating reusable components that got missed in my last post, [Tips on Creating Reusable Components](/reactjs/2017/09/08/tips-on-creating-reusable-components.1/), that I'd like to talk about. That is, components that have functions as children. This is a great tool that mirrors higher order components, in that it lets us abstract away reusable states. We'll start out with an example.

### Breaking down functional children

```jsx
import React from "react";

class Booer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "..."
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        test: "BOO!"
      });
    }, 1000);
  }

  render() {
    // Using children as a function!
    return this.props.children(this.state.test);
  }
}

function Timer(props) {
  return <Booer>{test => <div>{test}</div>}</Booer>;
}
```

_Booer_ is a component that after 1000ms, updates its state to say "Boo!". Nothing special. The power in functional children comes in play in the render method. Instead of treating `this.props.children` as a variable, we pass a long some state which gets injected into the children prop. Moving to the _Timer_ component, we see something a little odd. The _Booer_ component takes a function with an argument, `test`, being that state we passed into `this.props.children`. We are then free to return any valid React children in the function. This let's us reuse state for different visual components! In the case of the _Timer_ component, it will show a _div_ with "...". Once 1000ms is complete, the contents will be replaced with "Boo!".

### Toggle Component

The first example is a nice way to show functional children, but let's make something a little more practical. Like the title suggestions, how about a component that keeps track of a toggle! This may look something like:

```jsx
import React from "react";

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggled: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled
    }));
  }

  render() {
    const { isToggled } = this.state;

    return this.props.children(isToggled, this.toggle);
  }
}

function ToggleButton() {
  return (
    <Toggle>
      {(isToggled, toggle) => (
        <button onClick={toggle}>{isToggled ? "ON" : "off"}</button>
      )}
    </Toggle>
  );
}
```

Looking at it, the _Booer_ component is pretty similar to out new _Toggle_ component. They both handle some state, then pass it to `this.props.children()` as function argument. In the case of _Toggle_, we are now passing two arguments. First, our _isToggled_ state. Second, a class method that will toggle the _isToggled_ state. `this.toggle` will be useful for a consumer to control events.
Looking at the _ToggleButton_ component, it's pretty simple to wire out a button that has toggle ability, while making its state reusable! What if we want a toggle checkbox? We can just swap out the `<button>` JSX tags for `<input type="checkbox">`!

### Conclusion

Functional children is yet another technique for creating reusable components. It helps us move presentational components away from stateful logic (ie. Dumb/Smart components or Containers/Components).
