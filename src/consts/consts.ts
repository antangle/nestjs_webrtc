export const consts = {
    //normal consts
    OK: 200,
    LIMIT_MOST_USED_TAGS: 3,
    PAGINATION_TAKE: 20,
    LOCAL: 'local',
    SPEAKER: 'SPEAKER',
    GUEST: 'GUEST',
    HOST: 'HOST',
    NO_REVIEW_NUMBER: 5,
    //peer
    ROOM_CACHE_TTL: 3600*24,

    //FCM

    //sens
    SENS_DEFAULT: '[ex-it!]',
    SMS: 'SMS',
    FROM_PHONE_NUMBER: '01090204201',
    PHONE_VERIFY_TTL: 180,
    SPEAKER_TTL: 20,

    //for testing purposes
    LOCAL_URL: 'https://ex-it.app/health',
    KAKAO: 'kakao',
    KAKAO_URL: "https://kapi.kakao.com/v1/user/access_token_info",
    
    NAVER: 'naver',
    NAVER_URL: "https://openapi.naver.com/v1/nid/me",
    
    FACEBOOK: 'facebook',
    FACEBOOK_URL: "https://graph.facebook.com/me",

    OAUTH_ACCESS_TOKEN: 'oauth_access_token',
    OAUTH_REFRESH_TOKEN: 'oauth_refresh_token',
    REFRESH_TOKEN: 'refresh_token',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN_HEADER: 'Refresh-Token',

    //jwt
    JWT_ACCESS_TOKEN_EXP: '30m',
    JWT_REFRESH_TOKEN_EXP: '14d',
    ONE_DAY_IN_SECONDS: 24*60*60,
    JWT_EXPIRED: 'jwt expired',

    //Error handling messages
    CUSTOM_ERROR_MSG: 'custom error!',
    TARGET_NOT_EXIST: 'target has no match in database',
    JWT_NOT_EXIST: 'no access_token exists',
    INVALID_JWT: 'invalid jwt token',
    BAD_REFRESH_TOKEN: 'refresh token not match',
    INVALID_OAUTH_TOKEN: 'invalid oauth access token',
    UNHANDLED_EXCEPTION: 'something wrong',
    OAUTH_CANT_CHANGE_PW: 'oauth users cant change password!',
    PASSWORD_NOT_MATCH: 'password does not match',
    TOO_MANY_TRIES: 'too many loops',
    DATABASE_CREATE_FAILED: 'insert failed',
    DATABASE_ERROR: 'typeorm error',
    NO_RESPONSE: 'no response recieved',
    EXISTS: 'target exists in database',
    QUERY_FAILED: 'query failed',
    INSERT_FAILED: 'insert query failed',
    UPDATE_FAILED: 'update failed',
    UNAUTHORIZED_USER: 'unauthorized access',
    BAD_REQUEST: 'bad request',
    DUPLICATE_ACCOUNT_ERROR: 'this account is already signed in',
    SERVER_ERROR: 'server error',
    NOT_FOUND: '404 Not Found',
    ALREADY_OCCUPIED: 'room already occupied or offline',
    SENS_RESPONSE_ERROR: 'http response error',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    WS_VALIDATION_EXCEPTION: 'websocket validation error',
    WS_NOT_JSON_EXCEPTION: 'data is not in json format',
    NEW_PW_NOT_MATCH: 'new password not match',
    SEND_FCM_MESSAGE_ERR_MSG: 'fcm error',
    //Error codes
    JWT_STRATEGY_ERROR_CODE: 1
}