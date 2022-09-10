// import { Event, event, onEvent } from '../src'

// type MyEventType1 = {
//     foo: string;
// };

// type MyEventType2 = {
//     bar: string;
// };

// console.log("@@@")
// @event<MyEventType1>('MyEvent1')
// class MyEvent1 extends Event<MyEventType1> {

// }

// @event<MyEventType2>('MyEvent1')
// class MyEvent2 extends Event<MyEventType2> {

// }

// class MyEventHandler {
//     @onEvent<MyEventType1>(MyEvent1, 'handleEvent1')
//     handleEvent1(args: MyEventType1) {
//         console.log(args)
//     }

//     @onEvent<MyEventType2>(MyEvent2, 'handleEvent2')
//     handleEvent2(args: MyEventType2) {
//         console.log(args)
//     }

//     @onEvent<MyEventType2>(MyEvent2, 'handleEvent3')
//     handleEvent3(args: MyEventType2) {
//         console.log(args)
//     }
// }


// const event1_1 = new MyEvent1({ foo: 'foo1' });
// const event1_2 = new MyEvent1({ foo: 'foo2' });

// event1_1.fire();
// event1_2.fire();

// const event2_1 = new MyEvent2({ bar: 'foo1' });
// const event2_2 = new MyEvent2({ bar: 'foo2' });

// event2_1.fire();
// event2_2.fire();

require('source-map-support').install();
import { dir } from 'console';
import * as fs from 'fs'
import * as path from 'path'

import * as chai from 'chai'
import * as spies from 'chai-spies'

chai.use(spies);

async function runTest(testPath: string) {
    const dirs = fs.readdirSync(testPath);
    for (const dir of dirs) {
        const p = path.resolve(testPath, dir);
        const stat = fs.statSync(p);
        if (stat.isDirectory()) {
            await runTest(p);
        } else {
            if (p === __filename) continue;
            if (dir.endsWith('test.js'))
                await import(p);
        }
    }
}

runTest(__dirname);