import { auth, db, DB_ID, id, USERS_COLLECTION_ID } from "@/appwrite";
import { toUser } from "@/helpers/dbHelpers";
import { HookResponse, User, User_DB } from "@/models/types";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

const useUser = () => {
  const dispatch = useAppDispatch();

  const createUser = async (user: User_DB): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      await db.createRow({
        databaseId: DB_ID,
        tableId: USERS_COLLECTION_ID,
        rowId: id.custom(currentUser.$id),
        data: {
          ...user,
          email: currentUser.email,
        },
      });

      return {
        success: true,
        message: "succes",
        data: null,
      };
    } catch (error: any) {
      console.log("Error creating the user", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };

  const getUser = async (): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      const response = await db.getRow({ databaseId: DB_ID, tableId: USERS_COLLECTION_ID, rowId: currentUser.$id });

      const user = toUser(response);

      dispatch(setUser(user));

      return {
        success: true,
        message: "succes",
        data: user,
      };
    } catch (error: any) {
      console.log("Error getting the user", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };
  const updateUserData = async (updatedUserPart: Partial<User>): Promise<HookResponse> => {
    try {
      const currentUser = await auth.get();

      const response = await db.updateRow({
        databaseId: DB_ID,
        tableId: USERS_COLLECTION_ID,
        rowId: currentUser.$id,
        data: updatedUserPart,
      });

      const user = toUser(response);

      dispatch(setUser(user));

      return {
        success: true,
        message: "User updated successfully!",
        data: user,
      };
    } catch (error: any) {
      console.log("Error updating the user", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  };

  return {
    createUser,
    getUser,
    updateUserData,
  };
};

export default useUser;
