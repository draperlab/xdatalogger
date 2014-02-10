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
ac.registerActivityLogger("http://localhost:3000", "KitwareHospitalCosts", "0.1");
```

### Logging a USER Action

A User action requires 3 elements.
* A natural language description of the action
* A one word action description that should be repeated across tool
* A workflow state (more information below)

There are currently 3 methods available to log USER events, examples of each are shown below.

### Logging Method A
```javascript
d3.select("#order-cost")
.on("click", function () {
  home.order = "cost";
  home.update();
  ac.logUserActivity("Reorder Bar Chart by Cost", "sort_data",  ac.WF_EXPLORE);
});
})
```

### Logging Method B
```javascript
ac.tag('#sl1', {
	events: ['mouseenter', 'mouseleave', 'change'],
	wf_state: ac.WF_EXPLORE,
	activity: 'select_option',
	desc: 'User selected option from list'
})
```

### Logging Method C
```html
<li class="dropdown draper" data-wf='4' data-activity='select'>
  ...
</li>
```

## Workflow States
The following list contains the 7 workflow states we are interested in monitoring.  Within each workflow state there are a set of actions we anticipate the users doing.  Developers are welcome to create more if the action they wish to record is not in this list.

0. **WF_OTHER** - The action does not correspond to any workflow state. Please contact Draper for guidance.
1. **WF_DEFINE** - define_hypothesis
2. **WF_GETDATA** - write_query, select_option, execute_query, monitor_query
3. **WF_EXPLORE** - browse, pan, zoom, scale, rotate, filter, drill, select, crossfilter, scroll, read (including mouse popovers), listen (if audio), watch (if imagery / video), toggle_option, highlight, sort_data, select_data, down_select_data, filter_data
4. **WF_CREATE** - create_visualization, define_axes, define_chart_type, define_table, move_window, resize_window, set_color_palette, select_layers, {add,remove,split,merge}_{rows,columns}, arrange_windows
5. **WF_ENRICH** - add_note, bookmark_view, label
6. **WF_TRANSFORM** - denoise, detrend, pattern_search, do_math, transform_data, coordinate_transform


### Logging a SYS Action
The logging of system actions are aimed to log those events that are not explicitly triggered by the user, as well as measure any latency in the system.  

For example, when a user enters a query and hits submit, a USER action is fired. When the query results are returned 10s later, a SYS action should be fired to record that new data has arrived.  

An example of this is below:
```javascript
ac.logSystemActivity('asking server for data.')

$.getJSON('https://my_endpoint/get_data', data, function(data) {
	ac.logSysActivity('received data from server');
	$("#result").text(data.result);
})
```