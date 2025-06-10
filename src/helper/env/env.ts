import * as dotenv from 'dotenv'

export const getEnv = () => {
    if (process.env.ENV && process.env.BROWSER) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}.${process.env.BROWSER}`
        })
    } else {
        console.error("NO ENV PASSED!")
    }
}
