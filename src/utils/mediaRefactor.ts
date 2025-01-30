

export function mediaRefactor(input: any) {
    input = input.trim();
    input = input.replace(/\s+/g, "-");
    return input;
}