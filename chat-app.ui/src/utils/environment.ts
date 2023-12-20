export const REST_API_BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;
export const REST_API_ROOT_PATH = import.meta.env.VITE_REST_API_ROOT_PATH;
export const REST_API_VERSION = import.meta.env.VITE_REST_API_VERSION;

export const API_ENDPOINT = `${REST_API_BASE_URL}/${REST_API_ROOT_PATH}/${REST_API_VERSION}`;
export const SOCKETIO_ENDPOINT = REST_API_BASE_URL as string;
export const USER_AVATAR_BASE_URL = `${REST_API_BASE_URL}/${REST_API_ROOT_PATH}/${REST_API_VERSION}/users/avatar`;
