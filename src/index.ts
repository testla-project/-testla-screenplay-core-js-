import { Actor } from './screenplay/Actor';
import { Ability } from './screenplay/Ability';
import { Action } from './screenplay/Action';
import { Task } from './screenplay/Task';
import { Question } from './screenplay/Question';
import testlaScreenplayEventEmitter from './utils/event-emitter';
import { LogEvent, ExecStatus } from './interfaces';
import { printLogEventToStdout } from './utils/print';
import { LOGGING_IDENTIFIER, ACTIVITY_TYPE, EXEC_STATUS } from './constants';

export * from './utils/event';
export {
    Actor, Ability, Action, Task, Question, testlaScreenplayEventEmitter,
    ACTIVITY_TYPE, EXEC_STATUS,
};
export type { LogEvent, ExecStatus };

// register printing logs to stdout if applicable
if (
    // regular formatted console debug logs
    process.env.DEBUG?.includes(LOGGING_IDENTIFIER)
    // structured logs to be caught for parsing i.e. for playewright reporter
    || process.env.TEASLA_SCREENPLAY_STRUCTURED_LOGS === 'true'
) {
    testlaScreenplayEventEmitter.on('logEvent', (event: LogEvent) => {
        if (process.env.DEBUG?.includes(LOGGING_IDENTIFIER)) {
            printLogEventToStdout(event);
        }
        if (process.env.TEASLA_SCREENPLAY_STRUCTURED_LOGS === 'true') {
            printLogEventToStdout(event, true);
        }
    });
}
