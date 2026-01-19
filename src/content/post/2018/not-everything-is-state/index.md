---
title: "React: Not Everything is State"
tags: ["React", "Javascript"]
date: "2018-10-05"
published: true
---

When working with React we get introduced to state as a way if storing component's data. There is another way that generally gets overlooked: class properties.

#### Example

```jsx
class AnnoyingButton extends React.Component {
  intervalId = null; // Here!
  id = generateUniqueId(); // Here!

  state = {
    isDisabled: false,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(({ isDisabled }) => ({
        isDisabled: !isDisabled,
      }));
    }, 100);
  }

  componentWillUnmount() {
    console.log(`Unmounting ID: ${this.id}`);
    clearInterval(this.intervalId);
  }

  render() {
    return <button disabled={this.state.isDisabled} />;
  }
}
```

Nothing special about the component; the interesting bits are the `id` and `intervalId` variables. We need some way of preventing memory leaks when the component unmounts. In componentDidMount we save the interval's ID to a class property. Then, use the property to clear the interval and `console.log` the component's unique ID.

You might be thinking, "Why chouldn't we just store this information in the component's state?" React re-renders the component, and any child components, when the state changes. If the render method never uses a piece of the state it could be causing unwanted renders--making your application slower!

**When to use class properties:** If state needs to be stored, but is never used as a part of the view/render of a component.
