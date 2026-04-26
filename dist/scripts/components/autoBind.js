export function autoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            if (!originalMethod || typeof originalMethod !== 'function') {
                return undefined;
            }
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
//# sourceMappingURL=autoBind.js.map