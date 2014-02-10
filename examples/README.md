#Examples

Load `jstest.html` in any modern browser and open the console to view events being fired.

### Instantiation and Registration
```javascript
var ac = new activityLogger();
var ac = new activityLogger().echo(true).testing(true);
```

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