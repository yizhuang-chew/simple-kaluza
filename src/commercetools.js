import fetch from 'node-fetch'
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// From old version - for customer login
import SdkAuth from '@commercetools/sdk-auth';

const CTP_PROJECT_KEY="telco-demo"
const CTP_CLIENT_SECRET="JVWFOlCbvKSKOGh4Dik_XrLSSvCj5QEx"
const CTP_CLIENT_ID="diCvQIjnUayXV19ADAtr4xVr"
const CTP_AUTH_URL="https://auth.us-central1.gcp.commercetools.com"
const CTP_API_URL="https://api.us-central1.gcp.commercetools.com"
const CTP_SCOPES="manage_project:telco-demo"

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