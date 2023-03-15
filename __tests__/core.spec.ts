import { Actor } from '../src';
import { UseAbility } from './implementations/UseAbility';
import { UtilizeAction } from './implementations/UtilizeAction';
import { WrapperTask } from './implementations/WrapperTask';
import { SampleQuestion } from './implementations/SampleQuestion';

describe('Testing the core', () => {
    test('Defining an actor who states its name and attributes', async () => {
        const TestActor = Actor.named('Test Actor')
            .with('an attribute', 1);
        expect(TestActor.states('name')).toBe('Test Actor');
        expect(TestActor.states('an attribute')).toBe(1);
    });

    test('Register an ability with an actor and use it via action', async () => {
        const TestActor = Actor.named('Test Actor')
            .can(UseAbility.using('test'));
        const retrievedValue = await TestActor.attemptsTo(
            UtilizeAction.ability(),
        );
        expect(retrievedValue).toBe('test');
    });

    test('Register an ability with an actor and use it via task that wrappes action', async () => {
        const TestActor = Actor.named('Test Actor')
            .can(UseAbility.using('test'));
        const retrievedValue = await TestActor.attemptsTo(
            WrapperTask.execute(),
        );
        expect(retrievedValue).toBe('test');
    });

    test('Register an ability with an actor and ask a question', async () => {
        const TestActor = Actor.named('Test Actor')
            .can(UseAbility.using('test'));
        await TestActor.asks(SampleQuestion.toHave.payload('test'));
        await TestActor.asks(SampleQuestion.notToHave.payload('test1'));
    });
});
