
# TestSurvey

  Questo problema riguarda la realizzazione di un sistema di comprensione dei contenuti per gli utenti tramite una survey. Il sistema dovrà acquisire le informazioni dell'utente, presentare domande e acquisirne le risposte. 
  
  Ad ogni domanda verranno visualizzate tre possibili risposte, di cui solo una è corretta. 
  - In caso di risposta corretta verrà mostrato un testo che motiva la risposta
  - in caso di risposta errata verrà indicata la risposta corretta e mostrato un testo di spiegazione.

Il backend utilizzerà un database json fornito e un server mocking per le web API di gestione. Il frontend utilizzerà React con Typescript, Redux per lo store delle domande e risposte, CSS e Bootstrap e un semplice layout grafico.

Il flusso di lavoro consiste nella lettura dei dati dal web service, acquisizione dei dati utente (nome ed email), presentazione delle domande con tre possibili risposte, selezione di una risposta da parte dell'utente, visualizzazione del testo di risposta corretta/errata, avanzamento della domanda successiva attraverso un wizard, raccolta di tutte le domande inserite e invio dei dati al web service.

###Per implementare ho creato 3 componenti

#### Counter
Crea un componente React che visualizza il punteggio di un sondaggio. Il punteggio viene gestito tramite Redux, che utilizza uno "slice" per mantenere lo stato del contatore. Il contatore viene inizialmente impostato a 0. Viene definita un'azione per incrementare il contatore di un numero specificato. Il componente utilizza i hook di React per accedere allo stato del contatore e alla funzione dispatch. Il componente visualizza e aggiorna il punteggio a seconda delle risposte.

#### Survey
Creo un componente React che rappresenta un sondaggio denominato "Survey". Utilizza i hook di React useState e useEffect, insieme alla libreria axios, per gestire la comunicazione con un'API REST. Mostra una domanda alla volta all'utente e salva le risposte scelte dall'utente nello stato. Mostra anche il progresso del sondaggio e un modale che indica se la risposta scelta dall'utente è corretta o sbagliata. Alla fine del sondaggio, invia i dati dell'utente e i punti ottenuti all'API per l'archiviazione.

#### User (UserForm)
Il componente UserForm utilizza i hook di React useState e useAppDispatch per gestire i dati utente in un form e inviare i dati al negozio Redux. Il codice utilizza anche la libreria Bootstrap per creare un form HTML.
Con userSlice.ts si definisce il riduttore Redux che gestisce i dati dell'utente. Il codice utilizza createSlice di Redux Toolkit per creare uno slice del negozio che gestisce lo stato dell'utente. Il riduttore ha uno stato iniziale di dati utente vuoti e una sola azione, updateUserData, che modifica lo stato dell'utente in base ai dati inviati

## Sintesi formale

Ho chiaramente cercato di adottare un Metodologia Agile rispetto all'implementazione stessa, rivolta a consolidare una parte per poi proseguire nelle parti adiacenti.

Per prima cosa ho diviso tutta l'implementazione in piccoli pezzetti, seguendo il paradigma Divide-Et-Impera.
Ho quindi stilato delle POC (Proof of concept) partendo per esempio dalla lettura del database da db.json e json-server avendola considerata 
ostile in base alla mia esperienza per poi porre la maggior parte dell'attenzione alle varie dependency injection e all'uso di Redux.
Dopo ho provveduto a creare la parte grafica dell'Utente e del Survey trovandomi poi ad affrontare il problema degli scope diversi rispetto ai componenti e quindi
la configurazione di Redux e delle variabili necessarie.

Ho proceduto, una volta fatta luce su tutti i punti a me dubbi, a stilare un Flow di macro task cosi suddiviso inizialmente:

- Avviare un server mocking, utilizzando ad esempio json-server, per gestire le API di lettura e invio dati.
- Creare un componente React in Typescript che chieda il nome ed email dell'utente.
- Utilizzare Redux per memorizzare le domande e le risposte dell'utente durante la gamification.
- Implementare un componente che legga le domande dal server tramite le API e le mostri all'utente, con le tre possibili risposte e un pulsante per confermare la scelta.
- Mostrare un testo di risposta corretta o errata a seconda della risposta selezionata dall'utente, dopo che ha cliccato sul pulsante "Avanti".
- Implementare un componente che gestisca il wizard di avanzamento, mostrando una domanda alla volta e passando alla successiva solo dopo che l'utente ha cliccato sul pulsante "Avanti".
- Creare un componente che raccolga tutte le domande e risposte inserite dall'utente durante la gamification.
- Implementare un componente che invii i dati raccolti al server tramite le API.
- Utilizzare SCSS e Bootstrap (se desiderato) per la realizzazione del layout grafico, ispirandosi a sistemi di survey come slide.io.

Ho suddiviso ulteriormente questi punti avvalendomi delle mappe mentali per poter astrarre velocemente e aiutarmi nel rendere ripida la curva d'apprendimento.



Ho proceduto a sviluppare questo test tenendo conto dei tempi ristretti e della superficiale conoscenza di React e Redux.
Considerato il tempo esiguo rispetto ai miei impegni, ho prestato poca attenzione a capire nel profondo le dinamiche e i tecnicismi 
che si celano dietro a Redux e mi sono preoccupato principalmente di consultare le documentazioni prendere i vari esempi e rimodularli,
al fine di implementare le funzionalità di mio interesse, quindi una sorta di System Integration su piccola scala.

## Guida

  

Per avviare il progetto

1. Configurare json server con il file db.json allegato nel repository

2. Avviare json-server 
	`json-server --port 3001 db.json`

3. Installare i moduli npm
	 `npm install`

4. Avviare npm
	`npm start`
5. Collegarsi a http://localhost:3000