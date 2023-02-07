/*
Creo uno slice di Redux che gestisce il punteggio del TEST SURVEY. Lo stato iniziale del contatore viene impostato a 0. 
Definisco le azioni per incrementare e decrementare il contatore, nonché un'azione per incrementare il contatore di un numero specificato.
Queste azioni possono essere dispatchate dalle componenti React per modificare lo stato del contatore nel Redux store. 
La funzione "selectCount" viene utilizzata per selezionare il valore corrente del contatore dallo stato del Redux store.
*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Definisco l'interfaccia per lo stato del contatore
export interface CounterState {
  value: number
}

// Imposto lo stato iniziale del contatore a 0
const initialState: CounterState = {
  value: 0
};

// Creo lo slice per il contatore utilizzando la funzione `createSlice`
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Nel campo `reducers` definisco i riduttori e genero le relative azioni
  reducers: {
    // Utilizzo il tipo PayloadAction per dichiarare il contenuto di `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  }
  ,
});


export const { incrementByAmount } = counterSlice.actions;

// La funzione sottostante è chiamata selector e mi permette di selezionare un valore dallo stato.
// I selector possono anche essere definiti inline laddove vengono utilizzati invece che nel file dello slice.
// Ad esempio: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// Espongo il riduttore per il contatore
export default counterSlice.reducer;
