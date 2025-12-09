import { auth, id } from "@/appwrite";
import { HookResponse } from "@/models/types";
import { useAppDispatch } from "@/store/hooks";
import { setAuthState } from "@/store/slices/authSlice";
import { useCallback } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const sendOtp = useCallback(async (email: string): Promise<HookResponse> => {
    try {
      const response = await auth.createEmailToken({ userId: id.unique(), email });

      return {
        success: true,
        message: "succes",
        data: response.userId,
      };
    } catch (error: any) {
      console.log("There was an error sendOTP: ", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }, []);

  const validateOtp = useCallback(async (userID: string, secret: string): Promise<HookResponse> => {
    try {
      const response = await auth.createSession({ userId: userID, secret });

      dispatch(setAuthState(true));

      return {
        success: true,
        message: "succes",
        data: response,
      };
    } catch (error: any) {
      console.log("There was an error validate Otp: ", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }, []);

  const signOut = useCallback(async (): Promise<HookResponse> => {
    try {
      const response = await auth.deleteSession({ sessionId: "current" });

      dispatch(setAuthState(false));

      console.log("Sign out");

      return {
        success: true,
        message: "succes",
        data: response,
      };
    } catch (error: any) {
      console.log("There was an error signOut: ", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }, []);

  const checkUserPressence = useCallback(async (): Promise<HookResponse> => {
    try {
      const response = await auth.get();

      dispatch(setAuthState(true));

      return {
        success: true,
        message: "succes",
        data: response,
      };
    } catch (error: any) {
      console.log("Error checking the user pressence", error);
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }, []);

  return {
    sendOtp,
    validateOtp,
    signOut,
    checkUserPressence,
  };
};

export default useAuth;
