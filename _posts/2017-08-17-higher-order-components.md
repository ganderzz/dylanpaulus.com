---
layout: post
title: "React: Introduction to Higher Order Components"
category: "ReactJs"
---

# Introduction to Higher Order Components

### Introduction

Think of Higher Order Components (HOC) like Pacman. As Pacman consumes his smaller looking dot counterparts, Pacman gains superpower abilities. Like ghost eating! HOC's work similarly... minus ghosts.
A HOC consumes a base component, applies some new ability or super power, then spits out a new modified base component. To help show the power of HOC's, lets create one that does a simple check. If a component doesn't have children, show an empty component. When children are present, we'll display them.

### withEmptyState()

First, lets define our base component.

```
function Hello(props) {
    return (
        <div>Hello, {props.children}!</div>
    );
}
```

Before jumping straight into the HOC, what are we trying to achieve? We want to pass our `<Hello />` component into some function, lets call it withEmptyState(), which creates and returns a new component. This new component will either: show `<Hello />` if the new component has children, or will return null.

```
function withEmptyState(component) {
    return function(props) {  // Start new stateless functional component
        if (props.children) {
            return component(props);
        }

        return null;
    }
}
```

Pretty simple, but extremely powerful! All this function does is take a component, then returns a new stateless functional component. Inside, we check the props. Does this component have children? If yes, return our originally passed in component using our new component's props (We'll see how this ties in soon). If no children exist, don't render anything.

But how would I use withEmptyState?

```
const HOC = withEmptyState(Hello);

class MyContainer extends React.Component {
    render() {
        return (
          <HOC />

          <HOC>WORLD!</HOC>  
        );
    }
}
```

Our first instance of `<HOC />` wouldn't render anything, as we haven't gave it children.

The second `<HOC>WORLD!</HOC>` would render our `<Hello>` component; we would see "Hello, WORLD!".


### The End

Higher Order Components allow us to separate common functionality into their own functions, so we don't have to add duplication between components. They also allow us to decouple functionality!