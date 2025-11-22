# Prisma + React Query Entegrasyon Rehberi

Bu rehber, Electron uygulamanıza Prisma (SQLite) ve React Query entegrasyonunu adım adım açıklar. Uygulama offline çalışacak şekilde yapılandırılmıştır.

## İçindekiler

- [Prisma + React Query Entegrasyon Rehberi](#prisma--react-query-entegrasyon-rehberi)
  - [İçindekiler](#i̇çindekiler)
  - [1. Gerekli Paketler](#1-gerekli-paketler)
  - [2. Prisma Schema Oluşturma](#2-prisma-schema-oluşturma)
    - [Prisma Komutları](#prisma-komutları)
  - [3. Main Process'te Prisma Kurulumu](#3-main-processte-prisma-kurulumu)
  - [4. Preload Script'i Güncelleme](#4-preload-scripti-güncelleme)
  - [5. TypeScript Tipleri](#5-typescript-tipleri)
  - [6. React Query Kurulumu](#6-react-query-kurulumu)
  - [7. API Helper Functions](#7-api-helper-functions)
  - [8. React Query Hooks](#8-react-query-hooks)
  - [9. Kullanım Örnekleri](#9-kullanım-örnekleri)
    - [9.1. Users Sayfası Örneği](#91-users-sayfası-örneği)
  - [Önemli Notlar](#önemli-notlar)
    - [Offline Çalışma](#offline-çalışma)
    - [Güvenlik](#güvenlik)
    - [React Query Loading States](#react-query-loading-states)
    - [Optimistic Updates](#optimistic-updates)
  - [Dosya Yapısı](#dosya-yapısı)
  - [Yaygın Sorunlar ve Çözümleri](#yaygın-sorunlar-ve-çözümleri)
    - [Veritabanı Konumu](#veritabanı-konumu)
    - [Prisma Client Generate](#prisma-client-generate)
    - [Migration Sorunları](#migration-sorunları)
  - [Ek Kaynaklar](#ek-kaynaklar)

---

## 1. Gerekli Paketler

```bash
pnpm add prisma @prisma/client @tanstack/react-query
pnpm add -D prisma @tanstack/react-query-devtools
```

---

## 2. Prisma Schema Oluşturma

`prisma/schema.prisma` dosyası oluşturun:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Prisma Komutları

```bash
# Prisma Client'ı generate et
npx prisma generate

# Migration oluştur
npx prisma migrate dev --name init

# (Opsiyonel) Prisma Studio'yu çalıştırmak için
npx prisma studio
```

---

## 3. Main Process'te Prisma Kurulumu

`src/main.ts` dosyasını güncelleyin:

```typescript
import path from 'node:path';
import { app, BrowserWindow, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import { PrismaClient } from '@prisma/client';

// Prisma Client instance
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(app.getPath('userData'), 'database.db')}`
    }
  }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Electron Learning',
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Güvenlik için
      nodeIntegration: false, // Güvenlik için
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' });
};

// IPC Handlers - User işlemleri
ipcMain.handle('db:user:create', async (_, data: { email: string; name?: string }) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:user:findMany', async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:user:findUnique', async (_, id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true }
    });
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:user:update', async (_, { id, data }: { id: number; data: any }) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:user:delete', async (_, id: number) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// IPC Handlers - Post işlemleri
ipcMain.handle('db:post:create', async (_, data: { title: string; content?: string; authorId: number }) => {
  try {
    const post = await prisma.post.create({
      data,
      include: { author: true }
    });
    return { success: true, data: post };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:post:findMany', async () => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: posts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Uygulama kapanırken Prisma'yı kapat
app.on('before-quit', async () => {
  await prisma.$disconnect();
});
```

---

## 4. Preload Script'i Güncelleme

`src/preload.ts` dosyasını güncelleyin:

```typescript
import { contextBridge, ipcRenderer } from 'electron';

// Prisma işlemleri için tip güvenli API
contextBridge.exposeInMainWorld('electronAPI', {
  // User işlemleri
  user: {
    create: (data: { email: string; name?: string }) => 
      ipcRenderer.invoke('db:user:create', data),
    findMany: () => 
      ipcRenderer.invoke('db:user:findMany'),
    findUnique: (id: number) => 
      ipcRenderer.invoke('db:user:findUnique', id),
    update: (id: number, data: any) => 
      ipcRenderer.invoke('db:user:update', { id, data }),
    delete: (id: number) => 
      ipcRenderer.invoke('db:user:delete', id),
  },
  // Post işlemleri
  post: {
    create: (data: { title: string; content?: string; authorId: number }) => 
      ipcRenderer.invoke('db:post:create', data),
    findMany: () => 
      ipcRenderer.invoke('db:post:findMany'),
  },
});
```

---

## 5. TypeScript Tipleri

`src/vite-env.d.ts` dosyasına ekleyin:

```typescript
/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    user: {
      create: (data: { email: string; name?: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
      findMany: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
      findUnique: (id: number) => Promise<{ success: boolean; data?: any; error?: string }>;
      update: (id: number, data: any) => Promise<{ success: boolean; data?: any; error?: string }>;
      delete: (id: number) => Promise<{ success: boolean; error?: string }>;
    };
    post: {
      create: (data: { title: string; content?: string; authorId: number }) => Promise<{ success: boolean; data?: any; error?: string }>;
      findMany: () => Promise<{ success: boolean; data?: any[]; error?: string }>;
    };
  };
}
```

---

## 6. React Query Kurulumu

`src/app.tsx` dosyasını güncelleyin:

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { router } from './router';

// QueryClient instance - offline için önemli ayarlar
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Offline olduğunda bile cache'den okusun
      staleTime: 5 * 60 * 1000, // 5 dakika
      cacheTime: 10 * 60 * 1000, // 10 dakika
      retry: false, // Offline olduğunda tekrar denemesin
      refetchOnWindowFocus: false, // Pencere odaklandığında yeniden fetch etmesin
      refetchOnReconnect: false, // Yeniden bağlandığında otomatik fetch etmesin
    },
    mutations: {
      retry: false, // Mutation'lar için retry yapma
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
      {/* React Query DevTools - sadece development'ta göster */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
```

---

## 7. API Helper Functions

`src/lib/api.ts` dosyası oluşturun:

```typescript
// Prisma modelleri için tipler
export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// User API Functions
export const userAPI = {
  create: async (data: { email: string; name?: string }): Promise<User> => {
    const response = await window.electronAPI.user.create(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Kullanıcı oluşturulamadı');
    }
    return response.data;
  },

  findMany: async (): Promise<User[]> => {
    const response = await window.electronAPI.user.findMany();
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Kullanıcılar getirilemedi');
    }
    return response.data;
  },

  findUnique: async (id: number): Promise<User> => {
    const response = await window.electronAPI.user.findUnique(id);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Kullanıcı bulunamadı');
    }
    return response.data;
  },

  update: async (id: number, data: Partial<{ email: string; name: string }>): Promise<User> => {
    const response = await window.electronAPI.user.update(id, data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Kullanıcı güncellenemedi');
    }
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    const response = await window.electronAPI.user.delete(id);
    if (!response.success) {
      throw new Error(response.error || 'Kullanıcı silinemedi');
    }
  },
};

// Post API Functions
export const postAPI = {
  create: async (data: { title: string; content?: string; authorId: number }): Promise<Post> => {
    const response = await window.electronAPI.post.create(data);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Post oluşturulamadı');
    }
    return response.data;
  },

  findMany: async (): Promise<Post[]> => {
    const response = await window.electronAPI.post.findMany();
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Postlar getirilemedi');
    }
    return response.data;
  },
};
```

---

## 8. React Query Hooks

`src/hooks/useUsers.ts` dosyası oluşturun:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI, User } from '../lib/api';

// Query Keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Tüm kullanıcıları getir
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => userAPI.findMany(),
    // Offline mod için önemli: hata olsa bile göster (eski cache'den)
    placeholderData: (previousData) => previousData,
  });
}

// Tek bir kullanıcıyı getir
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userAPI.findUnique(id),
    enabled: !!id, // ID yoksa query çalışmasın
    placeholderData: (previousData) => previousData,
  });
}

// Kullanıcı oluştur
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.create,
    onSuccess: () => {
      // Kullanıcılar listesini invalidate et (yeniden fetch et)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    // Optimistic update için
    onMutate: async (newUser) => {
      // İptal edilen query'leri beklet
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });

      // Önceki snapshot'ı al
      const previousUsers = queryClient.getQueryData<User[]>(userKeys.lists());

      // Optimistic update yap
      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) => [
        ...old,
        {
          id: Date.now(), // Geçici ID
          email: newUser.email,
          name: newUser.name || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User,
      ]);

      return { previousUsers };
    },
    // Hata durumunda geri al
    onError: (err, newUser, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.lists(), context.previousUsers);
      }
    },
  });
}

// Kullanıcı güncelle
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<{ email: string; name: string }> }) =>
      userAPI.update(id, data),
    onSuccess: (updatedUser) => {
      // Liste ve detay query'lerini güncelle
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(updatedUser.id) });
    },
  });
}

// Kullanıcı sil
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAPI.delete,
    onSuccess: () => {
      // Kullanıcılar listesini invalidate et
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    // Optimistic update
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() });
      const previousUsers = queryClient.getQueryData<User[]>(userKeys.lists());

      queryClient.setQueryData<User[]>(userKeys.lists(), (old = []) =>
        old.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },
    onError: (err, userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(userKeys.lists(), context.previousUsers);
      }
    },
  });
}
```

`src/hooks/usePosts.ts` dosyası oluşturun:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postAPI, Post } from '../lib/api';

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: () => postAPI.findMany(),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
```

