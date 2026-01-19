---
title: "Injecting Dynamic Elements to Components"
tags: ["Javascript", "Frontend", "React"]
date: "2017-07-26"
published: true
---

### Introduction

Let's say we're working on an UI component library using React JS. We make a super awesome looking button, maybe even the best button in the world. But suddenly, our computer shuts off without saving our component!
Like Tenacious D, we create a tribute to the button which looks like:

```jsx
class AwesomeButton extends Component {
  render() {
    const { children, ...other } = this.props;

    return <button {...other}>{children}</button>;
  }
}
```

Everything is working great. We create buttons all over the place `<AwesomeButton onClick={doStuff}>Click ME</AwesomeButton>`.

The next day, the boss comes over, "This button is amazing, let's make a button link to Google!"
Easy enough, we create a new component that instead uses an anchor tag.

```jsx
class AwesomeButtonLink extends Component {
  render() {
    const { children, ...other } = this.props;

    return <a {...other}>{children}</a>;
  }
}
```

Weeks later, another programmer walks over, "Hey, we're converting to using React Router. Can we get a button that can use the Link component?"
Mumbling under your breath, we create yet another Awesome component.

```jsx
class AwesomeButtonReactRouterLink extends Component {
  render() {
    const { children, ...other } = this.props;

    return <Link {...other}>{children}</Link>;
  }
}
```

We have ourselves a problem. Every time there is a new request we have to create new components that are very similar, just using slightly different render elements. What if the company decides to re-brand. Instead of blue, we are a red company now. Little changes to the visuals of these AwesomeButton components need to be updated individually. Think DRY! Is there a better way of doing this? Stay tuned.

### Dynamically Injecting Elements

What if the consumer of a component could define its base element? Let's look at the example below:

```jsx
class AwesomeButton extends React.Component {
  render() {
    const { children, tag = "button", ...other } = this.props;
    const Tag = tag;

    return <Tag {...other}>{children}</Tag>;
  }
}
```

So we have this new property called tag. Tag will be our way of passing in an element/component into AwesomeButton. If the es6 destructing looks different, let me explain. We will pull out the `tag` prop from `this.props`. If no value is defined for tag, we will set its default value to be `"button"` (A Button HTML element).
The next line, `const Tag = tag;` is so we can fulfill what React's JSX considers a component. All components must be uppercase, where html elements need to be lowercase. Since we are using then variable `tag`, JSX will always treat the incoming values as a component. So, we have to uppercase our variable.
We now render the prop `Tag` as our element. Whatever `tag` equals, that will be our element!

A few examples:

```jsx
<AwesomeButton onClick={doSomething}>Click Me!<AwesomeButton>
```

Will render the default button. `<button onClick={doSomething}>Click Me!</button>`

```jsx
<AwesomeButton tag="a" href={`/myPage`}>Click Me!<AwesomeButton>
```

Will render using an anchor tag `<a href={'/myPage'}>Click Me!</a>`

```jsx
<AwesomeButton tag={Link} to={`/myPage`}>Click Me!<AwesomeButton>
```

Will render using a React Router Link component `<Link to={'/myPage'}>Click Me!</Link>`

Neat! But why is this happening?

### JSX Transformations

Our JSX, in the render function, gets transformed into plain jsx functions that the browsers can use. With this in mind, our AwesomeButton's JSX gets transformed into a `React.createElement()` function with the element name as the first argument.
With the help of our good friend Babel, let's see what different components compile to!

First, let's look at a simple component that just renders a div with the text "test".

```jsx
class AwesomeButton extends React.Component {
  render() {
    return <div>test</div>;
  }
}
```

[Compiled Example - Click Me!](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=MYGwhgzhAECCDuBTCB7AtogQgVwC65QDtpEAPXRQgExgCVExhcA6AYXQAcjLdoBvALAAoaKOgAnSlUTiAFAEp-wsSomJc2ccVnLVqgDxUAlgDcAfBQi59AemPnouvfIDcT6AF9hHoA)

If we look in the render method, we can see what our JSX actually compiles to.

![div Compiled Code](data:image/png;base64,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 "div Compiled Code")

Well that's cool. So our div element just gets defined as the first parameter of `React.createElement`. I wonder what happens if we try this with our element injecting AwesomeButton?

```jsx
class AwesomeButton extends React.Component {
  render() {
    const { children, tag = "button", ...other } = this.props;
    const Tag = tag;

    return <Tag {...other}>{children}</Tag>;
  }
}
```

[\<AwesomeButton\>Click Me!\</AwesomeButton\>](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=MYGwhgzhAECCDuBTCB7AtogQgVwC65QDtpEAPXRQgExgCVExhcA6AYXQAcjLdoBvALAAoaKOgAnSlUTiAFAEp-wsSujAiEXnzUALAJYgqkwgBpouMAHNoAXmgAiAEZ4Che2eaeUuHTOgBfW3N9CGYOcRQOCABuZVVRdUJNaAAVKyCLS1ihOPjJXGxxYllc-NEAHjTrPk9mb19xfwA-PmB9Q2N_coB6KqboUpV5bJV_YX8gA)

Looking at the render method in AwesomeButton:

![AwesomeButton Compiled Code](data:image/png;base64,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 "AwesomeButton Compiled Code")

Woah, our Tag variable just gets put where the element is! This is exactly the same to how components are treated in JSX. They get ploped straight into the first argument of `React.createElement`. Now, when the boss asks for a new feature in `AwesomeButton`, we only have to change this one implementation of the component. All consumers of the component might use it vastly differently, but we are able to keep our code DRY and highly reusable!
