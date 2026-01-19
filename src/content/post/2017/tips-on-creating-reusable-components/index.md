---
title: "Tips on Creating Reusable Components"
tags: ["React", "Javascript"]
date: "2017-09-08"
published: true
---

### Introduction

A huge selling point of React is its use of composable, reusable components. Everything is built off the idea of `V = F(d)`, or view/UI is created by some function acting on data/state. How do we create more advanced user interface? Well, just add more functions to the party (For example `V = G(F(E(S(d))))`). That's cute, why does this matter? Thinking of our components as functions, even if we use _class_, will help us create more reusable components. It even helps us write super helpful utility functions called [Higher Order Components](/posts/higher-order-components/).

We'll look at ways to improve our reusability and composition of components by using an example component a long the way. For this article, we'll use a component that adds an Icon to a button.

For example,

```jsx
class IconButton extends React.Component {
  render() {
    <Button onClick={this.props.onClick}>
      <Icon /> {this.props.text}
    </Button>;
  }
}
```

And to consume the button,

```jsx
<IconButton text="Click Me!" onClick={() => alert("Click!")} />
```

Not bad.. easy to use, and to the point. But, some part of me thinks this could be better. Let's walk through a few suggestions on making this component more reusable.

### Keep it Simple, Jack

Continuing on the topic of thinking of components as functions, keep components simple. Components that do too many things are dangerous. They are easy to break, and a pain to maintain. Instead, split functionality into separate components, then compose those components to make something functional. This makes it really easy to maintain features, and to swap out functionality when requirements change.

Going to the IconButton example, we really don't need an IconButton component. What if tomorrow we need an IconInput button? We not only have two separate, but pretty similar components to maintain! We can fix this by using composition. What we really want is something that 'adds an icon' to a component. Let's make a new component called IconAdder.

```jsx
class IconAdder extends React.Component {
  render() {
    return (
      <div>
        <Icon /> {this.props.component}
      </div>
    );
  }
}
```

to consume it

```jsx
<IconAdder
  component={<Button onClick={() => alert("Click!")}>Click Me!</Button>}
/>
```

IconAdder allows us to throw any ol' component we want into it, and it'll add an Icon to it. Nice.

### Hello There, Children!

One thing I come across a lot is the overuse of component properties. Components should almost never be used as properties. It ends up making components hard to use, and in the end, we are fighting with React. In React, every component has a property called children (`props.children`). This says, whatever we pass between this component's tags, we'll insert here. Let's see an example `props.children` in the IconAdder component.

```jsx
class IconAdder extends React.Component {
  render() {
    return (
      <div>
        <Icon /> {this.props.children}
      </div>
    );
  }
}
```

to consume it

```jsx
<IconAdder>
  <Button onClick={() => alert("Click!")}>Click Me!</Button>
</IconAdder>
```

The `<Button>` component will be inserted in IconAdder's `{this.props.children}`! Much better!

### Injecting HTML Types

I wrote an article on this [subject here](/posts/injecting-react-tag-types/) already so I'll be brief.

As someone consuming a component, I want as little pollution of my code as possible. Pollution in this case could be anything: event handlers, code size, or even HTML elements. In the case of our IconAdder component, a parent `<div>` wrapper gets added to every component using it. It would be great if we could get rid of the div, and just make it our child component. Well... we're in luck. We can specify a tag property, and then use that property. This lets the end-user be in control of their DOM structure.

```jsx
class IconAdder extends React.Component {
  render() {
    const { tag, onClick, children } = this.props;
    const Tag = tag;

    return (
      <Tag onClick={onClick}>
        <Icon /> {children}
      </Tag>
    );
  }
}
```

to consume it

```jsx
<IconAdder tag={Button} onClick={() => alert("Click!")}>
  Click Me!
</IconAdder>
```

Another benefit of using a 'tag' property, is let's say that we want to support React Router's `<Link>` component, but we also need to support the classic HTML `<a>` tag. We can easily swap these two out by just changing the 'tag' prop!

### Allow Extension

Nothing grinds my gears like getting a fresh new component, but realizing I want to make the font bold. So, I add a quick `style={ { fontWeight: 800 } }` to the component, refresh, and nothing changes. (Warning: what is about to be shown requires a transpiler).

We should allow our components to be reasonably editable, while protecting what we need to. This can be done by the [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Rest_in_Object_Destructuring).

Right now, our IconAdder component won't accept a style, className, or title prop. Oh yeah, and what about in the future if we need to use IconAdder on a `<a>` tag. We'll need to support href also. Let's use the rest operator to support all of these properties!

```jsx
class IconAdder extends React.Component {
  render() {
    const { tag, onClick, children, ...rest } = this.props;
    const Tag = tag;

    return (
      <Tag onClick={onClick} {...rest}>
        <Icon /> {children}
      </Tag>
    );
  }
}
```

to consume it

```jsx
<IconAdder
  tag={Button}
  onClick={() => alert("Click!")}
  style={{ fontWeight: "800" }}
  title="A button for clicking">
  Click Me!
</IconAdder>
```

`...rest` will grab whatever properties we haven't taken off in the destructuring (`const { a, b, c} = this.props;`), and assign it, in this case, to a variable called `rest`. We then apply all those properties to our `<Tag>` component by destructuring the `rest` object into the individual props. As shown in the consumption of IconAdder, we can now add whatever other properties we want!

### Conclusion

These are a few tips I use when creating components to keep them easier to consume, and extend. In summary, think of every component as a function. It will consume some input, and produce an output. The children property is your friend, use it when it makes sense! Dynamically injecting the component type can turn multiple similar components, into one highly reusable component. Finally, allow components to receive extra props, and have the properties/styles override the base implementation when possible.