---

## 9. Kullanım Örnekleri

### 9.1. Users Sayfası Örneği

`src/routes/index.tsx` dosyası örneği:

```typescript
import { createFileRoute } from '@tanstack/react-router';
import { useUsers, useCreateUser, useDeleteUser, useUpdateUser } from '../hooks/useUsers';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: UsersPage,
});

function UsersPage() {
  const { data: users, isLoading, error, refetch } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [formData, setFormData] = useState({ email: '', name: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ email: '', name: '' });

  // Kullanıcı oluştur
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync({
        email: formData.email,
        name: formData.name || undefined,
      });
      setFormData({ email: '', name: '' });
    } catch (err) {
      console.error('Kullanıcı oluşturma hatası:', err);
    }
  };

  // Kullanıcı güncelle
  const handleUpdate = async (id: number) => {
    try {
      await updateUser.mutateAsync({
        id,
        data: {
          email: editData.email,
          name: editData.name,
        },
      });
      setEditingId(null);
      setEditData({ email: '', name: '' });
    } catch (err) {
      console.error('Kullanıcı güncelleme hatası:', err);
    }
  };

  // Kullanıcı sil
  const handleDelete = async (id: number) => {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      try {
        await deleteUser.mutateAsync(id);
      } catch (err) {
        console.error('Kullanıcı silme hatası:', err);
      }
    }
  };

  if (isLoading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Hata: {error instanceof Error ? error.message : 'Bilinmeyen hata'}
        <button onClick={() => refetch()} className="ml-4 underline">
          Tekrar dene
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Kullanıcılar</h1>

      {/* Kullanıcı Oluşturma Formu */}
      <form onSubmit={handleCreate} className="border p-4 rounded space-y-2">
        <h2 className="font-semibold">Yeni Kullanıcı Ekle</h2>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border px-2 py-1 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="İsim (opsiyonel)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border px-2 py-1 rounded flex-1"
          />
          <button
            type="submit"
            disabled={createUser.isPending}
            className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            {createUser.isPending ? 'Ekleniyor...' : 'Ekle'}
          </button>
        </div>
        {createUser.isError && (
          <p className="text-red-500 text-sm">
            {createUser.error instanceof Error ? createUser.error.message : 'Hata oluştu'}
          </p>
        )}
      </form>

      {/* Kullanıcı Listesi */}
      <div className="space-y-2">
        {users?.length === 0 ? (
          <p className="text-gray-500">Henüz kullanıcı yok</p>
        ) : (
          users?.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              {editingId === user.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleUpdate(user.id)}
                    disabled={updateUser.isPending}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {updateUser.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditData({ email: '', name: '' });
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    İptal
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="font-semibold">{user.name || 'İsimsiz'}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user._count && (
                      <p className="text-xs text-gray-500">
                        {user._count.posts} post
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(user.id);
                        setEditData({ email: user.email, name: user.name || '' });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={deleteUser.isPending}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                    >
                      {deleteUser.isPending ? 'Siliniyor...' : 'Sil'}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Loading ve Error State Göstergeleri */}
      {(createUser.isPending || updateUser.isPending || deleteUser.isPending) && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
          İşlem yapılıyor...
        </div>
      )}
    </div>
  );
}
```

