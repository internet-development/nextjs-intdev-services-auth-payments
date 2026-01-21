export const MAX_SIZE_BYTES = 15728640;

export const API = `https://api.internet.dev/api`;
// NOTE(jimmylee):
// https://github.com/internet-development/apis
// export const API = `http://localhost:10001/api`;

export const OAUTH_REDIRECT_SIGNATURE = `REDIRECT_PAYMENTS_INTERNET_DEV`;
// NOTE(jimmylee):
// Unfortunately, there are hardcoded variables you must add to
// https://github.com/internet-development/apis
// Submit it as a Pull Request, and it will just work
// https://github.com/internet-development/apis/blob/b8558a0c653ecb91e094d21d13d6ea976b476e07/common/constants.ts#L43
// https://github.com/internet-development/apis/blob/b8558a0c653ecb91e094d21d13d6ea976b476e07/common/constants.ts#L54
// https://github.com/internet-development/apis/blob/b8558a0c653ecb91e094d21d13d6ea976b476e07/common/constants.ts#L54
// https://github.com/internet-development/apis/blob/b8558a0c653ecb91e094d21d13d6ea976b476e07/common/constants.ts#L76

export const LINKS = {
  PAYING: 'https://buy.stripe.com/28og0B2f9eIj8Io9AA',
  GENERAL_CO_WORKING: 'https://buy.stripe.com/7sI7u5f1V2ZB1fW145',
  PARTNER: 'https://buy.stripe.com/8wMaGh6vp43F5wccMO',
};

export const Users = {
  tiers: {
    UNVERIFIED: 0,
    VERIFIED: 10,
    PAYING: 20,
    GENERAL_CO_WORKING: 30,
    PARTNER: 40,
    ADMIN: 100,
  },
};

export const Tiers = {
  PAYING: 899,
  GENERAL_CO_WORKING: 40400,
  PARTNER: 279000,
};

export const Payments = {
  899: 'PAYING',
  40400: 'GENERAL_CO_WORKING',
  279000: 'PARTNER',
};

export const Payouts = {
  PAYING: 1500,
  GENERAL_CO_WORKING: 45000,
  PARTNER: 45000,
};
