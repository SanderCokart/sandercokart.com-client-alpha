declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_URL: string;
            NEXT_PUBLIC_LOCAL_URL: string;
        }
    }
}

export {};