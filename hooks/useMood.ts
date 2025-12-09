import { auth, db, DB_ID, MOOD_REGISTERS_COLLECTION_ID, query } from "@/appwrite";
import { toMoodRegister } from "@/helpers/dbHelpers";
import { HookResponse, Mood_Register } from "@/models/types";
import { useAppDispatch } from "@/store/hooks";
import { setMoods } from "@/store/slices/moodSlice";
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

      console.log(registeredMoods);

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

  return { getMyRegisteredMoods };
};

export default useMood;
