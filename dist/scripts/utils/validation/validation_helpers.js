export const assignValidationInputs = (titleValue, descValue) => {
    const titleInputRule = {
        type: 'title',
        required: true,
        minLength: 3,
        maxLength: 50,
        value: titleValue
    };
    const descInputRule = {
        type: 'desc',
        required: true,
        minLength: 10,
        maxLength: 200,
        value: descValue
    };
    return [titleInputRule, descInputRule];
};
export const handleValidationErrors = (InputRule) => {
    let errorMessage = '';
    if (InputRule.required && InputRule.value.trim().length === 0) {
        errorMessage += `This field ${InputRule.type} is required.\n`;
    }
    if (InputRule.minLength && InputRule.minLength > InputRule.value.trim().length) {
        errorMessage += `This field ${InputRule.type} must be at least ${InputRule.minLength} characters`;
    }
    if (InputRule.maxLength && InputRule.maxLength < InputRule.value.trim().length) {
        errorMessage += `This field ${InputRule.type} must be at most ${InputRule.maxLength} characters`;
    }
    return errorMessage;
};
//# sourceMappingURL=validation_helpers.js.map