export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "test",
            BASE_URL: string,
            HEAD: "true" | "false",
            VALID_NICKNAME: string,
            VALID_PASSWORD: string
        }
    }
}