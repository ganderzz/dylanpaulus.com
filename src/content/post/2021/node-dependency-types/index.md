---
title: "NPM: What are project dependencies?"
tags: ["Javascript", "NodeJS", "React"]
date: "2021-08-17"
published: true
---

<!-- What are dependencies -->

Code dependencies are like [Lego's](https://www.lego.com/en-us). We are able to pull in other people's code, combining and stacking different packages together to achieve our goals. Using dependencies greatly reduces the complexity of developing software. We can take advantage of the hard work someone has already done to solve a problem so that we can continue building the projects we want. A development pipeline can have multiple kinds of code dependencies:

<!-- npm's different types -->

1. dependencies
2. developer dependencies _(devDependencies)_
3. peer dependencies _(peerDependencies)_

<!-- package.json relation to dependencies -->

In JavaScript, we have a `package.json` file that holds metadata about our project. `package.json` can store things like our project name, the version of our project, and any dependencies our project has. Dependencies, devDependencies, and peerDependencies are properties that can be included in a `package.json` file.

```json
{
    "dependencies": {
        ...
    },
    "devDependencies": {
        ...
    },
    "peerDependencies": {
        ...
    }
}
```

<!-- production vs. development -->

## Production vs. Development

The type of dependency a package is changes depending on the instance where code will be used. Some packages are necessary for users to run our code. By "users", we refer to people who are not directly working in our code-base, such as those who interact with an application we wrote or a developer writing a separate library. In other words, these are packages that are required in a production environment. On the other hand, there are packages that are only needed by developers or systems while working in our code, such as linters, testing frameworks, and build tools. These are packages that users won't need, but developers or build systems will need.

<!-- dependencies -->

## Dependencies

Dependencies refer to packages that our project uses in _production_. They are essential for making our application run, as they are included with our code. Whenever we install a dependency, the package and any of its dependencies are downloaded onto our local hard drive. The more dependencies we add, the larger our production code becomes, since each new dependency is included in the production build of our code. It's important to evaluate whether new dependencies are truly needed before adding them, in order to minimize the size of our production code.

Dependencies are installed using `npm install X` or `yarn add X`

> _Examples of dependencies: React, stylized-components, jQuery_

<!-- devDependencies -->

## Dev Dependencies

Packages needed in _development_, or while developing our code, are considered dev dependencies. These are programs, libraries, and tools that assist in our development workflow. Dev dependencies also get downloaded to your local hard drive when installed, but the user will never see these dependencies. So adding a lot of dev dependencies only affects the initial `yarn` or `npm install` completion time.

Dev Dependencies are installed using `npm install --save-dev X` or `yarn add --dev X`

> _Examples of Dev Dependencies: Jest, ESLint, Webpack_

<!-- peerDependencies -->

## Peer Dependencies

Peer dependencies are similar to dependencies except for a few key features. First, when installing a peer dependency it doesn't get added to your `node_modules/` directory on your local hard drive. Why is that? Well, peer dependencies are dependencies that are needed in _production_, but we expect the user of our code to provide the package. The package doesn't get included in our code. This is to reduce including multiples of the same dependency in _production_. If every React library included a version of React as a dependency, then in _production_ our users would download React multiple times. Peer dependencies are a tool for library owners to optimize their project size.

Peer Dependencies are installed using `yarn add --peer X`

> _Examples of Peer Dependencies: React, Bootstrap_

<!-- End -->

## End

<!-- PROMO -->

I recently released a course, Creating React Libraries from Scratch, where we walk through deploying a React library from `yarn init` to `yarn publish`. Creating React Libraries from Scratch includes content just like this and more!

To learn more click the image below!

[![Click here to learn more!](/images/create-react-libraries-card.png)](https://www.newline.co/courses/creating-react-libraries-from-scratch)
