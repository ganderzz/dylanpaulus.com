---
title: "Generic Type Arguments in JSX Elements"
tags: ["React", "Typescript", "Javascript"]
date: "2018-06-02"
published: true
---

Typescript recently released generic type arguments for JSX in their 2.9 release. It's a mouthfull, but what does that mean for us? A common use-case I'm excited for is allowing consumers of libraries to extend a component's props. Using [dynamic components]({% post_url 2017-07-26-injecting-react-tag-types %}) we'll look at allowing our components to be extended even more.

### What Are Generic Type Arguments?

As shown in the [Typescript release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#generic-type-arguments-in-jsx-elements), generic type arguments are a way to create components using Typescript's generics syntax. Below is a side-by-side comparison of the old way vs. using generic type arguments.

#### **The Old Way:**

```jsx
// Notice color isn't defined as a prop, and will error out normally
function Div(props: { value: string }) {
  const { value, ...rest } = this.props;

  return <div {...rest} />;
}

// Using spread, we can trick Typescript into ignoring that color will be a prop
// on Div
function App() {
  return <Div {...{ color: "red" }} />;
}
```

#### **Generic Type Arguments:**

```jsx
// Notice our new generic on the component
function Div<T extends object>(props: { value: string } & T) {
    const { value, ...rest } = props as any; // spreading on generics not yet supported

    return <div {...rest} />
}

interface IAdditionalProps {
    color: string;
}

// We can tell typescript our Div element has additional properties!
function App() {
    // Generic Type Arguments!
    return <Div<IAdditionalProps> color="red" value="TEXT!!!" />
}
```

And the same can be used with class components:

```jsx
// Notice our new generic on the component
class Div<T extends object> extends React.Component<{ value: string } & T> {
    public render() {
        const { value, ...rest } = this.props as any;

        return <div {...rest} />
    }
}

interface IAdditionalProps {
    color: string;
}

// We can tell typescript our Div element has additional properties!
function App() {
    return <Div<IAdditionalProps> color="red" value="TEXT!!" />
}
```

### Dynamic Elements

Let's say we have a **MenuItem** component that could be overloaded with either a Router link component, or a html _a_ tag. One way we might write this...

```jsx
interface IProps {
  tag: React.ReactNode;
  children: React.ReactNode;
}

function MenuItem({ tag, children, ...rest }: IProps) {
  const Tag: React.ReactType = tag || "a";

  return <Tag {...rest}>{children}</Tag>;
}
```

**MenuItem** works perfect fine as a component, but when it's time to add additional properties, Typescript will yell. For example, the _a_ tag needs a _href_ prop. We don't want to hardcode _href_, because we can inject any type of element through the _tag_ prop (React Router, button, etc).

```jsx
<MenuItem tag="a" href="http://google.com">Click Me!</MenuItem> // Error because href isn't defined in IProps!
<MenuItem tag={Link} to="/home">Home</MenuItem> // Error because to isn't defined in IProps!
```

We can fix our errors using generic type arguments.

```jsx
interface IProps {
  tag: React.ReactNode;
  children: React.ReactNode;
}

function MenuItem<T extends object>(props: IProps & T) {
  const { tag, children, ...rest } = props as any;
  const Tag: React.ReactType = tag || "a";

  return (
      <Tag {...rest}>
          {children}
      </Tag>
  );
}
```

Now the consumer of our **MenuItem** component can tell us what additional properties are needed!

```jsx
<MenuItem<{ href: string }> tag="a" href="http://google.com">Click Me!</MenuItem> // Success!
<MenuItem<{ to: string }> tag={Link} to="/home">Home</MenuItem> // Success!
```

Through generic type arguments for JSX, we are able to make our component more reusable. Users can extend components to allow additional props. Great!
