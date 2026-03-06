/**
 * Templates - Tous les fichiers templates par domaine
 */

/**
 * Templates pour l'initialisation d'un projet Expo
 */
const initTemplates = {
  queryClient: () => `import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});`,

  apiClient: () => `import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for auth
apiClient.interceptors.request.use(
  (config) => {
    // You can inject your auth token here from Zustand or SecureStore
    // const token = useAuthStore.getState().token;
    // if (token) config.headers.Authorization = \`Bearer \${token}\`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);`,

  authStore: () => `import { create } from 'zustand';

interface AuthState {
  user: any | null;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));`,

  rootLayout: () => `import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '../api/query-client';

// Import global CSS for NativeWind
import "../../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}`,

  globalCSS: () => `@tailwind base;
@tailwind components;
@tailwind utilities;`,

  homeScreen: () => `import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">Expo 2026 Stack</Text>
      <Text className="text-gray-500 mt-2">TanStack Query • Zustand • NativeWind</Text>
    </View>
  );
}`,

  tailwindConfig: () => `module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`,

  envExample: () => `EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_TIMEOUT=30000`,

  tsconfig: () => `{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,

  packageJson: () => `{
  "name": "my-modern-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}`,
};

/**
 * Templates pour la génération de features
 * Utilise des fonctions pour interpoler les variables
 */
const featureTemplates = {
  types: (nameUpper) => `export type ${nameUpper} = {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: string;
};

export type Create${nameUpper}DTO = Pick<${nameUpper}, 'title'>;

export type Update${nameUpper}DTO = Partial<${nameUpper}>;`,

  service: (nameLower, nameUpper) => `import { apiClient } from '@/lib/api-client';
import { ${nameUpper}, Create${nameUpper}DTO, Update${nameUpper}DTO } from '../types';

const BASE_URL = '/${nameLower}';

export const ${nameLower}Service = {
  getAll: async (): Promise<${nameUpper}[]> => {
    const { data } = await apiClient.get(BASE_URL);
    return data;
  },

  getById: async (id: string): Promise<${nameUpper}> => {
    const { data } = await apiClient.get(\`\${BASE_URL}/\${id}\`);
    return data;
  },

  create: async (payload: Create${nameUpper}DTO): Promise<${nameUpper}> => {
    const { data } = await apiClient.post(BASE_URL, payload);
    return data;
  },

  update: async (id: string, payload: Update${nameUpper}DTO): Promise<${nameUpper}> => {
    const { data } = await apiClient.patch(\`\${BASE_URL}/\${id}\`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(\`\${BASE_URL}/\${id}\`);
  },
};`,

  queries: (nameUpper, nameLower) => `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ${nameLower}Service } from '../services/${nameLower}.service';
import { Create${nameUpper}DTO, Update${nameUpper}DTO } from '../types';

const QUERY_KEY = ['${nameLower}'];

export const use${nameUpper}s = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: ${nameLower}Service.getAll,
  });
};

export const use${nameUpper} = (id: string) => {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => ${nameLower}Service.getById(id),
  });
};

export const useCreate${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ${nameLower}Service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useUpdate${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Update${nameUpper}DTO }) =>
      ${nameLower}Service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useDelete${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ${nameLower}Service.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};`,

  store: (nameUpper) => `import { create } from 'zustand';

interface ${nameUpper}State {
  filter: string;
  sortBy: 'date' | 'title';
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: 'date' | 'title') => void;
}

export const use${nameUpper}Store = create<${nameUpper}State>((set) => ({
  filter: '',
  sortBy: 'date',
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
}));`,

  card: (nameUpper) => `import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ${nameUpper} } from '../types';

interface Props {
  item: ${nameUpper};
  onPress: (id: string) => void;
}

export const ${nameUpper}Card = ({ item, onPress }: Props) => (
  <Pressable
    onPress={() => onPress(item.id)}
    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
  >
    <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
    <View className="flex-row justify-between items-center mt-2">
      <Text className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text className={\`text-xs font-medium \${item.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}\`}>
        {item.status}
      </Text>
    </View>
  </Pressable>
);`,

  screen: (nameUpper, nameLower) => `import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { use${nameUpper}s } from './api/use${nameUpper}s';
import { ${nameUpper}Card } from './components/${nameUpper}Card';
import { use${nameUpper}Store } from './store/use${nameUpper}Store';

export const ${nameUpper}Screen = () => {
  const { data: items, isLoading, error } = use${nameUpper}s();
  const { filter } = use${nameUpper}Store();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 font-semibold">Erreur lors du chargement</Text>
      </View>
    );
  }

  const filteredItems = items?.filter((i) =>
    i.title.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <${nameUpper}Card
            item={item}
            onPress={(id) => console.log('Navigate to:', id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">Aucun ${nameLower} trouvé</Text>
        }
      />
    </View>
  );
};`,

  index: (nameUpper) => `export * from './store/use${nameUpper}Store';
export { use${nameUpper}s, useCreate${nameUpper}, useUpdate${nameUpper}, useDelete${nameUpper} } from './api/use${nameUpper}s';
export { ${nameUpper}Screen } from './${nameUpper}Screen';`,
};

module.exports = {
  initTemplates,
  featureTemplates,
};
