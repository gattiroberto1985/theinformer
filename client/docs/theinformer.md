# The Informer -- Frontend

Qualche memo per lo sviluppo dell'applicazione

## Info generiche su file del progetto

I file di progetto sono organizzati in directory; in particolare:

- `templates`: contiene i javascript da cui vengono poi generati i DOM da
  mostrare per le varie `View` di Backbone;

- `src`: contiene i file sorgenti del progetto:

    - `main.js`: entry point dell'applicazione, puntato sull'`index.html`
      attraverso il `data-main` dell'importazione della libreria `require.js`.
      Viene qui eseguita la configurazione di `require.js` relativa
      all'applicazione, definendo i percorsi e chiamando il metodo di boot
      dell'applicazione stessa;

    - `config.js`: modulo di configurazione, contenente parametri e proprieta'
      di utilizzo generico. Ad esempio, qui è contenuto l'indirizzo url del
      server;

    - `app.js`: Modulo di configurazione ed avvio dell'applicazione. Esegue le
      varie operazioni necessarie per una corretta esecuzione;

    - `text.js`: libreria necessaria per la gestione dei template delle view
      come file `.html` parziali anziche' come file `.js` (da capire, c'e'
      problema con `CORS` ...);

    - `router.js`: configurazione del router backbone, con i path della GUI e le
      relative azioni da intraprendere per il cambio path.

Generalmente ogni file di progetto è un _modulo_ di `require.js`, e contiene
quindi una istruzione `return` che ritorna quanto ritenuto necessario per gli
altri moduli applicativi.

## Interfaccia

L'interfaccia è divisa in quattro parti:

- lista feed, con pannello di gestione;
- lista articoli nel feed;
- riquadro di lettura;
- note e storyboard dell'articolo.

### `Panel` Lista Feed

Il pannello è costituito da due macro `View` di `Backbone`:

- `FeedManagerView`, con all'interno:

    - un pulsante per l'azione di aggiornamento generale dei feed;
    - un pulsante per l'azione _mark as read_ su tutti i feed;
    - una `View` interna per l'inserimento di un nuovo feed con dentro:
        - una casella di testo per il nome;
        - una casella di testo per il link;
        - una casella di testo per la tipologia del feed.

- `FeedListView`, con la lista di feed. La view e' popolata a partire da una
  `Collection` e le view figlie, costruite su `FeedView` contengono:

    - una label con la tipologia del feed e il suo nome;
    - una label con l'url del feed;
    - un pulsante di aggiornamento feed;
    - un pulsante di rimozione feed;
    - un pulsante di _mark as read_.

I template per le view sono i file `managerTpl.js` e `feedListTpl.js`, mentre il
`feedTpl.js` è il template relativo alla vista con il singolo feed.

## Fix et al

- Dockerizzazione
- [ Backend ] [ BUG001 ] La creazione di un nuovo feed non esegue il download
  degli articoli, dato che questi hanno sicuramente data di pubblicazione
  precedente alla data di ultimo aggiornamento del feed. Impostare l'
  `update date` dei feed nuovi a `t = 0`;
