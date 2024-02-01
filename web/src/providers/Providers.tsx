'use client'

import { MemoriesProvider } from "@/contexts/MemoriesContext"
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode}) => {
    return <MemoriesProvider>{children}</MemoriesProvider>
};