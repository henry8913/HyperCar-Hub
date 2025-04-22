
<h1 align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?font=Iosevka&size=30&color=d4af37&center=true&vCenter=true&width=800&height=60&lines=🚗+HyperCar+Hub&repeat=false" alt="🚗 HyperCar Hub">
</h1>

**HyperCar Hub** è una moderna applicazione React per la visualizzazione e l'acquisto simulato di auto di lusso. Questo progetto full-stack è stato sviluppato per dimostrare l'implementazione di un e-commerce moderno con React, TypeScript e API personalizzate.

<p align="center">
  <img src="./public/cover_a.jpg" alt="Cover" width="100%" />
</p>

Questo progetto dimostra l'implementazione di un'applicazione React moderna con TypeScript, integrando API personalizzate e gestione dello stato avanzata. L'applicazione è costruita seguendo le best practices moderne di sviluppo web, utilizzando componenti riutilizzabili e una struttura scalabile.

### Tecnologie Principali:
- **React 18**: Framework UI moderno con Hooks e Context API
- **TypeScript**: Tipizzazione statica per codice più robusto
- **Vite**: Build tool performante per sviluppo rapido
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animazioni fluide e interattive
- **React Router**: Routing dichiarativo
- **API Custom**: Backend dedicato per la gestione dei dati

---

## 📌 Funzionalità Principali
- 🏎️ **Catalogo Dinamico**: Vista dettagliata delle auto di lusso
- 🔍 **Confronto Veicoli**: Tool avanzato per confrontare specifiche
- 🛒 **Carrello Reattivo**: Gestione stato con Context API
- 💳 **Checkout Demo**: Processo d'acquisto simulato
- 👤 **Gestione Utenti**: Login e profilo utente
- 📱 **Design Responsive**: Ottimizzato per ogni dispositivo
- ⚡ **Performance**: Caricamento ottimizzato delle risorse

---

## 🔌 API Integration
Il progetto si integra con l'[API HyperCar-Hub](https://github.com/henry8913/API_HyperCar-Hub), una REST API sviluppata utilizzando FastAPI, un moderno framework web Python noto per le sue elevate prestazioni e semplicità d'uso, garantendo una gestione completa ed efficace del catalogo auto.

### Caratteristiche API:
- Operazioni CRUD complete per le auto
- Storage persistente in JSON
- Validazione dati con Pydantic
- Documentazione Swagger UI (/docs)
- CORS abilitato per integrazione frontend

### Endpoints e Modelli:
```typescript
const API_URL = import.meta.env.VITE_API_URL;

// Gestione Auto
interface Car {
  id?: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  imageUrl: string;
}

// Endpoints Auto
GET    `${API_URL}/cars`            // Lista completa
GET    `${API_URL}/cars/:id`        // Dettaglio auto
POST   `${API_URL}/cars`            // Nuova auto
PUT    `${API_URL}/cars/:id`        // Aggiorna auto
DELETE `${API_URL}/cars/:id`        // Elimina auto
GET    `${API_URL}/cars/brand/:brand` // Filtro per marca

// Gestione Utenti e Ordini
POST   `${API_URL}/auth/login`      // Login
GET    `${API_URL}/users/profile`   // Profilo utente
POST   `${API_URL}/orders`          // Crea ordine
GET    `${API_URL}/orders/:id`      // Dettaglio ordine
```

Per documentazione completa e dettagli implementativi, visita il [repository dell'API](https://github.com/henry8913/API_HyperCar-Hub).

---

## 📂 Struttura del Progetto
```
src/
├── api/              # Servizi API e client HTTP
├── components/       # Componenti React riutilizzabili
├── contexts/        # Context API per stato globale
├── pages/           # Componenti pagina
├── types/           # TypeScript interfaces
└── utils/           # Utilities e helpers
```

## ⚙️ Funzionalità Dettagliate

### Componenti Principali:
- **Hero**: Showcase dinamico delle auto in evidenza
- **CarCard**: Card interattiva per la visualizzazione delle auto
- **CompareTool**: Sistema di confronto specifiche tecniche
- **CartContext**: Gestione globale del carrello
- **UserContext**: Autenticazione e profilo utente

### Features Tecniche:
- SSR Ready
- Lazy Loading delle immagini
- Caching delle richieste API
- Animazioni fluide
- Gestione errori robusta
- Code splitting automatico

---

## 🚀 Setup Locale
```bash
# Installazione dipendenze
npm install

# Avvio development server
npm run dev

# Build per produzione
npm run build
```

## ⚠️ Nota Importante
Questo è un progetto dimostrativo. Le funzionalità di pagamento sono simulate e non vengono processati pagamenti reali.

## 👤 Autore
Progetto creato da [Henry](https://github.com/henry8913)

## 📝 Licenza
Distribuito sotto la licenza [MIT](https://github.com/henry8913/HyperCar-Hub/blob/main/LICENSE.txt). Consulta il file LICENSE per maggiori dettagli.
