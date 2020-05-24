export { default as authRepository } from './authRepository';
export { default as profileRepository } from './profileRepository';
export { default as postRepository } from './postRepository';
export { default as commentRepository } from './commentRepository';
export { default as notificationRepository } from './notificationRepository';

export interface Response {
  status: string | number;
  message?: string;
}
