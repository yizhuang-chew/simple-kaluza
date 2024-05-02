import fetch from 'node-fetch'
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// From old version - for customer login
import SdkAuth from '@commercetools/sdk-auth';

const CTP_PROJECT_KEY="kaluza-demo"
const CTP_CLIENT_SECRET="Nq74cYdkSLicrm1G-GsZ05jk8y5GSGvg"
const CTP_CLIENT_ID="xeIgK2BB_ed6WMaQUHG7IB2S"
const CTP_AUTH_URL="https://auth.eu-central-1.aws.commercetools.com"
const CTP_API_URL="https://api.eu-central-1.aws.commercetools.com"
const CTP_SCOPES="manage_project:kaluza-demo"

const projectKey = CTP_PROJECT_KEY;

// For handling customer login
export const authClient = new SdkAuth({
  host: CTP_AUTH_URL,
  projectKey: projectKey,
  disableRefreshToken: false,
  credentials: {
    clientId: CTP_CLIENT_ID,
    clientSecret: CTP_CLIENT_SECRET,
  },
  scopes: CTP_SCOPES.split(' '),
})

// create the authMiddlewareOptions object
const authMiddlewareOptions = {
  host: CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: CTP_CLIENT_ID,
    clientSecret: CTP_CLIENT_SECRET,
  },
  scopes: CTP_SCOPES.split(' '),
  fetch,
};

// create the httpMiddlewareOptions object also
const httpMiddlewareOptions = {
  host: CTP_API_URL,
  fetch,
};

let ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export let apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });

// Create a new client with the new token, and a new api Root
export function setAccessToken(token) {
  ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withExistingTokenFlow(`Bearer ${token}`, { force: true})
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: projectKey });
}