import { auth, db, DB_ID, id, MOOD_REGISTERS_COLLECTION_ID, query } from "@/appwrite";
import { toMoodRegister } from "@/helpers/dbHelpers";
import { HookResponse, Mood_Register, Mood_Register_DB } from "@/models/types";
import { useAppDispatch } from "@/store/hooks";
import { addMood, setMoods } from "@/store/slices/moodSlice";
import { useCallback } from "react";

const useMood = () => {
  const dispatch = useAppDispatch();
  const getMyRegisteredMoods = useCallback(async (): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      const response = await db.listRows({
        databaseId: DB_ID,
        tableId: MOOD_REGISTERS_COLLECTION_ID,
        queries: [query.equal("createdBy", currentUser.$id)],
      });

      const registeredMoods: Mood_Register[] = response.rows.map((r) => toMoodRegister(r));

      dispatch(setMoods(registeredMoods));

      return {
        success: true,
        message: "success",
        data: registeredMoods,
      };
    } catch (error: any) {
      console.log("Error getting registered moods: ", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }, []);

  const createRegisterMood = useCallback(async (newMoodReg: Mood_Register_DB): Promise<HookResponse> => {
    try {
      const response = await db.createRow({
        databaseId: DB_ID,
        tableId: MOOD_REGISTERS_COLLECTION_ID,
        rowId: id.unique(),
        data: newMoodReg,
      });

      const mood = toMoodRegister(response);

      dispatch(addMood(mood));

      await getMyRegisteredMoods();

      return {
        success: true,
        message: "Mood registered successfully!",
        data: mood,
      };
    } catch (error: any) {
      console.log("Error adding the reg mood", error);

      return {
        success: false,
        message: "Mood register error!",
        data: null,
      };
    }
  }, []);

  return { getMyRegisteredMoods, createRegisterMood };
};

export default useMood;