---

## Önemli Notlar

### Offline Çalışma

- SQLite yerel bir dosya tabanlı veritabanıdır, internet bağlantısı gerektirmez
- React Query cache mekanizması sayesinde offline durumda bile eski veriler gösterilebilir
- `placeholderData` ayarı ile hata durumunda bile önceki cache'den veri gösterilir

### Güvenlik

- `contextIsolation: true` ve `nodeIntegration: false` ayarları ile güvenlik sağlanır
- Renderer process'ten direkt Node.js API'lerine erişim yoktur
- Tüm veritabanı işlemleri IPC üzerinden main process'te yapılır

### React Query Loading States

- `isLoading`: İlk yükleme sırasında `true`
- `isFetching`: Herhangi bir fetch işlemi sırasında `true`
- `isPending`: Mutation işlemi sırasında `true`
- `isError`: Hata durumunda `true`
- `error`: Hata objesi

### Optimistic Updates

- Optimistic update kullanarak kullanıcı deneyimi iyileştirilebilir
- İşlem hemen UI'da gösterilir, başarısız olursa geri alınır
- `onMutate`, `onError` ve `onSuccess` callback'leri ile yönetilir

---

## Dosya Yapısı

```
electron-learning/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── main.ts              # Main process + IPC handlers
│   ├── preload.ts           # Preload script + contextBridge
│   ├── app.tsx              # React Query Provider
│   ├── vite-env.d.ts        # TypeScript tipleri
│   ├── lib/
│   │   └── api.ts           # API helper functions
│   ├── hooks/
│   │   ├── useUsers.ts      # User hooks
│   │   └── usePosts.ts      # Post hooks
│   └── routes/
│       └── index.tsx        # Kullanım örneği
└── package.json
```

---

## Yaygın Sorunlar ve Çözümleri

### Veritabanı Konumu

Prisma veritabanı `app.getPath('userData')` klasörüne kaydedilir. Bu konum işletim sistemine göre değişir:
- macOS: `~/Library/Application Support/electron-learning/`
- Windows: `%APPDATA%/electron-learning/`
- Linux: `~/.config/electron-learning/`

### Prisma Client Generate

Prisma schema değiştiğinde mutlaka `npx prisma generate` komutunu çalıştırın.

### Migration Sorunları

İlk migration'ı oluştururken:
```bash
npx prisma migrate dev --name init
```

Bu komut hem migration dosyası oluşturur hem de veritabanını initialize eder.

---

## Ek Kaynaklar

- [Prisma Documentation](https://www.prisma.io/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Electron IPC Guide](https://www.electronjs.org/docs/latest/tutorial/ipc)

