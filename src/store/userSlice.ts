import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {UserData } from "../services/interfaces"


// Stato iniziale dei dati dell'utente
const initialState: UserData = {
  username: "",
  email: "",
};

// Creazione del slice per i dati dell'utente
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer per l'aggiornamento dei dati dell'utente
    updateUserData: (state, action: PayloadAction<UserData>) => {
      const { username, email } = action.payload;
      state.username = username;
      state.email = email;
    },
  },
});

// Seleziona i dati dell'utente dallo stato globale
export const select = (state: RootState) => state.user;

// Azioni per l'aggiornamento dei dati dell'utente
export const { updateUserData } = userSlice.actions;

// Reducer per i dati dell'utente
export default userSlice.reducer;
