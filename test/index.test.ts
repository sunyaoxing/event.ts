import { Event, event, onEvent, defaultEventManager } from '../src'
import * as chai from 'chai'

describe('Register Event', () => {
    after(() => {
        defaultEventManager.clearRegistry();
    });

    it('Register event should be successful', () => {
        type MyEventType1 = {
            foo: string;
        };
        
        @event<MyEventType1>('MyEvent1')
        class MyEvent1 extends Event<MyEventType1> {

        }
    });

    it('Register another event should be successful', () => {
        type MyEventType2 = {
            foo: string;
        };
        
        @event<MyEventType2>('MyEvent2')
        class MyEvent2 extends Event<MyEventType2> {

        }
    });

    it('Register event a second time will throw error', () => {
        chai.expect(() => {
            type MyEventType2 = {
                foo: string;
            };
            
            @event<MyEventType2>('MyEvent2')
            class MyEvent2 extends Event<MyEventType2> {
    
            }
        }).throw();
    });

    it('Register event using a customized name', () => {
        type MyEventType2 = {
            foo: string;
        };
        
        @event<MyEventType2>('MyEvent3')
        class MyEvent2 extends Event<MyEventType2> {

        }
    });
});

describe('Register handler', () => {
    it('Register event should be successful', () => {
        type MyEventType1 = {
            foo: string;
        };
        
        @event<MyEventType1>('MyEvent1')
        class MyEvent1 extends Event<MyEventType1> {

        }
    });

    it('Register another event should be successful', () => {
        type MyEventType2 = {
            foo: string;
        };
        
        @event<MyEventType2>('MyEvent2')
        class MyEvent2 extends Event<MyEventType2> {

        }
    });

    it('Register event a second time will throw error', () => {
        chai.expect(() => {
            type MyEventType2 = {
                foo: string;
            };
            
            @event<MyEventType2>('MyEvent2')
            class MyEvent2 extends Event<MyEventType2> {
    
            }
        }).throw();
    });

    it('Register event handler', async () => {
        type MyEventType1 = {
            foo: string;
        };
        
        @event<MyEventType1>('MyEvent1_test_handler')
        class MyEvent1 extends Event<MyEventType1> {

        }

        const mockHandler = chai.spy();

        class TestHandler {
            @onEvent(MyEvent1, 'test-handler-1')
            static testHandler(args: MyEventType1) {
                mockHandler();
            }
        }

        chai.spy.on(TestHandler, 'testHandler');

        const testEvent: MyEvent1 = new MyEvent1({ foo: 'foo' });
        await testEvent.fire();
        chai.expect(mockHandler).to.have.been.called();

    });
});