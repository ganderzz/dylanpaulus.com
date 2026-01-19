---
title: "Reusable Components: Factory Components"
tags: ["React", "Javascript"]
date: "2018-04-10"
published: true
---

Beware the **mega** component. Mega components contain around 50 props--when the stars align, only certain values produce specialized output. For example, let's assume we have a `<IdentityInput />` component which provides user login using only a fingerprint. Nifty, eh?
Our component has a few properties: `<IdentityInput onSuccess={login} onFail={showError} fingerprint={value} humanOnly />` allowing for only human fingerprints, and provides a few callbacks for onSuccess and onFail.

A few months go by and our company, Component Co., finds out there are a lot of humans out there trying to login, but are missing fingerprints! Great, we'll update our component to allow for eyeball scans.

```jsx
<IdentityInput onSuccess={login} onFail={showError} value={value} isEyeballEnabled isFingerprintEnabled humanOnly />
```

After many failed attempts to login to our system the boss of Component Co., a cyborg without eyeballs or fingerprints, demands that we provide a password input field. Once again, the IndentityInput component gets updated to have the request.

```jsx
<IdentityInput
  onSuccess={login}
  onFail={showError}
  value={value}
  isEyeballEnabled
  isFingerprintEnabled
  showPasswordField={this.state.isCyborg}
  humanOnly={!this.state.isCyborg}
/>
```

Just from this contrived example, we can see that allowing for ever-growing mega components can start to be a problem. For one, we lose single-responsibility. Over time our component does multiple things which causes a barrier of entry penalty when new developers start using the component. Second, it provides weird combinations of secret password props in components. "If I have these props, it does this one thing. But, don't set that string prop there or everything breaks!" Third, we'll have to write our class/function in a way to handle all the edge cases and props--probably requiring way too many if-statements.

One solution to this problem is to have a factory component, very much like the factory design pattern. We'll keep individual components small, performing a single function, but then create a parent component that then decides what component we should render.

For example:

```jsx
function FingerPrint(props) {
  return <div {...props}>Super Awesome Fingerprint Scanner</div>;
}

function EyeballScanner(props) {
  return <div {...props}>Super Ok Eyeball Scanner</div>;
}

function PasswordInput(props) {
  return <div {...props}>Super Lame Password Input</div>;
}

/**
 * Factory Component
 */
function IdentityFactory(props) {
  const { type, ...rest } = props;

  switch (type) {
    case "finger":
      return <FingerPrint {...rest} />;

    case "eyeball":
      return <EyeballScanner {...rest} />;

    case "password":
      return <PasswordInput {...rest} />;

    default:
      console.warn(`Invalid Indentity type "${type}". Abort!`);
      return null;
  }
}
```

Now, when we want to use the IdentityFactory component we can switch between the different input types, but also provide props relevant to just that component. It'll allow us to modify single-responsibility components with ease.

```jsx
render() {
  return (
    <div>
      <IdentityFactory type="finger" humanOnly />
      <IdentityFactory type="eyeball" humanOnly />
      <IdentityFactory type="password" />
    </div>
  );
}
```
