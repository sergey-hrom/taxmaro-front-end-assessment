// actually, no need to be a composable since there is no reactivity, but for future it would be good using i18n etc.
export const useValidationRules = () => {
    const requiredRule = (v) => !!v || 'This field is required';

    const emailRule = (v) =>
        (!!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || 'Incorrect email format';

    return {
        requiredRule,
        emailRule
    };
};
