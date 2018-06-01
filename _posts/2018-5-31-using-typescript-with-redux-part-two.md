---
layout: post
title: "Part Two: Using Typescript with Redux"
category: ["React", "Redux", "Typescript"]
tag: ["Javascript", "Frontend", "React", "Redux", "Typescript"]
---

Finished Example: [Click Here](https://codesandbox.io/s/n3138x65p0?hidenavigation=1)

# Part Two: Using Typescript with ~~React~~ Redux

Last time we went through using Typescript with React, and setup a small counter application. A lot of applications out there use Redux. A common pain-point for me was how to setup Typescript with Redux--it's a common hurdle with my team also. Though Redux is a totally different library, it holds a big share of the state management market in React applications. In part two we'll take a detour from base React, and look at converting our counter to using Redux!

*Note: Same with part one, I'm going to assume Typescript, and now Redux, is setup and compiles. This is a writeup on integrating types, and less on how to setup a project.*

### Actions

