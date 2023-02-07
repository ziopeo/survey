// Importiamo le dipendenze di React
import React, { useState } from "react";

// Importazione hook personalizzati per accedere allo stato dell'app e all'azione dispatch
import { useAppSelector, useAppDispatch } from "../../store/hooks";

// Importiamo la funzione "incrementByAmount" e la selezione "selectCount" dal file "counterSlice"
import { incrementByAmount, selectCount } from "../../store/counterSlice";

// Importazione stili CSS
import styles from "./Counter.module.css";

// Definiamo il componente "Counter"
export const Counter = () => {
  // Utilizziamo l'hook "useAppSelector" per accedere al valore corrente del contatore
  const count = useAppSelector(selectCount);

  // Utilizziamo l'hook "useAppDispatch" per accedere alla funzione dispatch
  const dispatch = useAppDispatch();

  // Utilizziamo l'hook "useState" per gestire lo stato del valore di incremento
  const [incrementAmount, setIncrementAmount] = useState("0");

  // Convertiamo il valore di incremento in un numero o lo impostiamo su 0 se non è un numero valido
  const incrementValue = Number(incrementAmount) || 0;

  // Restituiamo la UI del componente
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>Punteggio: {count}</span>
      </div>
    </div>
  );
};
