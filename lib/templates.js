const initTemplates = {
  appConfig: (projectName) => `import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: '${projectName}',
  slug: '${projectName}',
  scheme: '${projectName}',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  experiments: {
    typedRoutes: true,
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
    apiTimeout: process.env.EXPO_PUBLIC_API_TIMEOUT,
  },
};

export default config;`,

  queryClient: () => `import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const status = error instanceof Error && 'status' in error
          ? Number(error.status)
          : undefined;

        if (status && status >= 400 && status < 500) {
          return false;
        }

        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
    },
  },
});`,

  apiError: () => `export class ApiError extends Error {
  status: number | undefined;
  code: string | undefined;
  details: unknown;

  constructor(message: string, options: { status?: number; code?: string; details?: unknown } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }
}`,

  apiClient: () => `import axios, { AxiosError } from 'axios';
import { env } from '@/config/env';
import { ApiError } from './api-error';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: env.apiTimeout,
});

apiClient.interceptors.request.use((config) => {
  config.headers.set('X-Client', 'expo-forge');
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; code?: string }>) => {
    const status = error.response?.status;
    const payload = error.response?.data;
    const message = payload?.message || error.message || 'Request failed';

    return Promise.reject(
      new ApiError(message, {
        code: payload?.code,
        details: payload,
        status,
      })
    );
  }
);`,

  appProvider: () => `import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '@/api/query-client';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SafeAreaProvider>
  );
}`,

  envConfig: () => `import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? {};

const requiredString = (value: unknown, fallback: string) => {
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  return fallback;
};

const requiredNumber = (value: unknown, fallback: number) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const env = {
  apiTimeout: requiredNumber(extra.apiTimeout ?? process.env.EXPO_PUBLIC_API_TIMEOUT, 30000),
  apiUrl: requiredString(extra.apiUrl ?? process.env.EXPO_PUBLIC_API_URL, 'https://api.example.com'),
};`,

  sessionStore: () => `import { create } from 'zustand';

interface SessionUser {
  id: string;
  email: string;
  name?: string;
}

interface SessionState {
  accessToken: string | null;
  user: SessionUser | null;
  setSession: (session: { accessToken: string; user: SessionUser }) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  accessToken: null,
  user: null,
  setSession: ({ accessToken, user }) => set({ accessToken, user }),
  clearSession: () => set({ accessToken: null, user: null }),
}));`,

  themeTokens: () => `export const colors = {
  background: '#F8FAFC',
  border: '#E2E8F0',
  card: '#FFFFFF',
  danger: '#DC2626',
  muted: '#64748B',
  primary: '#2563EB',
  success: '#16A34A',
  text: '#0F172A',
  warning: '#D97706',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};`,

  screen: () => `import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { colors, spacing } from '@/theme/tokens';

interface ScreenProps extends ScrollViewProps {
  children: ReactNode;
}

export function Screen({ children, contentContainerStyle, ...props }: ScreenProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background, flex: 1 }}
      contentContainerStyle={[
        { gap: spacing.md, padding: spacing.md },
        contentContainerStyle,
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}`,

  loadingState: () => `import { ActivityIndicator, View } from 'react-native';
import { colors, spacing } from '@/theme/tokens';

export function LoadingState() {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', padding: spacing.lg }}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}`,

  emptyState: () => `import { Text, View } from 'react-native';
import { colors, spacing } from '@/theme/tokens';

interface EmptyStateProps {
  title: string;
  message?: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={{ alignItems: 'center', gap: spacing.sm, padding: spacing.xl }}>
      <Text selectable style={{ color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center' }}>
        {title}
      </Text>
      {message ? (
        <Text selectable style={{ color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center' }}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}`,

  rootLayout: () => `import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/providers/app-provider';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerLargeTitle: true,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      </Stack>
      <StatusBar style="auto" />
    </AppProvider>
  );
}`,

  homeScreen: () => `import { Text, View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { colors, radius, spacing } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen>
      <View
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.lg,
          borderWidth: 1,
          gap: spacing.sm,
          padding: spacing.lg,
        }}
      >
        <Text selectable style={{ color: colors.text, fontSize: 28, fontWeight: '800' }}>
          Expo Forge
        </Text>
        <Text selectable style={{ color: colors.muted, fontSize: 16, lineHeight: 24 }}>
          A production-oriented Expo foundation with routing, API access, server state,
          local state, environment config, and feature modules.
        </Text>
      </View>
    </Screen>
  );
}`,

  envExample: () => `EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_API_TIMEOUT=30000`,

  tsconfig: () => `{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}`,
};

