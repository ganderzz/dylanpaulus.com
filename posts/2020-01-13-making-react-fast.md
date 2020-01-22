---
title: "Making React Fast: Tips on Optimizing ReactJS"
tags: ["React", "Javascript"]
path: "/blog/making-react-fast"
image: matthew-brodeur-eJ9mX6yEbAw-unsplash.jpg
date: "2020-01-19"
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

![DOM tree structure](../src/images/media/html-diagram.svg)

React takes the same DOM (Document Object Model.. ie. HTML) tree structure, and mirrors it in memory--called the Virtual DOM. Kind of like how a cache is to I/O, the Virtual DOM is to the DOM Tree. It's faster to perform CRUD operations (Create, Read, Update, Delete) in the Virtual DOM. The browser performs massive amounts of work when the DOM Tree is changed: painting, layout, calculations, etc. The Virtual DOM is only a representation of the DOM in memory, so things like painting and layout don't need to be calculated. It's easier to perform many changes to the Virtual DOM then commit the final result, than it is to perform each change to the browser's DOM tree.

When thinking to optimizing React, think of the Virtual and browser's DOM Tree. The less work each of these structures have to perform, the faster our applications behave!

### What causes React to render?

There are two main reasons for components to render in React: when a component's _state_ changes, or when its _props_ change. Out of the box React chooses the naive approach in deciding what needs re-rendered. Re-render the element, and any of its children nodes, every time the props/state changes. For example in the figure below, say we change the state of node 2. All elements contained within the dashed line would also be re-rendered.

![Shows two DOM tree structures with one being re-rendered](../src/images/media/react-rendering.svg)

Don't take this as a bad thing! React cannot make any preconceived assumptions on how our application functions, so it chooses the most user friendly approach. It would instead be frustrating if we updated our application with a logged-in user prop, and the MenuBar component six layers deep didn't reflect this change.

### shouldComponentUpdate()

Every React component has a `shouldComponentUpdate()` method. It does exactly what the name suggests, returns `true` if the component should render on prop/state changes, or `false` if it shouldn't. Remember how we said a component always updates on prop/state changes? By default each component's `shouldComponentUpdate()` looks like:

```js
shouldComponentUpdate() {
  return true;
}
```

Yup, on every update the component re-renders! But, what if we only wanted a component to update when certain props change? When determining if a component should update, React will first call our `shouldComponentUpdate()` method, then move on to update the component if `true` is returned. This gives us access to not only the current props/state, but `shouldComponentUpdate()` takes two parameters: the next props, and the next state. We could calculate any number of scenarios to optimize our application. Consider,

```js
shouldComponentUpdate(nextProps, nextState) {
  if (!this.props.isOpen && nextProps.isOpen) {
    return true;
  }

  return this.state.textInput === nextState.textInput;
}
```

This is great for components with small amounts of props and state, but as components grow things get more difficult. Stay tuned for PureComponent and Memoization!

### Hooks (useMemo, useCallback)

// TODO

### PureComponent/Memo

// TODO

Think of when a function receives arguments, like `add(1, 2)`. This function should always return the same result, 3. The same applies to React. If our component (function) takes the same arguments (props), then there is no reason to recalculate and render the result again.

### Extracting Components

// TODO
