---
title: "Making React Fast: Tips on Optimizing ReactJS"
tags: ["React", "Javascript"]
image: banner.jpg
date: "2020-02-04"
published: true
layout: ../../../layouts/BlogPost.astro
---

React does a fantastic job abstracting away the rendering of webpages. When state changes, our UI's reflect it. But, have you ever gotten done writing your application just to notice things seem off? Clicking a button displaying a popover stutters for a second, or animations don't run smoothly.
With React being just a view layer there is a single bottleneck causing "jank" (stuttering in the interaction)... Rendering. If our applications never had to render they'd all be blazing fast running at millions of frames per second (I had top scientists run the numbers)!
Fortunately we don't live in that world. Our applications are useful--they render and then re-render.

The majority of devices have screens refreshing 60 times a second. Our applications have a short time-frame to update, render, and interact with users. [According to Google all work needs to be completed within 10ms](https://developers.google.com/web/fundamentals/performance/rendering/). Yes you read that right, 10ms. A daunting task. React gives us a lot of tools to take on this challenge. Let's take a look at a few of these.

### The DOM Tree

Before moving onto improving React we need to take a step back. We need to get a few foundational ideas out of the way. The universal data structure of the internet is the [Tree](https://en.wikipedia.org/wiki/Tree_%28data_structure%29). HTML is built off of it.
If we consider the following HTML:

```html
<div>
  <span>Hello</span>
  <p>World</p>
</div>
```

Then the data structure representation would look like:

![DOM tree structure](./html-diagram.svg)

React takes the same DOM (Document Object Model.. ie. HTML) tree structure, and mirrors it in memory--called the Virtual DOM. Kind of like how a cache is to I/O, the Virtual DOM is to the DOM Tree. It's faster to perform CRUD operations (Create, Read, Update, Delete) in the Virtual DOM. The browser performs massive amounts of work when the DOM Tree is changed: painting, layout, calculations, etc. The Virtual DOM is only a representation of the DOM in memory, so things like painting and layout don't need to be calculated. It's easier to perform many changes to the Virtual DOM then commit the final result, than it is to perform each change to the browser's DOM tree.

When thinking to optimizing React, think of the Virtual and browser's DOM Tree. The less work each of these structures have to perform, the faster our applications behave!

### What causes React to render?

There are two main reasons for components to render in React: when a component's _state_ changes, or when its _props_ change. Out of the box React chooses the naive approach in deciding what needs re-rendered. Re-render the element, and any of its children nodes, every time the props/state changes. For example in the figure below, say we change the state of node 2. All elements contained within the dashed line would also be re-rendered.

![Shows two DOM tree structures with one being re-rendered](./react-rendering.svg)

Don't take this as a bad thing! React cannot make any preconceived assumptions on how our application functions, so it chooses the most user friendly approach. It would instead be frustrating if we updated our application with a logged-in user prop, and the MenuBar component six layers deep didn't reflect this change.

### shouldComponentUpdate()

Every (class-based) React component has a `shouldComponentUpdate()` method which returns a boolean. It does exactly what the name suggests, returns `true` if the component should render on prop/state changes, or `false` if it shouldn't. Remember how we said a component always updates on prop/state changes? By default each component's `shouldComponentUpdate()` looks like:

```js
shouldComponentUpdate() {
  return true;
}
```

Yup, on every update the component re-renders! But, what if we only wanted a component to update when certain props change? React will first call `shouldComponentUpdate()`, then move to updating the component if `true` is returned. `shouldComponentUpdate()` takes two parameters: the next props and the next state. We could calculate any number of scenarios to optimize our application. Consider,

```js
shouldComponentUpdate(nextProps, nextState) {
  if (!this.props.isOpen && nextProps.isOpen) {
    return true;
  }

  return this.state.textInput === nextState.textInput;
}
```

This is great for components with a few props and state, but as components grow so do the need to check every prop and state. There has to be an easier way, right? Stay tuned!

### PureComponent/Memo

Let's start with memoization... what is it? Why do we care?

Think of when a function receives arguments, like `add(1, 2)`. Given the same inputs we can assume that we'll receive the same output (from our add example, the output is always 3). Let's also assume we have bad code and `add(a, b)` is a function that performs a bunch of computation. On average it takes three seconds to complete. After running the `add(1, 2)` function once we already know it outputs 3, so why should we waste additional time computing the output? [Memoization](https://en.wikipedia.org/wiki/Memoization) is the act of caching, or storing, the result of a function call and returning the cached result on future requests.

In the same way, memoization is also utilized within React to prevent having to compute expensive renders (computations) over and over again.

Remember our friend `shouldComponentUpdate()`? We can achieve the same effect with PureComponent. Generally, our class-based React components will look like:

```js
class MyComponent extends React.Component {
  ....
}
```

But, for extra optimization goodness we can replace `React.Component` with `React.PureComponent`.

```js
class MyComponent extends React.PureComponent {
  ....
}
```

These two classes differ in their implementation of `shouldComponentUpdate()`. React.Component's `shouldComponentUpdate()` will always return true unless we override it (ie. always re-render on update). React.PureComponent has its own implementation of `shouldComponentUpdate()` which automatically performs a shallow comparison of all the component's props and state. If any of the new props the component receives are changed, then return true. Otherwise, it will return false (ie. not triggering a re-render, and returning the previously calculated render of the component).

Up until this point we've only talked about class-based components. You may be asking yourself, "Fine, but what about function components?" Since our goal is to 'cache' the output of a function component, React gives us a handy utility for memoizing our function components... `React.memo`! This works similarly to React.PureComponent in class-based components. If the component receives new props/state it re-renders. Otherwise, return the computed output from before.

```js
function MyComponent(props) {
  ...
}

export React.memo(MyComponent);
```

_Warning:_ Don't get `React.memo()` confused with `React.useMemo()`. These are different, and used in different ways!

### Hooks (useMemo, useCallback)

I won't specifically go over how hooks work in this section. For an introduction, [check out the infinitely better documentation](https://reactjs.org/docs/hooks-intro.html) from the official website. Instead, we'll be checking out two hooks that help us improve the rendering speed of our applications.

`useMemo()` is useful for 'caching' the results of a computationally expensive expression which returns a value. For example,

```js
function MyComponent(props) {
  const result = React.useMemo(() => JSON.parse(props.value), [props.value]); // highlight-line

  ...
}
```

We provide `useMemo()` a second argument, which says whenever the value changes (props.value), rerun the function provided in the first argument. This makes it so values only get recalculated when they change.

<br />

`useCallback()` instead returns a 'cached' version of a function.

```js
function MyComponent(props) {
  /* highlight-range{1-3} */
  const handleClick = React.useCallback((event) => {
    console.log(event);
  }, []);

  ...
}
```

Instead of rebuilding the function on every render, `useCallback()` calculates a function only when needed.

### Extracting Components

Large components are hard to maintain. To make our components easier to manage we may break them up into smaller, easier to manage pieces. Great! We achieved clean code! But, splitting components into smaller chunks also makes it easier to optimize computational heavy code. Its hard to optimize certain aspects of a gigantic component. In React either the whole component re-renders, or it doesn't. If components are broken down, using the techniques mentioned above (memo, pureComponent, and shouldComponentUpdate) become really powerful. We can isolate the bottlenecks in our applications and optimize.

### End

There is a tradeoff in optimization. Memoized components create more memory that needs to be stored (ie. the output being cached). Also, there are additional computations needed in figuring out when and when not to re-render. Don't prematurely optimize. Run performance tests when you can, and optimize the pieces of your code that really need it!
