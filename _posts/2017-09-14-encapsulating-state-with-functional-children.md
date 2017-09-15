---
layout: post
title: "Encapsulating State with Functional Children"
category: "ReactJs"
---

# Encapsulating State with Functional Children

### Introduction

There is a technique for creating reusable components that got missed in my last post, [Tips on Creating Reusable Components](/reactjs/2017/09/08/tips-on-creating-reusable-components.1/), that I'd like to talk about. That is, components that have functions as children. This is a great tool that mirrors higher order components, in that it lets us abstract away reusable states. We'll start out with an example.


```
import React from "react";

class Booer extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            test: "..."
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                test: "BOO!"
            });
        }, 1000);
    }
  
    render() {
        return this.props.children(this.state.test);
    }
}

function Timer(props) {
    return (
        <Booer>
        {
            (test) => (
            	<div>
                    {test}
                </div>
            )
        }
        </Booer>
    );
}

```