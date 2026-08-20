import { create } from 'zustand';

export type BuilderState = {
  occasion: string;
  venue: string;
  stage: string;
  flowers: string;
  backdrop: string;
  entrance: string;
  ceiling: string;
  lighting: string;
  eventDetails: {
    date: string;
    location: string;
    guests: string;
    contact: string;
    requirements: string;
  };
  totalPrice: number;
  setField: (field: keyof Omit<BuilderState, 'setField' | 'updatePrice'>, value: any) => void;
  updatePrice: () => void;
};

// Mock prices for options
export const PRICES: Record<string, Record<string, number>> = {
  stage: {
    "Minimalist": 15000,
    "Traditional Floral": 35000,
    "Royal Extravaganza": 75000,
    "Modern Glass": 50000,
  },
  flowers: {
    "Marigold": 8000,
    "Roses & Orchids": 18000,
    "Premium Exotic Mix": 30000,
    "Artificial Premium": 12000,
  },
  backdrop: {
    "Fabric Drapes": 5000,
    "Floral Wall": 25000,
    "LED Screen": 40000,
    "Fairy Lights": 8000,
  },
  entrance: {
    "Simple Arch": 7000,
    "Floral Tunnel": 22000,
    "Royal Gates": 45000,
  },
  ceiling: {
    "None": 0,
    "Hanging Florals": 18000,
    "Fabric Canopy": 12000,
    "Fairy Light Ceiling": 15000,
  },
  lighting: {
    "Warm Ambient": 5000,
    "Dynamic LED": 15000,
    "Premium Chandeliers": 30000,
  }
};

const BASE_PRICE = 10000;

export const useBuilderStore = create<BuilderState>((set, get) => ({
  occasion: '',
  venue: '',
  stage: '',
  flowers: '',
  backdrop: '',
  entrance: '',
  ceiling: '',
  lighting: '',
  eventDetails: {
    date: '',
    location: '',
    guests: '',
    contact: '',
    requirements: '',
  },
  totalPrice: BASE_PRICE,
  
  setField: (field, value) => {
    set({ [field]: value });
    get().updatePrice();
  },
  
  updatePrice: () => {
    const state = get();
    let newPrice = BASE_PRICE;
    
    if (state.stage) newPrice += PRICES.stage[state.stage] || 0;
    if (state.flowers) newPrice += PRICES.flowers[state.flowers] || 0;
    if (state.backdrop) newPrice += PRICES.backdrop[state.backdrop] || 0;
    if (state.entrance) newPrice += PRICES.entrance[state.entrance] || 0;
    if (state.ceiling) newPrice += PRICES.ceiling[state.ceiling] || 0;
    if (state.lighting) newPrice += PRICES.lighting[state.lighting] || 0;
    
    set({ totalPrice: newPrice });
  }
}));
