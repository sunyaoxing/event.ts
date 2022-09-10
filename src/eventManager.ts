
type EventHandlerRegistry = {
    name: string;
    handler: EventHandler<any>
}

type EventHandler<EventArgType> = (args: EventArgType) => any;

interface EvtConstructor<T> {
    new (...args: any[]) : Event<T>;
    __eventName: string;
}

export class EventManager {
    private eventHanlders: {
        [key: string]: Array<EventHandlerRegistry>
    } = {};
    private maxHandlerId: number;

    constructor() {
        this.maxHandlerId = 0;
    }

    registerEvent<EventArgType>(event: EvtConstructor<EventArgType>, eventName: string) {
        console.debug('register', eventName);
        event.__eventName = eventName;
        if (this.eventHanlders[eventName]) throw new Error(`Event ${eventName} already registered`);
        this.eventHanlders[eventName] = [];
    }

    /** internal */
    addHanlder<EventArgType>(event: EvtConstructor<EventArgType>, handlerName: string, handler: EventHandler<EventArgType>) {
        const eventName: string = event.__eventName;
        const handlerRegistry: EventHandlerRegistry = {
            name: handlerName,
            handler
        }
        
        if (!this.eventHanlders[eventName]) throw new Error(`Event ${eventName} not registered`);
        this.eventHanlders[eventName].push(handlerRegistry);
    }

    /** internal */
    async fireEvent<EventArgType>(eventName: string, args: EventArgType): Promise<void> {
        const eventHandlers = this.eventHanlders[eventName] || [];
        for (const eventHandler of eventHandlers) {
            console.debug(`calling handler ${eventHandler.name}`);
            await this.onFireEvent(eventHandler.handler, args);
            console.debug(`handler ${eventHandler.name} DONE`);
        }
    }

    protected async onFireEvent<EventArgType>(handler: EventHandler<EventArgType>, args: EventArgType): Promise<void> {
        await handler(args);
    }

    clearRegistry() {
        this.eventHanlders = {};
    }
}

/** internal */
export const defaultEventManager = new EventManager();

export class Event<EventArgs> {
    private static eventManager: EventManager;
    
    /**internal */
    static __eventName: string;

    protected eventArgs: EventArgs;
    constructor(eventArgs: EventArgs) {
        this.eventArgs = eventArgs;
    }

    async fire() {
        const cls = this.constructor as any;

        const eventManager: EventManager = cls.eventManager || defaultEventManager;

        
        eventManager.fireEvent<EventArgs>(cls.__eventName, this.eventArgs);
    }
}

type EventHandlerDescriptor<EventArgType> = {
    value?: EventHandler<EventArgType>
}


export function onEvent<EventArgType>(event: EvtConstructor<EventArgType>, handlerName: string, eventManager: EventManager = defaultEventManager) {
    return function (target: any, propertyKey: string, descriptor: EventHandlerDescriptor<EventArgType>) {
        // register evt into event manager
        eventManager.addHanlder<EventArgType>(event, handlerName, descriptor.value);
    }
}

export function event<EventArgType>(eventName: string, eventManager: EventManager = defaultEventManager) {
    return function(target: EvtConstructor<EventArgType>) {
        eventManager.registerEvent(target, eventName);
    }
}
