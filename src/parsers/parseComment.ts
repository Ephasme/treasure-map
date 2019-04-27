const regexp = /^#(.*)$/;

export interface IComment {
    readonly comment: string;
}

export const parseComment: (input: string) => IComment | null = (input) => {
    const regResult = regexp.exec(input);
    if (regResult) {
        return { comment: regResult[1].trim() };
    }
    return null;
};
