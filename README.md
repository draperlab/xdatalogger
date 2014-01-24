# Draper XDATA Activity Logger

The Draper XDATA activity logger, is a collection of helper libraries for XDATA performers, to aid in recording the behaviors of the analysts using the tools.

## JavaScript

### Create Activity Logger Object

There should be 1 activityLogger per application.  The activity logger object will maintain session specific information that will be logged to Draper's servers.


```javascript
// Standard
var ac = new activityLogger();

// Echo logging in console
var ac = new activityLogger().echo(true);

// Mute USER and SYS actions
var ac = new activityLogger().mute(['SYS', 'USER']);

// Testing: will not contact Draper Server
var ac = new activityLogger().testing(true);

// are chainable
var ac = new activityLogger().echo(true).testing(true);
```

### Register Logger

Registering the logger requires the logging server URL, the name of your component, and a component version to aid in differencing logs from components that are changed as they become more developed.

Registering with Draper's server is a blocking call, and ensures that a sessionID is registered with the logger.
```javascript
ac.registerActivityLogger("http:\\localhost:3000", "KitwareHospitalCosts", "0.1");
```

### Logging a USER Action

A User action requires 3 elements.
* A natural language description of the action
* A one word action description that should be repeated across tool
* A workflow state (more information below)

The following is an example of registering an action with a d3 object.
```javascript
d3.select("#order-cost")
.on("click", function () {
  home.order = "cost";
  home.update();
  ac.logUserActivity("Reorder Bar Chart by Cost", "changeXAxis",  ac.WF_EXAMINE);
});
```

## Workflow States

0. Other - The action does not correspond to any workflow state. Please contact Draper for guidance.
1. Plan - Tasking, Configuring Tools, Switching Tools, Version, To-Do-Lists
2. Search - Query, Monitor, Query Refinement, Scan, Filter, Access, Focus
3. Examine - Read, Listen, Watch, Compare, Correlate
4. Marshal - Arrange, Categorize, Extract, Merge
5. Reason - Hypothesize, Argument, Perspective, Rearrange, Link, Annotate, Asses
6. Collaborate - Asynchronous/Synchronous Review, Present
7. Report - Compose, Edit, Milestone Definition, Summarize 
