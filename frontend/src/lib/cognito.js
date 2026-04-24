import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

export function signUpUser(email, password) {
  return new Promise((resolve, reject) => {
    const attributes = [new CognitoUserAttribute({ Name: 'email', Value: email })];
    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result?.user);
    });
  });
}

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    const userData = { Username: email, Pool: userPool };
    const authData = { Username: email, Password: password };

    const cognitoUser = new CognitoUser(userData);
    const authDetails = new AuthenticationDetails(authData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess(session) {
        resolve(session);
      },
      onFailure(err) {
        reject(err);
      },
      // MFA-ready hook: if MFA is enabled, API already supports this challenge flow.
      mfaRequired(challengeName, challengeParameters) {
        reject(new Error(`MFA challenge required: ${challengeName} (${JSON.stringify(challengeParameters)})`));
      }
    });
  });
}

export function getCurrentSession() {
  const cognitoUser = userPool.getCurrentUser();
  if (!cognitoUser) {
    return null;
  }
  return cognitoUser.getSignInUserSession();
}

export function logoutUser() {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
  localStorage.removeItem('climate.session');
}

export function persistSession(session) {
  localStorage.setItem('climate.session', JSON.stringify(session));
}

export function loadPersistedSession() {
  const raw = localStorage.getItem('climate.session');
  return raw ? JSON.parse(raw) : null;
}
