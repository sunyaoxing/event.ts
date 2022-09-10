"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const chai = require("chai");
describe('Register Event', () => {
    after(() => {
        src_1.defaultEventManager.clearRegistry();
    });
    it('Register event should be successful', () => {
        let MyEvent1 = class MyEvent1 extends src_1.Event {
        };
        MyEvent1 = __decorate([
            (0, src_1.event)('MyEvent1')
        ], MyEvent1);
    });
    it('Register another event should be successful', () => {
        let MyEvent2 = class MyEvent2 extends src_1.Event {
        };
        MyEvent2 = __decorate([
            (0, src_1.event)('MyEvent2')
        ], MyEvent2);
    });
    it('Register event a second time will throw error', () => {
        chai.expect(() => {
            let MyEvent2 = class MyEvent2 extends src_1.Event {
            };
            MyEvent2 = __decorate([
                (0, src_1.event)('MyEvent2')
            ], MyEvent2);
        }).throw();
    });
    it('Register event using a customized name', () => {
        let MyEvent2 = class MyEvent2 extends src_1.Event {
        };
        MyEvent2 = __decorate([
            (0, src_1.event)('MyEvent3')
        ], MyEvent2);
    });
});
describe('Register handler', () => {
    it('Register event should be successful', () => {
        let MyEvent1 = class MyEvent1 extends src_1.Event {
        };
        MyEvent1 = __decorate([
            (0, src_1.event)('MyEvent1')
        ], MyEvent1);
    });
    it('Register another event should be successful', () => {
        let MyEvent2 = class MyEvent2 extends src_1.Event {
        };
        MyEvent2 = __decorate([
            (0, src_1.event)('MyEvent2')
        ], MyEvent2);
    });
    it('Register event a second time will throw error', () => {
        chai.expect(() => {
            let MyEvent2 = class MyEvent2 extends src_1.Event {
            };
            MyEvent2 = __decorate([
                (0, src_1.event)('MyEvent2')
            ], MyEvent2);
        }).throw();
    });
    it('Register event handler', async () => {
        let MyEvent1 = class MyEvent1 extends src_1.Event {
        };
        MyEvent1 = __decorate([
            (0, src_1.event)('MyEvent1_test_handler')
        ], MyEvent1);
        const mockHandler = chai.spy();
        class TestHandler {
            static testHandler(args) {
                mockHandler();
            }
        }
        __decorate([
            (0, src_1.onEvent)(MyEvent1, 'test-handler-1')
        ], TestHandler, "testHandler", null);
        chai.spy.on(TestHandler, 'testHandler');
        const testEvent = new MyEvent1({ foo: 'foo' });
        await testEvent.fire();
        chai.expect(mockHandler).to.have.been.called();
    });
});
//# sourceMappingURL=index.test.js.map