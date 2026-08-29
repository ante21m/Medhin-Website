declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        sub: number;
        username: string;
        role: string;
    }): {
        id: number;
        username: string;
        role: string;
    };
}
export {};
