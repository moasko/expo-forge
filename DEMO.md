# Demo & Quickstart

## ⚡ Quick Start (5 minutes)

### 1. Initialize a project

```bash
npm run init my-booking-app
# OU
node init-expo.js my-booking-app
```

**Sortie attendue:**
```
🚀 Initialisation d'un projet Expo Ultra-Moderne: my-booking-app...

──── ÉTAPE 1: Création du projet ────

──── ÉTAPE 2: Installation des dépendances ────

──── ÉTAPE 3: Création de l'arborescence ────
✅ Structure de dossiers créée

──── ÉTAPE 4: Génération des fichiers ────
✅ src/api/query-client.ts
✅ src/store/useAuthStore.ts
✅ src/app/_layout.tsx
✅ src/app/index.tsx
✅ tailwind.config.js
✅ .env.example

──── ✅ SUCCÈS ────
✨ Projet initialisé avec succès!

Pour démarrer:
  1. cd my-booking-app
  2. npx expo start
```

### 2. Naviguer dans le projet

```bash
cd my-booking-app
```

### 3. Créer votre première feature

```bash
# Depuis la racine du projet my-booking-app
node ../generate-feature.js generate feature booking
```

**Sortie attendue:**
```
🏗️  Construction de la feature: Booking...

──── ÉTAPE 1: Création de l'arborescence ────

──── ÉTAPE 2: Génération des fichiers ────
✅ types/index.ts
✅ services/booking.service.ts
✅ api/useBookings.ts
✅ store/useBookingStore.ts
✅ components/BookingCard.tsx
✅ BookingScreen.tsx
✅ index.ts

──── ✅ SUCCÈS ────
✨ Feature "Booking" créée avec succès!

📚 Structure générée:
  📁 types/        - Définitions TypeScript
  📁 services/     - Logique API (Axios)
  📁 api/          - Hooks TanStack Query
  📁 store/        - Zustand stores
  📁 components/   - Composants UI

💡 Prêt à utiliser:
  import { BookingScreen } from '@/features/booking';
```

### 4. Créer d'autres features

```bash
# Feature Payment
node ../generate-feature.js generate feature payment

# Feature Reviews
node ../generate-feature.js generate feature reviews

# Feature AuthSetup
node ../generate-feature.js generate feature auth-setup
```

### 5. Vérifier la structure

```bash
# Afficher tous les fichiers créés
ls -la src/features/

# Structure finale:
# src/features/
# ├── booking/
# │   ├── api/
# │   ├── components/
# │   ├── hooks/
# │   ├── services/
# │   ├── store/
# │   ├── types/
# │   ├── utils/
# │   ├── BookingScreen.tsx
# │   └── index.ts
# ├── payment/
# │   └── (même structure)
# ├── reviews/
# │   └── (même structure)
# └── auth-setup/
#     └── (même structure)
```

## 📖 Exemples d'Utilisation Dans le Code

### Utiliser une Feature

```typescript
// src/app/booking-page.tsx
import { BookingScreen } from '@/features/booking';

export default function BookingPage() {
  return <BookingScreen />;
}
```

### Utiliser les Hooks

```typescript
// Composant quelconque
import { useBookings, useCreateBooking } from '@/features/booking';

export function BookingList() {
  const { data: bookings, isLoading } = useBookings();
  const { mutate: createBooking } = useCreateBooking();

  return (
    <View>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        bookings?.map(booking => (
          <BookingCard key={booking.id} item={booking} />
        ))
      )}
    </View>
  );
}
```

### Utiliser le Store

```typescript
import { useBookingStore } from '@/features/booking';

export function BookingFilter() {
  const { filter, setFilter } = useBookingStore();

  return (
    <TextInput
      value={filter}
      onChangeText={setFilter}
      placeholder="Filtrer les réservations..."
    />
  );
}
```

### Appeler les Services

```typescript
import { bookingService } from '@/features/booking/services/booking.service';

export async function fetchAllBookings() {
  try {
    const bookings = await bookingService.getAll();
    console.log('Réservations:', bookings);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

## 🎨 Intégration dans une App Réelle

### Structure Complète

```typescript
// src/app/_layout.tsx
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/query-client';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="booking" options={{ title: 'Booking' }} />
        <Stack.Screen name="payment" options={{ title: 'Payment' }} />
      </Stack>
    </QueryClientProvider>
  );
}
```

```typescript
// src/app/index.tsx
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold mb-4">Mon App Expo</Text>
      <Button
        title="Aller aux réservations"
        onPress={() => router.push('/booking')}
      />
      <Button
        title="Aller aux paiements"
        onPress={() => router.push('/payment')}
      />
    </View>
  );
}
```

```typescript
// src/app/booking.tsx
import { BookingScreen } from '@/features/booking';

export default function BookingPage() {
  return <BookingScreen />;
}
```

## 🔌 Configuration API

```typescript
// src/lib/api-client.ts
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || '30000'),
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🧪 Tester le Générateur

```bash
# Test rapide
cd /tmp
node /path/to/expo/init-expo.js test-project
cd test-project
node /path/to/expo/generate-feature.js generate feature test-feature
ls -la src/features/test-feature/

# Devrait montrer:
# ├── api/
# ├── components/
# ├── hooks/
# ├── services/
# ├── store/
# ├── types/
# ├── utils/
# ├── TestFeatureScreen.tsx
# └── index.ts
```

## 📝 Environnement

Configurez votre `.env` (généré automatiquement):

```bash
# .env / .env.local
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_TIMEOUT=30000
```

## 🚀 Commandes Utiles

```bash
# Dans la racine du projet généré

# Démarrer le serveur
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web

# Générer une feature
node ../generate-feature.js generate feature my-feature

# Nettoyer les caches
rm -rf node_modules .expo
npx expo install
```

## 🎯 Points Clés à Retenir

✅ **Chaque feature est indépendante** - Vous pouvez les développer en parallèle  
✅ **Structure cohérente** - Tous les fichiers sont au même endroit  
✅ **Réutilisable** - Types, hooks, composants prêts à l'emploi  
✅ **Scalable** - Ajoutez autant de features que vous voulez  
✅ **Modern Stack** - TanStack Query, Zustand, NativeWind, etc.  

## 🆘 Dépannage

### Erreur: "npx: command not found"
```bash
# Installez Node.js depuis https://nodejs.org
# Vérifiez: node -v && npm -v
```

### Erreur: "Impossible de créer le projet"
```bash
# Nettoyez et réessayez
rm -rf node_modules package-lock.json
npm install
npm run init
```

### Feature non trouvée après génération
```bash
# Assurez-vous que vous êtes dans le bon répertoire
pwd  # Doit être /path/to/my-app
ls src/features/  # Doit afficher votre feature
```

## 💡 Prochaines Étapes

1. Lire [README.md](README.md) pour la documentation complète
2. Lire [ARCHITECTURE.md](ARCHITECTURE.md) pour comprendre l'architecture
3. Lire [CONTRIBUTING.md](CONTRIBUTING.md) pour contribuer
4. Créer vos propres features!

Prêt? Let's go! 🚀
