import { defineNuxtPlugin } from "#app";
import { Amplify } from "aws-amplify";
import * as Auth from "aws-amplify/auth";
// import aws_exports from "../src/aws-exports";

export default defineNuxtPlugin(( { $config } ) => {
  const Cognito = {
    userPoolId: $config.public.COGNITO_USERPOOL_ID,
    userPoolClientId: $config.public.COGNITO_USERPOOL_CLIENT_ID,
    identityPoolId: $config.public.COGNITO_IDENTITY_POOL_ID,
  };

  const GraphQL = {
    region: 'us-east-2',
    endpoint: $config.public.APPSYNC_API_URL,
    apiKey: $config.public.APPSYNC_API_KEY,
    defaultAuthMode: 'apiKey' as any
  };

  // console.log(process.env);

  Amplify.configure({
    Auth: {
      Cognito
    },
    API: {
      GraphQL
    }
  });

  return {
    provide: {
      auth: { Auth, Cognito },
    },
  };
});