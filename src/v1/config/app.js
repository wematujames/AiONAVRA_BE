require("dotenv").config();

module.exports = {
    frontEnd: {
        adminPasswordResetUrl: process.env.ADMIN_APP_PASSWORD_RESET_URL,
        adminVerifyEmailUrl: process.env.ADMIN_EMAIL_VERIFICATION_URL,
        adminUserLoginUrl: process.env.ADMIN_USER_LOGIN_URL,
        adminAppUrl: process.env.ADMIN_FRONTEND_URL,
        merchantPasswordResetUrl: process.env.MERCHANT_APP_PASSWORD_RESET_URL,
        merchantVerifyEmailUrl: process.env.MERCHANT_EMAIL_VERIFICATION_URL,
        merchantUserLoginUrl: process.env.MERCHANT_USER_LOGIN_URL,
        merchantAppUrl: process.env.MERCHANT_FRONTEND_URL,
    },
    auth: {
        jwtExpire: process.env.JWT_EXPIRE || "30d",
        webTxnJwtExpire: process.env.WEB_TXN_JWT_EXPIRE || "12h",
    },
    payment: {
        vodafone: {
            config: {
                openAPIServiceProviderCode: process.env.VF_OPENAPI_SERVICE_PROVIDER_CODE,
                openAPICountry: process.env.VF_OPENAPI_COUNTRY,
                openAPICurrency: process.env.VF_OPENAPI_CURRENCY,
            },
            keys: {
                apiKey: process.env.VF_OPENAPI_API_KEY,
                publicKey: process.env.VF_OPENAPI_PUBLIC_KEY,
            },
            openapi: {
                generateSessionURL: process.env.VF_OPENAPI_GENERATE_SESSION_URL,

                c2bTransactionURL: process.env.VF_OPENAPI_C2B_TRANSACTION_URL,
                b2cTransactionURL: process.env.VF_OPENAPI_B2C_TRANSACTION_URL,
                b2bTransactionURL: process.env.VF_OPENAPI_B2B_TRANSACTION_URL,
                transactionStatusURL: process.env.VF_OPENAPI_TRANSACTION_STATUSL_URL,
                transactionReversalURL: process.env.VF_OPENAPI_TRANSACTION_REVERSAL_URL,

                createDirectDebitURL: process.env.VF_OPENAPI_CREATE_DIRECT_DEBIT_URL,
                directDebitStatusURL: process.env.VF_OPENAPI_DIRECT_DEBIT_STATUS_URL,
                directDebitPaymentURL: process.env.VF_OPENAPI_DIRECT_DEBIT_TRANSACTION_URL,
                cancelDirectDebitURL: process.env.VF_OPENAPI_CANCEL_DIRECT_DEBIT_URL,

                queryOrgBalanceURL: process.env.VF_OPENAPI_QUERY_ORG_BALANCE_URL,

                queryBeneficiaryNameURL: process.env.VF_OPENAPI_QUERY_BENEFICIARY_NAME_URL,
                queryCustomerKycURL: process.env.VF_OPENAPI_QUERY_CUSTOMER_KYC_URL,
            },
        },
        mtn: {
            config: {
                currency: process.env.MTN_OPENAPI_CURRENCY,
                enviroment: process.env.MTN_OPENAPI_TARGET_ENVIRONMENT,
            },
            keys: {
                collection: {
                    userId: process.env.MTN_OPENAPI_COLLECION_API_USER_ID,
                    apiKey: process.env.MTN_OPENAPI_COLLECION_API_KEY,
                    primary: process.env.MTN_OPENAPI_COLLECION_PRIMARY_KEY,
                    secondary: process.env.MTN_OPENAPI_COLLECION_SECONDAR_KEY,
                },
                preApproval: {
                    userId: process.env.MTN_OPENAPI_PREAPPROVAL_API_USER_ID,
                    apiKey: process.env.MTN_OPENAPI_PREAPPROVAL_API_KEY,
                    primary: process.env.MTN_OPENAPI_PREAPPROVAL_PRIMARY_KEY,
                    secondary: process.env.MTN_OPENAPI_PREAPPROVAL_SECONDAR_KEY,
                },
                disbursement: {
                    userId: process.env.MTN_OPENAPI_DISBURSEMENT_API_USER_ID,
                    apiKey: process.env.MTN_OPENAPI_DISBURSEMENT_API_KEY,
                    primary: process.env.MTN_OPENAPI_DISBURSEMENT_PRIMARY_KEY,
                    secondary: process.env.MTN_OPENAPI_DISBURSEMENT_SECONDAR_KEY,
                },
            },
            openapi: {
                genCollectionTokenURL: process.env.MTN_OPENAPI_GENERATE_COLLECTION_TOKEN_URL,
                genDisbursementTokenURL: process.env.MTN_OPENAPI_GENERATE_DISBURSEMENT_TOKEN_URL,

                c2bTransactionURL: process.env.MTN_OPENAPI_C2B_TRANSACTION_URL,
                b2cTransactionURL: process.env.MTN_OPENAPI_B2C_TRANSACTION_URL,
                c2bTransactionStatusURL: process.env.MTN_OPENAPI_C2B_TRANSACTION_STATUSL_URL,
                b2cTransactionStatusURL: process.env.MTN_OPENAPI_B2C_TRANSACTION_STATUSL_URL,
                transactionReversalURL: process.env.MTN_OPENAPI_TRANSACTION_REVERSAL_URL,

                createDirectDebitURL: process.env.MTN_OPENAPI_DIRECT_DEBIT_CREATE_URL,
                directDebitStatusURL: process.env.MTN_OPENAPI_DIRECT_DEBIT_STATUS_URL,
                directDebitPaymentURL: process.env.MTN_OPENAPI_DIRECT_DEBIT_PAYMENT_URL,
                // cancelDirectDebitURL: process.env.MTN_OPENAPI_CANCEL_DIRECT_DEBIT_URL,

                queryOrgCollectionBalURL: process.env.MTN_OPENAPI_QUERY_ORG_C2B_BAL_URL,
                queryOrgDisbursementBalURL: process.env.MTN_OPENAPI_QUERY_ORG_B2C_BAL_URL,

                queryBeneficiaryNameURL: process.env.MTN_OPENAPI_QUERY_BENEFICIARY_NAME_URL,
                queryCustomerKycURL: process.env.MTN_OPENAPI_QUERY_CUSTOMER_KYC_URL,
            },
        },
    },
    sms: {
        keys: {},
        urls: {},
    },
    mail: {
        from: process.env.MAIL_FROM_ADDRESS,
        smtp: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            username: process.env.MAIL_USER,
            password: process.env.MAIL_PASSWORD,
        },
    },

};
