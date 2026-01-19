---
title: "Global Component Registration"
tags: ["React", "Javascript"]
date: "2017-12-08"
published: true
---

### Introduction

Often, I find myself looking through open-source projects to see how they solve issues. Not bugs, but problems in code that cause repetition or excessive boilerplate. [Modals](https://ux.stackexchange.com/questions/12045/what-is-a-modal-dialog-window#12046) have given me problems, specifically when having to create a specialized modal for different workflows. They are awkward. Modals, in the DOM, live outside of the scope of the current workflow. And, part of their state usually lives outside of the modal itself (hide/show). I came accross an interesting solution to the modal problem while looking through [Insomnia's](https://github.com/getinsomnia/insomnia) code. This is a different post than what I normally do. I'll just be posting code as an example, and filling in the explaination through comments. Hopefully this will work as a reference, and starting point to play around with the idea.

### Code

```jsx
// ModalHandler.js
const modals = {};

/*
 * This function takes in a component, and then adds a
 * reference to it through a friendly named key->value.
 */
export function registerModal(component) {
  if (!component) {
    return;
  }

  modals[component.name] = component;
}

/*
 * show() takes the component we want to show, and some additional
 * arguments. We'll then call the 'show' function on the component.
 * This allows us to 'activate' a component anywhere, but invert
 * control to the relative component.
 */
export function show(component, ...args) {
  const elem = modals[component.name];
  if (elem.show && typeof elem.show === "function") {
    return elem.show(...args);
  }

  console.warn(`show() function is missing from ${component.name}.`);
}
```

```jsx
// App.jsx
import React, { Component } from "react";
import { registerModal } from "./ModalHandler";

class Base extends Component {
  render() {
    return (
      <div>
        <MyApp />
        {/*
          This component is pretty regular except for this next bit.
          We'll pass in registerModal() to the component's ref we'll
          show later on
        */}
        <Modal ref={registerModal} />
      </div>
    );
  }
}
```

```jsx
import React, { Component } from "react";
import { show } from "./ModalHandler";
import Modal from "./Modal";

class MyApp extends Component {
  showModal = () => {
    // Will call the .show() function
    // on the Modal component
    show(Modal);
  };

  render() {
    return <button onClick={this.showModal}>Show Modal</button>;
  }
}
```

```jsx
// Modal.jsx
import React, { Component } from "react";

class Modal extends Component {
  state = {
    isOpen: false,
  };

  // This is the show() function that'll be invoked
  // when this component is passed to ModalHandler.js' show() function
  show = () => {
    this.setState({ isOpen: true });
  };

  render() {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div>
        Modal!
        <button onClick={() => this.setState({ isOpen: false })}>Close</button>
      </div>
    );
  }
}
```
