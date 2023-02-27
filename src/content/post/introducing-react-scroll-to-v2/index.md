---
title: "Introducing React-Scroll-To v2"
tags: ["React", "Javascript"]
date: "2018-11-03"
published: true
---

The latest version of a React component I maintain just released, v2 of react-scroll-to. First, it started out as a component I needed, but over time a few people started using it. Because it was initially created for my specific use-case it started to show its warts when new features were ask for. The goals for v2 were two-part: introduce a more flexible API and implement some highly asked for features (scroll by a ref and smooth scrolling).

So what is react-scroll-to? React-scroll-to is a pretty simple component. It allows the control of scrolling either the brower's window, or a component (overflow) to a specific point.

We'll look at a few examples to show off what react-scroll-to can do.
_(As a note, in this post I'll only be showing render props, but react-scroll-to also supports higher order components. Examples can be found at: https://github.com/ganderzz/react-scroll-to)_

### Basics

```jsx
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return <ScrollTo>{({ scrollTo }) => <a onClick={() => scrollTo({ y: 500 })}>Scroll to Bottom</a>}</ScrollTo>;
  }
}
```

In the component above we're importing the `ScrollTo` component from react-scroll-to. This is a render prop, so we'll pass a function as its children. `ScrollTo`'s children has an object as its parameter--this is so the consumer of this component can choose, exactly, what properties they care about. Generally we'll only need `scrollTo`.

`scrollTo()` is a function, when called, will either:

- Scroll the brower's window based on the given parameters (in this case, scroll 500px from the top of the page)
- Scroll all `<ScrollArea>` components, inside `<ScrollTo />`, to the given parameters (We'll see this later)

_Note: react-scroll-to uses absolute positions--the ability to use relative positioning is coming soon!_

When a user clicks on the link, in the example, we'll see the window scroll down 500px!

### Scroll Area

The `<ScrollArea>` component gives `scrollTo` the ability to scroll components, instead of the window.

```jsx
import React, { Component } from "react";
import { ScrollTo, ScrollArea } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <a onClick={() => scrollTo({ y: 500 })}>Scroll to Bottom</a>

            <ScrollArea>My long content...</ScrollArea>
          </>
        )}
      </ScrollTo>
    );
  }
}
```

Since a `<ScrollArea/>` component lives as a child component of `<ScrollTo />`, whenever we call `scrollTo()`, it'll scroll all of the `<ScrollArea />` components. So in this example when the link is clicked only the "My long content..." area will scroll.

But what if we have multiple `<ScrollArea />` components?

```jsx
import React, { Component } from "react";
import { ScrollTo, ScrollArea } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <a onClick={() => scrollTo({ y: 500 })}>Scroll to Bottom</a>

            <ScrollArea>My long content...</ScrollArea>

            <ScrollArea>My long content 2...</ScrollArea>
          </>
        )}
      </ScrollTo>
    );
  }
}
```

In the case where more than one `<ScrollArea />` components exist in a `<ScrollTo />`, both components will scroll.

What if we only want to scroll one of the `<ScrollArea />` components?

```jsx
import React, { Component } from "react";
import { ScrollTo, ScrollArea } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <a onClick={() => scrollTo({ id: "content-two", y: 500 })}>Scroll to Bottom</a>

            <ScrollArea>My long content...</ScrollArea>

            <ScrollArea id="content-two">My long content 2...</ScrollArea>
          </>
        )}
      </ScrollTo>
    );
  }
}
```

By adding an `id` property to a `<ScrollArea />` we are able to reference that component in our `scrollTo()` function. `scrollTo()` then takes another field, 'id', that'll scroll any `<ScrollArea />` component that matches that id (id's must be unique).

### V2 Features

scrollTo and ScrollArea have both existed in v1; let's look at branch new features.

##### Smooth Scrolling

Smooth scrolling couldn't be simpler. By adding a `smooth: true` property to the `scrollTo()` object, react-scroll-to will automatically apply smooth scrolling.

```jsx
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <a onClick={() => scrollTo({ x: 200, smooth: true })}>
            {/* Oh yeah, we can scroll by x also! */}
            Scroll to Bottom
          </a>
        )}
      </ScrollTo>
    );
  }
}
```

##### Scroll by Ref

Maybe instead of using a `<ScrollArea />` component, we have a ref to a component we want to scroll. Or maybe instead we want to scroll a component outside `<ScrollTo />`'s children. Now we have the ability by providing the ref through the `scrollTo()` argument object!

```jsx
import React, { Component } from "react";
import { ScrollTo } from "react-scroll-to";

export default class MyComponent extends Component {
  myRef = React.createRef();

  render() {
    return (
      <ScrollTo>
        {({ scrollTo }) => (
          <a onClick={() => scrollTo({ ref: this.myRef, y: 200, smooth: true })}>
             Scroll to Bottom
          </a>
        )}
      </ScrollTo>

      <div ref={this.myRef}>
        I'm outside ScrollTo!
      </div>
    );
  }
}
```

### Conclusion

V2 of react-scroll-to provides a lot of behind-the-scenes structural changes that'll allow for a better developer experience while implementing new features. We also added many new features that have been in demand. As things solidify, we hope to expose hooks in react-scroll-to to allow even more flexibility.

Check it out: [react-scroll-to](https://github.com/ganderzz/react-scroll-to)
Examples: [Click Here](https://ganderzz.github.io/react-scroll-to/)
