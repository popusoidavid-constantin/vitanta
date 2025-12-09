import { Models } from "react-native-appwrite";

import { Mood_Register, User } from "@/models/types";

export const toUser = (doc: Models.DefaultRow): User => ({
  username: doc.username,
  email: doc.email,
  imageId: doc.imageId,
  id: doc.$id,
  createdAt: doc.$createdAt,
});

export const toMoodRegister = (doc: Models.DefaultRow): Mood_Register => ({
  id: doc.$id,
  createdAt: doc.$createdAt,
  score: doc.score,
  date: doc.date,
  note: doc.note,
  createdBy: doc.createdBy,
});
