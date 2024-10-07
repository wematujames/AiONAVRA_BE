# Payment Gateway

Payment Gateway

### Instructions

-   run the script below to generate a key pair for jwt token generation

```shell
ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key
```

-   Rename `env.example` directory to `.env`
    in the `src` folder
-   Add fill out the envriment variables according
    to what is outlined in the files for development
    and / or production respectively.
-   Run `npm i` to install project dependencies

-   Run `npm run dev` to run project in development mode
    -   In this case, `NODE_ENV` is set to `development` for
        you automatically meaning config will be read from
        the `development.js` file
-   Run `npm run start` to run project in production mode
    -   In this case, `NODE_ENV` is set to `production` for
        you automatically meaning config vars will be read
        from the `production.js` file

### END
