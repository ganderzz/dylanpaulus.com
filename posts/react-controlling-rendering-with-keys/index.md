---
title: "React: Controlling Rendering with Keys"
tags: ["React", "Javascript"]
date: "2018-10-18"
published: true
---

`key`, the property we throw some value into to suppress warnings. This property is used by React to determine when a component is deleted, updated, or created. We generally don't interact much with the `key` prop--except in loops.

My team recently ran into an issue lately--how do we rerender all child components when a state has changed? The simplest approach... you guessed it, `key`!

Let's take a look.

```jsx
class Parent extends Component {
  state = {
    key: true,
    count: 0,
  };

  handleChildUnmount = () => {
    this.setState((prevProps) => ({ count: prevProps.count + 1 }));
  };

  toggleKey = () => {
    this.setState((prevProps) => ({ key: !prevProps.key }));
  };

  render() {
    const { key, count } = this.state;

    return (
      <div>
        <button onClick={this.toggleKey}>Toggle Child Key</button>
        <Child key={key} count={count} onUnmount={this.handleChildUnmount} />
      </div>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return <div>Total Renders: {this.props.count}</div>;
  }
}
```

[![Edit react-scroll-to](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/48zl4zoyv0)

In this example we are toggling the `key` prop of our Child component between _true_ and _false_. We then keep track every time the Child unmounts through a callback to increment the Parent's state. When we toggle the `key` prop, we will see the counter increment each time. This is, because React uses the key to determine if a component has changed. Since we are changing the key each time React will see our component has updates, and rerender the Child component.

This is the easiest way to cause a rerender of a child component (and all children of the child), and shows the power of understanding the`key` prop!

_Note:_ Even if a child component returns _false_ in a `shouldComponentUpdate`, changing the key prop will cause it to rerender anyway (Try it in the CodeSandbox above!).
