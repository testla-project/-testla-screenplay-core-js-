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
            UtilizeAction.getAbilityPayload(),
        );
        expect(retrievedValue).toBe('test');
    });

    test('Trigger multiple actions at one shot', async () => {
        const TestActor = Actor.named('Test Actor')
            .can(UseAbility.using('test'));
        const retrievedValue = await TestActor.attemptsTo(
            UtilizeAction.setAbilityPayload('another test'),
            UtilizeAction.getAbilityPayload(),
        );
        expect(retrievedValue).toBe('another test');
    });

    test('Try using an action without actor having the corresponding ability assigned', async () => {
        let hasError = false;
        const TestActor = Actor.named('Test Actor');
        try {
            await TestActor.attemptsTo(
                UtilizeAction.getAbilityPayload(),
            );
        } catch (e) {
            hasError = true;
        }
        expect(hasError).toBe(true);
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

    test('Try using a question without actor having the corresponding ability assigned', async () => {
        let hasError = false;
        const TestActor = Actor.named('Test Actor');
        try {
            await TestActor.asks(SampleQuestion.toHave.payload('test'));
        } catch (e) {
            hasError = true;
        }
        expect(hasError).toBe(true);
    });
});
