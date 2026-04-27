export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          xp: number
          level: number
          streak_days: number
          streak_last_date: string | null
          avatar_url: string | null
          school_group: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          xp?: number
          level?: number
          streak_days?: number
          streak_last_date?: string | null
          avatar_url?: string | null
          school_group?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          xp?: number
          level?: number
          streak_days?: number
          streak_last_date?: string | null
          avatar_url?: string | null
          school_group?: string | null
          created_at?: string
        }
      }
      species: {
        Row: {
          id: string
          name: string
          scientific_name: string | null
          category: 'native' | 'non-native' | 'invasive'
          carbon_coeff_kg_per_cm: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          scientific_name?: string | null
          category?: 'native' | 'non-native' | 'invasive'
          carbon_coeff_kg_per_cm?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          scientific_name?: string | null
          category?: 'native' | 'non-native' | 'invasive'
          carbon_coeff_kg_per_cm?: number
          created_at?: string
        }
      }
      trees: {
        Row: {
          id: string
          user_id: string
          name: string
          species_id: string | null
          lat: number | null
          lng: number | null
          planted_at: string | null
          stage: 'seed' | 'seedling' | 'sapling' | 'tree'
          is_public: boolean
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species_id?: string | null
          lat?: number | null
          lng?: number | null
          planted_at?: string | null
          stage?: 'seed' | 'seedling' | 'sapling' | 'tree'
          is_public?: boolean
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species_id?: string | null
          lat?: number | null
          lng?: number | null
          planted_at?: string | null
          stage?: 'seed' | 'seedling' | 'sapling' | 'tree'
          is_public?: boolean
          notes?: string | null
          created_at?: string
        }
      }
      tree_logs: {
        Row: {
          id: string
          tree_id: string
          logged_at: string
          height_cm: number | null
          canopy_cm: number | null
          health: 'excellent' | 'good' | 'fair' | 'poor'
          notes: string | null
          photo_url: string | null
          xp_awarded: number
          created_at: string
        }
        Insert: {
          id?: string
          tree_id: string
          logged_at?: string
          height_cm?: number | null
          canopy_cm?: number | null
          health?: 'excellent' | 'good' | 'fair' | 'poor'
          notes?: string | null
          photo_url?: string | null
          xp_awarded?: number
          created_at?: string
        }
        Update: {
          id?: string
          tree_id?: string
          logged_at?: string
          height_cm?: number | null
          canopy_cm?: number | null
          health?: 'excellent' | 'good' | 'fair' | 'poor'
          notes?: string | null
          photo_url?: string | null
          xp_awarded?: number
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
