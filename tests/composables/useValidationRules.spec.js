import { useValidationRules } from '../../app/composables/useValidationRules.js'

describe('useValidationRules', () => {
    const { requiredRule, emailRule } = useValidationRules();

    test('requiredRule passes for non-empty string', () => {
        expect(requiredRule('abc')).toBe(true);
    });

    test('requiredRule fails for empty string', () => {
        expect(requiredRule('')).toBe('This field is required');
    });

    test('emailRule passes for valid email', () => {
        expect(emailRule('test@test.com')).toBe(true);
    });

    test('emailRule fails for invalid email', () => {
        expect(emailRule('test')).toBe('Incorrect email format');
    });
});
