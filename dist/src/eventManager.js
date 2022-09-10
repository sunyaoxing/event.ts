"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = exports.onEvent = exports.Event = exports.defaultEventManager = exports.EventManager = void 0;
class EventManager {
    constructor() {
        this.eventHanlders = {};
        this.maxHandlerId = 0;
    }
    registerEvent(event, eventName) {
        console.debug('register', eventName);
        event.__eventName = eventName;
        if (this.eventHanlders[eventName])
            throw new Error(`Event ${eventName} already registered`);
        this.eventHanlders[eventName] = [];
    }
    /** internal */
    addHanlder(event, handlerName, handler) {
        const eventName = event.__eventName;
        const handlerRegistry = {
            name: handlerName,
            handler
        };
        if (!this.eventHanlders[eventName])
            throw new Error(`Event ${eventName} not registered`);
        this.eventHanlders[eventName].push(handlerRegistry);
    }
    /** internal */
    async fireEvent(eventName, args) {
        const eventHandlers = this.eventHanlders[eventName] || [];
        for (const eventHandler of eventHandlers) {
            console.debug(`calling handler ${eventHandler.name}`);
            await this.onFireEvent(eventHandler.handler, args);
            console.debug(`handler ${eventHandler.name} DONE`);
        }
    }
    async onFireEvent(handler, args) {
        await handler(args);
    }
    clearRegistry() {
        this.eventHanlders = {};
    }
}
exports.EventManager = EventManager;
/** internal */
exports.defaultEventManager = new EventManager();
class Event {
    constructor(eventArgs) {
        this.eventArgs = eventArgs;
    }
    async fire() {
        const cls = this.constructor;
        const eventManager = cls.eventManager || exports.defaultEventManager;
        eventManager.fireEvent(cls.__eventName, this.eventArgs);
    }
}
exports.Event = Event;
function onEvent(event, handlerName, eventManager = exports.defaultEventManager) {
    return function (target, propertyKey, descriptor) {
        // register evt into event manager
        eventManager.addHanlder(event, handlerName, descriptor.value);
    };
}
exports.onEvent = onEvent;
function event(eventName, eventManager = exports.defaultEventManager) {
    return function (target) {
        eventManager.registerEvent(target, eventName);
    };
}
exports.event = event;
//# sourceMappingURL=eventManager.js.map