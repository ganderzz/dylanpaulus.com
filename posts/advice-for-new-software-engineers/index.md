---
title: "Advice for New Software Engineers"
tags: ["advice", "software-engineering", "beginner"]
date: "2022-07-04"
published: true
---

A few months ago I had an opportunity to give a presentation to soon-to-be Computer Science (CS) graduates. We presented the software development process ([SDLC](https://geekflare.com/software-development-life-cycle-sdlc-guide/)), and how different teams at Schweitzer Engineering Laboratories adapt the development process to their needs. We ended the presentation with tips for what to expect entering the industry.
There is a big disconnect between what we learn while getting a CS degree and writing software that makes money. Not to say a CS degree isn't worth it; quite the opposite. I still use the algorithms, graph theory, data structures, and development processes taught in college. But, there is so much more to software engineering than code and theory. In this article we'll walk through the tips I would give myself leaving college, and the tips I gave to those soon-to-be CS graduates.

## Don't worry about knowing everything

I've been programming a long time--I'm [1996 Space Jam](https://www.spacejam.com/1996/) websites old. I've contributed to many coding communities, built and maintained high-traffic applications with near-zero downtime, gave conference talks, released a course, and written a lot of these silly articles. If you were to pull me out of a crowd and ask me to invert a binary tree I would probably struggle. I've been rejected from many job interviews and called "not senior enough". The point is we all face rejection no matter how much we know, or how much experience we have. We can always be better. Don't fret about not knowing everything, and don't be afraid to say, "I don't know", but always follow up with, "But I'll find out". Throughout my four years getting a Computer Science degree I thought if I knew all the algorithms, and produced the fastest code I would be the best programmer. These things help, but after my first experience as a professional software engineer, I quickly learned there is so much more to software than Big O notation. It's not about knowing everything; it's being curious and able to figure it out.

## Ask questions, have opinions

This piece of advice piggybacks "Don't worry about knowing everything", and adds some spice. Don't be afraid to ask questions. Ask the senior developer why they came to a certain solution, or how `Map()` is different than `{}` in JavaScript. This is a two-way street. When you become a senior software engineer ask the junior engineers questions. Remember, we can't know everything, but speak up when we do know something! Have opinions. Yeah, not every opinion will be correct, but this is how we learn. As a manager, I like when interns have opinions on architecture. This shows they care, they're engaged, and they're learning. Just don't be a jerk about it. Ask questions on the things you don't know, and have opinions on the things you do know!

## Have a business-oriented mindset

We leave college with the wrong mindset of what companies look for. I thought software companies wanted the best software engineers because it makes them the best. Don't get me wrong, there is value in being good at writing software. Let's say we write a highly decoupled, blazing-fast, platform-agnostic, cleanest code application. If no one uses the application then all we did was create a waste of time and money pit. Great software engineers consider both technical **and** business needs. We need to think about how our decisions produce value. Switching frameworks may sound cool, but who gets the value out of that? If the old framework isn't maintained anymore, and we need to change to get security patch support then maybe it's worth switching frameworks. If we want to change frameworks, because we saw a post on [Hacker News](https://news.ycombinator.com/) about it then maybe reconsider.

When I get asked how to get promoted and move up the software engineering ladder this is the biggest advice I can give. Consider how your skills produce value for your company. Same for writing a resume or interviewing. It's cool you know [Haskell](https://www.haskell.org/), but how does that transfer to producing value at the company you're being hired for? Maybe since you had to learn Haskell for a class you are a quick learner, and can onboard quickly?

Technology is a [a means to an end](https://www.dictionary.com/e/slang/means-to-an-end/). Our applications solve problems users have is the goal.

## Everyone breaks production

You're going to break production. Everyone does it. Even that lead engineer you look up to who never does wrong has broke production at some point. Don't stress about _if_ you're going to break production. _Breathe in._ _Breathe out._ _Let it go._
A colleague, who did the talk with CS graduates with me, has a saying, "Optimize for mean to recovery." Find ways to reduce the blast radius once production is broken instead of worrying about breaking production in the first place. This could be:

- Having _battle buddies_ you can rely on when _sh\*t hits the fan_. Find a support system who can jump in and help when production breaks
- Learn everything about the environment. Ask questions not just about the systems you work on, but neighboring systems. How does each piece connect?
- Improve your skills and learn different parts of the software stack. Learn how Databases work, maybe learn networking and DNS, and if you're working in containers maybe introduce yourself to Kubernetes

When interviewing for a company look for blameless cultures. This means when something eventually breaks in production the team doesn't start pointing fingers. Ask the interviewers how they deal with outages, and watch out for warning signs. Many buzzwords without any concrete plan/action can be a cause for concern.

Lastly, writing software is a team effort. When software breaks there are multiple chains in the process of breaking down. Maybe code reviews weren't as thorough as they could have been? Or maybe we're missing testing or test cases that would have caught the error? Did the [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) step run? Maybe the architecture is inherently complex? As engineers we like to point to a root cause ([Fallacy of the single cause](https://en.wikipedia.org/wiki/Fallacy_of_the_single_cause)), but the [Titanic](https://en.wikipedia.org/wiki/Titanic) didn't sink for one reason. The builders of the ship cut costs, the ship was moving too fast, and the ship's radio operator dismissed the warning (Pruitt, 2018). Find a team with a blameless culture and don't point fingers when systems fail. Iterate on failures to learn and get better. Software is a team pursuit.

### References

Pruitt, S., 2018. \_Why Did the Titanic Sink?\_. [online] History. Available at: <https://www.history.com/news/why-did-the-titanic-sink> [Accessed 4 July 2022].
