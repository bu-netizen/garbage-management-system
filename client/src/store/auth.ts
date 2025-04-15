import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthState {
	isAuth: boolean;
	isAdmin: boolean;
	isDriver: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	setIsDriver: (isDriver: boolean) => void;
	setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
	immer((set) => ({
		isAuth: false,
		isAdmin: false,
		isDriver: false,
		setIsAuth: (isAuth) =>
			set((state) => {
				state.isAuth = isAuth;
			}),
		setIsAdmin: (isAdmin) =>
			set((state) => {
				state.isAdmin = isAdmin;
			}),
		setIsDriver: (isDriver) =>
			set((state) => {
				state.isDriver = isDriver;
			}),
	}))
);
