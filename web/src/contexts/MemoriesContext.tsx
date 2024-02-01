import { createContext, FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Memory {
  id: string
  coverUrl: string
  except: string
  createdAt: string
  isPublic: boolean
}

interface MemoriesProviderProps {
  children: ReactNode;
}

interface MemoriesContextData {
  memories: Memory[],
  createMemory: (event: FormEvent<HTMLFormElement>) => Promise<void>
  deleteMemory: (id: string) => Promise<void> 
}

export const MemoriesContext = createContext<MemoriesContextData>(
  {} as MemoriesContextData
);

export function MemoriesProvider({ children }: MemoriesProviderProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const token = Cookies.get('token');
  const router = useRouter()

    const fetchMemories = useCallback(
        async () => {
        try {
            const response = await api.get('/memories', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            setMemories([...response.data]);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }, []
    )

    useEffect(() => {
        fetchMemories()
      }, [fetchMemories])

      async function createMemory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const fileToUpload = formData.get('coverUrl')

        let coverUrl = ''

        if (fileToUpload) {

            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('/upload', uploadFormData)

            coverUrl = uploadResponse.data.fileUrl
        }

        const response = await api.post(
            '/memories',
            {
              coverUrl,
              content: formData.get('content'),
              isPublic: formData.get('isPublic'),
          },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            },
        )
        
        setMemories((state) => [response.data, ...state]) 
        await fetchMemories()

        router.push('/')
    }
    
    async function deleteMemory(id: string) {
      try {
        const memory = memories.find(memory => memory.id === id);
        const fileName = memory ? memory.coverUrl.split('/').pop() : '';

        await api.delete(`/uploads/${fileName}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          },
        );

        const response = await api.delete(
          `/memories/${id}`,
            {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          },
        )
  
        setMemories((prevMemories) =>
          prevMemories.filter(
            (memory) => memory.id !== response.data.id,
          ),
        )
  
        fetchMemories()

      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

  return (
    <MemoriesContext.Provider value={{ 
      memories, 
      createMemory,
      deleteMemory,
       }}>
      {children}
    </MemoriesContext.Provider>
  );
}
