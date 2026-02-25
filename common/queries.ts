import * as Constants from '@common/constants';
import * as Utilities from '@common/utilities';

export async function getData({ route, key, body }, qualifier = 'data') {
  let result;
  try {
    const response = await fetch(route, {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    result = await response.json();
  } catch (e) {
    return null;
  }

  if (!result) {
    return null;
  }

  if (result.error) {
    return result;
  }

  if (!result[qualifier]) {
    return null;
  }

  return result;
}

export async function onUserListData({ key }) {
  const route = `${Constants.API}/data`;
  const body = {};
  return await getData({ route, key, body });
}

export async function onGetStripePaymentURL({ key }) {
  const route = `${Constants.API}/users/viewer/generate-add-payment-method-url`;
  const body = {};
  return await getData({ route, key, body });
}

export async function onGetStripePaymentMethod({ key }) {
  const route = `${Constants.API}/users/viewer/get-current-payment-method`;
  const body = {};
  return await getData({ route, key, body });
}

export async function onSendAmountCents({ key, amount }) {
  const route = `${Constants.API}/users/viewer/pay-provider-amount-cents`;
  const body = { amount };
  return await getData({ route, key, body });
}

export async function onUserDeleteData({ id, key }) {
  const route = `${Constants.API}/data/delete`;
  const body = { id };
  return await getData({ route, key, body });
}

export async function onRefreshDocuments({ key, type, domain }) {
  const route = `${Constants.API}/documents`;
  const body = { type, domain };
  return await getData({ route, key, body });
}

export async function onGetDocumentById({ id }) {
  const route = `${Constants.API}/documents/${id}`;
  const body = {};
  return await getData({ route, key: null, body });
}

export async function onUserCreateDocument({ key, type, domain }) {
  const route = `${Constants.API}/documents/create`;
  const body = { type, domain };
  return await getData({ route, key, body });
}

export async function onDeleteDocumentById({ id, key }) {
  const route = `${Constants.API}/documents/delete`;
  const body = { id };
  return await getData({ route, key, body });
}

export async function onUpdateDocumentById({ id, key, data }) {
  const route = `${Constants.API}/documents/update`;
  const body = { id, data };
  return await getData({ route, key, body });
}

export async function onPublicUserAuthenticate({ email, password }) {
  const route = `${Constants.API}/users/authenticate`;
  const body = { email, password };
  return getData({ route, key: null, body }, 'user');
}

export async function onPublicUserForgotPassword({ email }) {
  const route = `${Constants.API}/users/reset-password`;
  const body = { email, source: Constants.PASSWORD_RESET_SOURCE };
  return getData({ route, key: null, body }, 'success');
}

export async function onUserChangePassword({ key, password }) {
  const route = `${Constants.API}/users/update-viewer-password`;
  const body = { password };
  return getData({ route, key, body });
}

export async function onUserRegenerateAPIKey({ email, password }) {
  const route = `${Constants.API}/users/regenerate-key`;
  const body = { email, password };
  return getData({ route, key: null, body }, 'user');
}

export async function onUserUnsubscribeServices({ key }) {
  const route = `${Constants.API}/users/subscriptions/unsubscribe`;
  const body = null;
  return getData({ route, key, body }, 'user');
}

export async function onRefreshPosts({ key, type, user_id }) {
  const route = `${Constants.API}/posts`;
  const body = { type, user_id };
  return await getData({ route, key, body });
}

export async function onUserCreatePost({ id, key, src, type }) {
  const route = `${Constants.API}/posts/create`;
  const body = { type, fields: { fileId: id, public: true }, src };
  return getData({ route, key, body });
}

export async function onUserCreateThread({ fields, key, src, type }) {
  const route = `${Constants.API}/posts/create`;
  const body = { fields, src, type };
  return getData({ route, key, body });
}

export async function onUserDeletePost({ id, key }) {
  const route = `${Constants.API}/posts/delete`;
  const body = { id };
  return getData({ route, key, body });
}

export async function onUserListThreadReplies({ id, key, orderBy }) {
  const route = `${Constants.API}/posts/all-thread-replies`;
  const body = { id, orderBy };
  return getData({ route, key, body });
}

export async function onUserListThreads({ key, orderBy }) {
  const route = `${Constants.API}/posts/all-threads`;
  const body = { orderBy };
  return getData({ route, key, body });
}

// ---
// Email verification
// ---

export async function onUserVerifyEmail({ code, source }) {
  const route = `${Constants.API}/users/verify`;
  const body = { code, source };
  return getData({ route, key: null, body }, 'success');
}

export async function onUserVerifyResend({ key, source }) {
  const route = `${Constants.API}/users/verify-resend`;
  const body = { source };
  return getData({ route, key, body }, 'emailed');
}

// ---
// Username
// ---

export async function onSetUsername({ key, username }) {
  const route = `${Constants.API}/users/update-viewer-username`;
  const body = { username };
  return getData({ route, key, body });
}

// ---
// Credits
// ---

export async function onGetCreditsBalance({ key }) {
  const route = `${Constants.API}/credits/balance`;
  const body = {};
  return getData({ route, key, body }, 'balance');
}

export async function onGetCreditsPricing() {
  const route = `${Constants.API}/credits/pricing`;
  const body = {};
  return getData({ route, key: null, body }, 'routes');
}

export async function onSendCredits({ key, email, username, amount }) {
  const route = `${Constants.API}/credits/send`;
  const body = { email, username, amount };
  return getData({ route, key, body });
}

export async function onGetCreditsTransactions({ key }) {
  const route = `${Constants.API}/credits`;
  const body = {};
  return getData({ route, key, body });
}

// ---
// Organizations
// ---

export async function onGetAllOrganizations({ key }) {
  const route = `${Constants.API}/organizations`;
  const body = {};
  return getData({ route, key, body });
}

export async function onGetViewerOrganizations({ key }) {
  const route = `${Constants.API}/users/viewer/organizations`;
  const body = {};
  return getData({ route, key, body });
}

export async function onOrganizationCreate({ key, domain }) {
  const route = `${Constants.API}/organizations/create`;
  const body = { domain };
  return getData({ route, key, body });
}

export async function onOrganizationAddUser({ key, email, domain }) {
  const route = `${Constants.API}/organizations/users/add`;
  const body = { email, domain };
  return getData({ route, key, body });
}

// ---
// Likes
// ---

export async function onCreateLike({ key, entity_id, data }) {
  const route = `${Constants.API}/likes/create`;
  const body = { entity_id, data };
  return getData({ route, key, body });
}

export async function onDeleteLike({ key, id }) {
  const route = `${Constants.API}/likes/delete`;
  const body = { id };
  return getData({ route, key, body });
}

export async function onGetViewerLikes({ key }) {
  const route = `${Constants.API}/users/viewer/likes`;
  const body = {};
  return getData({ route, key, body });
}

// ---
// Events
// ---

export async function onGetEvents({ key, domain }) {
  const route = `${Constants.API}/events`;
  const body = { domain };
  return getData({ route, key, body });
}

export async function onCreateEvent({ key, domain, begins_at, ends_at, visibility, data }) {
  const route = `${Constants.API}/events/create`;
  const body = { domain, begins_at, ends_at, visibility, data };
  return getData({ route, key, body });
}

export async function onDeleteEvent({ key, id }) {
  const route = `${Constants.API}/events/delete`;
  const body = { id };
  return getData({ route, key, body });
}

// ---
// Subscriptions
// ---

export async function onGetSubscriptions() {
  const route = `${Constants.API}/users/subscriptions`;
  const body = {};
  return getData({ route, key: null, body });
}

// ---
// Public user lookup
// ---

export async function onGetPublicUserByUsername({ username }) {
  const route = `${Constants.API}/users/public/get-by-username`;
  const body = { username };
  return getData({ route, key: null, body });
}

// ---
// File uploads
// ---

export async function onUserUploadDataGCS({ domain, file, key }) {
  let signedResult;
  const name = file.name;
  const type = file.type;
  const size = file.size;

  if (size > Constants.MAX_SIZE_BYTES) {
    return { error: 'File size exceeds 15mb limit' };
  }

  try {
    const route = `${Constants.API}/data/generate-presigned-url-gcs`;
    const body = { domain, type, file: name, size };
    signedResult = await getData({ route, key, body }, 'uploadURL');
  } catch (e) {
    return null;
  }

  try {
    fetch(signedResult.uploadURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: file,
    });
  } catch (e) {
    return null;
  }

  return signedResult;
}

export async function onUserUploadDataS3({ domain, file, key }) {
  let signedResult;
  const name = file.name;
  const type = file.type;
  const size = file.size;

  if (size > Constants.MAX_SIZE_BYTES) {
    return { error: 'File size exceeds 15mb limit' };
  }

  try {
    const route = `${Constants.API}/data/generate-presigned-url`;
    const body = { domain, type, file: name, size };
    signedResult = await getData({ route, key, body }, 'uploadURL');
  } catch (e) {
    return null;
  }

  try {
    fetch(signedResult.uploadURL, {
      method: 'PUT',
      body: file,
    });
  } catch (e) {
    return null;
  }

  return signedResult;
}
