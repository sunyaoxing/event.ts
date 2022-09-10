# Event.JS

A typed event system


## Build
**clean** ```npm run clean```
**build** ```npm run build```
**re-build** ```npm run rebuild```
**run unit test** ```npm run test```


## Usage
```
import { Event, event, onEvent } from 'event.js'

// Define an event argument type
type MyEventArgType = {
	foo: string;
};

// Define an event that takes the argument type
@event<MyEventArgType>('MyEvent')
class MyEvent extends Event<MyEventArgType> {}

// Now you can add handlers to the event
class  TestHandler {
	@onEvent(MyEvent , 'my-test-handler')
	static  testHandler(args: MyEventType1) {
		console.log('my event handler')
	}
}

// To create a new event and fire
const testEvent: MyEvent = new MyEvent ({ foo:  'foo' });
await testEvent.fire();

```
