/* ******************************************************************************** */
/* Events                                                                           */
/* ******************************************************************************** */

/* callback is executed after ticks have occured */
function after(ticks, func) {
	events.push({ticks: ticks, callback: func});
}

/* execute any current events */
function updateEvents() {
	for(var i in events) {
		var event = events[i];
		event.ticks -= 1;
		if(event.ticks == 0) {
			event.callback();
			remove(events, event);
		}
	}
}
