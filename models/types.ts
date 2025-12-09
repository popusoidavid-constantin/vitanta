export interface HookResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface User {
  id: string;
  createdAt: string;
  username: string;
  email: string;
  imageId: string;
}

export interface User_DB {
  username: string;
  email: string;
  imageId: string;
}

export interface Mood_Register {
  id: string;
  createdAt: string;
  score: number;
  note: string;
  date: string;
  createdBy: string;
}
export interface Mood_Register_DB {
  score: number;
  note: string;
  date: string;
  createdBy: string;
}
