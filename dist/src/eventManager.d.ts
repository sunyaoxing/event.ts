declare type EventHandler<EventArgType> = (args: EventArgType) => any;
interface EvtConstructor<T> {
    new (...args: any[]): Event<T>;
    __eventName: string;
}
export declare class EventManager {
    private eventHanlders;
    private maxHandlerId;
    constructor();
    registerEvent<EventArgType>(event: EvtConstructor<EventArgType>, eventName: string): void;
    /** internal */
    addHanlder<EventArgType>(event: EvtConstructor<EventArgType>, handlerName: string, handler: EventHandler<EventArgType>): void;
    /** internal */
    fireEvent<EventArgType>(eventName: string, args: EventArgType): Promise<void>;
    protected onFireEvent<EventArgType>(handler: EventHandler<EventArgType>, args: EventArgType): Promise<void>;
    clearRegistry(): void;
}
/** internal */
export declare const defaultEventManager: EventManager;
export declare class Event<EventArgs> {
    private static eventManager;
    /**internal */
    static __eventName: string;
    protected eventArgs: EventArgs;
    constructor(eventArgs: EventArgs);
    fire(): Promise<void>;
}
declare type EventHandlerDescriptor<EventArgType> = {
    value?: EventHandler<EventArgType>;
};
export declare function onEvent<EventArgType>(event: EvtConstructor<EventArgType>, handlerName: string, eventManager?: EventManager): (target: any, propertyKey: string, descriptor: EventHandlerDescriptor<EventArgType>) => void;
export declare function event<EventArgType>(eventName: string, eventManager?: EventManager): (target: EvtConstructor<EventArgType>) => void;
export {};
