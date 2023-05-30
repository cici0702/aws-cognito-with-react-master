import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_7QKQrVfsP',
  ClientId: '328mudi9kb1de9bfa0e8bekq3g',
};

export default new CognitoUserPool(poolData);
