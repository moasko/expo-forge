# Demo & Quickstart

## ⚡ Quick Start (5 minutes)

### 1. Initialize a Project

```bash
# Using npm
npm run init my-booking-app

# OR running directly with Node
node init-expo.js my-booking-app
```

**Expected Output:**

```
🚀 Initializing Ultra-Modern Expo Project: my-booking-app...

──── STEP 1: Creating Project ────

──── STEP 2: Installing Dependencies ────

──── STEP 3: Creating Directory Structure ────
✅ Directory structure created

──── STEP 4: Generating Files ────
✅ src/api/query-client.ts
✅ src/store/useAuthStore.ts
✅ src/app/_layout.tsx
✅ src/app/index.tsx
✅ tailwind.config.js
✅ .env.example

──── ✅ SUCCESS ────
✨ Project initialized successfully!

To get started:
  1. cd my-booking-app
  2. npx expo start
```

### 2. Navigate into the Project

```bash
cd my-booking-app
```

### 3. Forge Your First Feature

```bash
# From the root of the my-booking-app project
node ../generate-feature.js generate feature booking
```

**Expected Output:**

```
🏗️ Building feature: Booking...

──── STEP 1: Creating Directory Structure ────

──── STEP 2: Generating Files ────
✅ types/index.ts
✅ services/booking.service.ts
✅ api/useBookings.ts
✅ store/useBookingStore.ts
✅ components/BookingCard.tsx
✅ BookingScreen.tsx
✅ index.ts

──── ✅ SUCCESS ────
✨ Feature "Booking" created successfully!

📚 Generated Structure:
  📁 types/        - TypeScript definitions
  📁 services/     - API Logic (Axios)
  📁 api/          - TanStack Query hooks
  📁 store/        - Zustand stores
  📁 components/   - UI components

💡 Ready to use:
  import { BookingScreen } from '@/features/booking';
```

### 4. Forge More Features

```bash
# Payment feature
node ../generate-feature.js generate feature payment

# Reviews feature
node ../generate-feature.js generate feature reviews

# Auth Setup feature
node ../generate-feature.js generate feature auth-setup
```

### 5. Verify the Structure

```bash
# List all created features
ls -la src/features/

# Final structure:
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
# │   └── (same structure)
# ├── reviews/
# │   └── (same structure)
# └── auth-setup/
#     └── (same structure)
```

## 📖 Usage Examples in Code

### Using a Feature Component

```typescript
// src/app/booking-page.tsx
import { BookingScreen } from '@/features/booking';

export default function BookingPage() {
  return <BookingScreen />;
}
```

### Using Hooks

```typescript
// Any component
import { useBookings, useCreateBooking } from '@/features/booking';

export function BookingList() {
  const { data: bookings, isLoading } = useBookings();
  const { mutate: createBooking } = useCreateBooking();

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        bookings?.map(booking => (
          <BookingCard key={booking.id} item={booking} />
        ))
      )}
    </View>
  );
}
```

### Using the Store

```typescript
import { useBookingStore } from '@/features/booking';

export function BookingFilter() {
  const { filter, setFilter } = useBookingStore();

  return (
    <TextInput
      value={filter}
      onChangeText={setFilter}
      placeholder="Filter bookings..."
    />
  );
}
```

### Calling Services Directly

```typescript
import { bookingService } from "@/features/booking/services/booking.service";

export async function fetchAllBookings() {
  try {
    const bookings = await bookingService.getAll();
    console.log("Bookings:", bookings);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## 🎨 Real-world App Integration

### Root Layout Structure

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
      <Text className="text-2xl font-bold mb-4">My Expo App</Text>
      <Button
        title="Go to Bookings"
        onPress={() => router.push('/booking')}
      />
      <Button
        title="Go to Payments"
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

## 🔌 API Client Configuration

```typescript
// src/lib/api-client.ts
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: parseInt(process.env.EXPO_PUBLIC_API_TIMEOUT || "30000"),
});

// Request Interceptor (e.g., adding Auth Token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🧪 Testing the Generator

```bash
# Quick test run
cd /tmp
node /path/to/expo/init-expo.js test-project
cd test-project
node /path/to/expo/generate-feature.js generate feature test-feature
ls -la src/features/test-feature/

# Expected files:
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

## 📝 Environment Setup

Configure your `.env` (automatically generated):

```bash
# .env / .env.local
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_TIMEOUT=30000
```

## 🚀 Useful Commands

```bash
# Inside the generated project root

# Start the dev server
npx expo start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run on Web
npx expo start --web

# Forge a new feature
node ../generate-feature.js generate feature my-feature

# Clean global caches
rm -rf node_modules .expo
npx expo install
```

## 🎯 Key Takeaways

✅ **Independent features** – Develop isolated modules in parallel.  
✅ **Strict consistency** – All feature files follow the same pattern.  
✅ **Ready-to-use** – Pre-generated types, hooks, and UI components.  
✅ **High Scalability** – Add as many features as your project needs.  
✅ **Modern Stack** – Built on TanStack Query, Zustand, NativeWind, and more.

## 🆘 Troubleshooting

### Error: "npx: command not found"

```bash
# Install Node.js from https://nodejs.org
# Verify: node -v && npm -v
```

### Error: "Cannot create project"

```bash
# Clean up and retry
rm -rf node_modules package-lock.json
npm install
npm run init
```

### Feature missing after generation

```bash
# Verify your current directory
pwd  # Should be /path/to/my-app
ls src/features/  # Should list your feature
```

## 💡 Next Steps

1. Read **[README.md](README.md)** for detailed documentation.
2. Read **[ARCHITECTURE.md](ARCHITECTURE.md)** to learn about the under-the-hood.
3. Read **[CONTRIBUTING.md](CONTRIBUTING.md)** to help us grow!
4. Start forging your own features! ⚔️

Ready to forge? Let's go! 🚀