const featureTemplates = {
  types: (nameUpper) => `export type ${nameUpper}Status = 'pending' | 'completed';

export interface ${nameUpper} {
  id: string;
  title: string;
  status: ${nameUpper}Status;
  createdAt: string;
  updatedAt: string;
}

export type Create${nameUpper}Input = {
  title: string;
};

export type Update${nameUpper}Input = Partial<Create${nameUpper}Input> & {
  status?: ${nameUpper}Status;
};`,

  service: (nameLower, nameUpper, nameCamel) => `import { apiClient } from '@/lib/api-client';
import { ${nameUpper}, Create${nameUpper}Input, Update${nameUpper}Input } from '../types';

const BASE_URL = '/${nameLower}';

export const ${nameCamel}Service = {
  async list(): Promise<${nameUpper}[]> {
    const { data } = await apiClient.get<${nameUpper}[]>(BASE_URL);
    return data;
  },

  async getById(id: string): Promise<${nameUpper}> {
    const { data } = await apiClient.get<${nameUpper}>(\`\${BASE_URL}/\${id}\`);
    return data;
  },

  async create(input: Create${nameUpper}Input): Promise<${nameUpper}> {
    const { data } = await apiClient.post<${nameUpper}>(BASE_URL, input);
    return data;
  },

  async update(id: string, input: Update${nameUpper}Input): Promise<${nameUpper}> {
    const { data } = await apiClient.patch<${nameUpper}>(\`\${BASE_URL}/\${id}\`, input);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(\`\${BASE_URL}/\${id}\`);
  },
};`,

  queries: (nameUpper, nameLower, nameCamel) => `import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ${nameCamel}Service } from '../services/${nameLower}.service';
import { Create${nameUpper}Input, Update${nameUpper}Input } from '../types';

export const ${nameCamel}Keys = {
  all: ['${nameLower}'] as const,
  detail: (id: string) => [...${nameCamel}Keys.all, id] as const,
};

export const use${nameUpper}List = () => {
  return useQuery({
    queryKey: ${nameCamel}Keys.all,
    queryFn: ${nameCamel}Service.list,
  });
};

export const use${nameUpper} = (id: string) => {
  return useQuery({
    queryKey: ${nameCamel}Keys.detail(id),
    queryFn: () => ${nameCamel}Service.getById(id),
    enabled: Boolean(id),
  });
};

export const useCreate${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Create${nameUpper}Input) => ${nameCamel}Service.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${nameCamel}Keys.all });
    },
  });
};

export const useUpdate${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Update${nameUpper}Input }) =>
      ${nameCamel}Service.update(id, input),
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: ${nameCamel}Keys.all });
      queryClient.setQueryData(${nameCamel}Keys.detail(item.id), item);
    },
  });
};

export const useDelete${nameUpper} = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ${nameCamel}Service.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${nameCamel}Keys.all });
    },
  });
};`,

  store: (nameUpper) => `import { create } from 'zustand';

interface ${nameUpper}State {
  filter: string;
  sortBy: 'date' | 'title';
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: 'date' | 'title') => void;
  reset: () => void;
}

export const use${nameUpper}Store = create<${nameUpper}State>((set) => ({
  filter: '',
  sortBy: 'date',
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  reset: () => set({ filter: '', sortBy: 'date' }),
}));`,

  card: (nameUpper) => `import { Pressable, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';
import { ${nameUpper} } from '../types';

interface ${nameUpper}CardProps {
  item: ${nameUpper};
  onPress: (id: string) => void;
}

export function ${nameUpper}Card({ item, onPress }: ${nameUpper}CardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(item.id)}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderRadius: radius.md,
        borderWidth: 1,
        gap: spacing.sm,
        padding: spacing.md,
      }}
    >
      <Text selectable style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>
        {item.title}
      </Text>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text selectable style={{ color: colors.muted, fontSize: 13 }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        <Text selectable style={{ color: item.status === 'completed' ? colors.success : colors.warning, fontSize: 13, fontWeight: '600' }}>
          {item.status}
        </Text>
      </View>
    </Pressable>
  );
}`,

  screen: (nameUpper, nameLower) => `import { FlatList, Text, View } from 'react-native';
import { EmptyState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { colors, spacing } from '@/theme/tokens';
import { use${nameUpper}List } from './api/use-${nameLower}';
import { ${nameUpper}Card } from './components/${nameLower}-card';
import { use${nameUpper}Store } from './store/use-${nameLower}-store';

export function ${nameUpper}Screen() {
  const { data: items = [], isLoading, error } = use${nameUpper}List();
  const { filter } = use${nameUpper}Store();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: spacing.lg }}>
        <Text selectable style={{ color: colors.danger, fontSize: 16, fontWeight: '700', textAlign: 'center' }}>
          Unable to load data.
        </Text>
      </View>
    );
  }

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={filteredItems}
      renderItem={({ item }) => (
        <${nameUpper}Card item={item} onPress={(id) => console.log('Navigate to:', id)} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: spacing.md, padding: spacing.md }}
      ListEmptyComponent={
        <EmptyState title="No items found" message="Try changing your filters or creating a new item." />
      }
    />
  );
}`,

  index: (nameUpper, nameLower) => `export * from './api/use-${nameLower}';
export * from './store/use-${nameLower}-store';
export * from './types';
export { ${nameUpper}Screen } from './${nameLower}-screen';`,
};

module.exports = {
  initTemplates,
  featureTemplates,
};
