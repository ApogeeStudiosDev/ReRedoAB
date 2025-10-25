export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["admin_role"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["admin_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["admin_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      availability_exceptions: {
        Row: {
          created_at: string | null
          date: string
          id: string
          is_available: boolean | null
          reason: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          is_available?: boolean | null
          reason?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          is_available?: boolean | null
          reason?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      booking_limits: {
        Row: {
          created_at: string | null
          daily_limit: number | null
          id: string
          monthly_limit: number | null
          updated_at: string | null
          weekly_limit: number | null
        }
        Insert: {
          created_at?: string | null
          daily_limit?: number | null
          id?: string
          monthly_limit?: number | null
          updated_at?: string | null
          weekly_limit?: number | null
        }
        Update: {
          created_at?: string | null
          daily_limit?: number | null
          id?: string
          monthly_limit?: number | null
          updated_at?: string | null
          weekly_limit?: number | null
        }
        Relationships: []
      }
      booking_templates: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          questions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          questions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          questions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          additional_info: string | null
          booking_date: string | null
          booking_template_id: string | null
          challenges: string[]
          client_id: string | null
          company_name: string
          company_size: string
          consultation_type: string | null
          contact_name: string
          created_at: string | null
          current_situation: string[]
          email: string
          estimated_value: number | null
          follow_up_date: string | null
          id: string
          industry: string
          internal_notes: string | null
          meeting_link: string | null
          meeting_notes: string | null
          organization_number: string
          phone: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          status: Database["public"]["Enums"]["booking_status"] | null
          updated_at: string | null
        }
        Insert: {
          additional_info?: string | null
          booking_date?: string | null
          booking_template_id?: string | null
          challenges: string[]
          client_id?: string | null
          company_name: string
          company_size: string
          consultation_type?: string | null
          contact_name: string
          created_at?: string | null
          current_situation: string[]
          email: string
          estimated_value?: number | null
          follow_up_date?: string | null
          id?: string
          industry: string
          internal_notes?: string | null
          meeting_link?: string | null
          meeting_notes?: string | null
          organization_number: string
          phone?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
        }
        Update: {
          additional_info?: string | null
          booking_date?: string | null
          booking_template_id?: string | null
          challenges?: string[]
          client_id?: string | null
          company_name?: string
          company_size?: string
          consultation_type?: string | null
          contact_name?: string
          created_at?: string | null
          current_situation?: string[]
          email?: string
          estimated_value?: number | null
          follow_up_date?: string | null
          id?: string
          industry?: string
          internal_notes?: string | null
          meeting_link?: string | null
          meeting_notes?: string | null
          organization_number?: string
          phone?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_booking_template_id_fkey"
            columns: ["booking_template_id"]
            isOneToOne: false
            referencedRelation: "booking_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_interactions: {
        Row: {
          booking_id: string | null
          client_id: string
          content: string | null
          created_at: string | null
          created_by: string | null
          id: string
          interaction_date: string | null
          interaction_type: Database["public"]["Enums"]["client_interaction_type"]
          metadata: Json | null
          subject: string | null
        }
        Insert: {
          booking_id?: string | null
          client_id: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type: Database["public"]["Enums"]["client_interaction_type"]
          metadata?: Json | null
          subject?: string | null
        }
        Update: {
          booking_id?: string | null
          client_id?: string
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          interaction_date?: string | null
          interaction_type?: Database["public"]["Enums"]["client_interaction_type"]
          metadata?: Json | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_interactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_interactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_notes: {
        Row: {
          client_id: string
          created_at: string | null
          created_by: string | null
          id: string
          is_private: boolean | null
          note_content: string
          priority: Database["public"]["Enums"]["priority_level"] | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_private?: boolean | null
          note_content: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_private?: boolean | null
          note_content?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_notes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          company_name: string
          company_size: string | null
          country: string | null
          created_at: string | null
          id: string
          industry: string | null
          last_interaction_date: string | null
          organization_number: string
          postal_code: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone: string | null
          status: Database["public"]["Enums"]["client_status"] | null
          tags: string[] | null
          total_bookings: number | null
          total_value: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_name: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          last_interaction_date?: string | null
          organization_number: string
          postal_code?: string | null
          primary_contact_email: string
          primary_contact_name: string
          primary_contact_phone?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          tags?: string[] | null
          total_bookings?: number | null
          total_value?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_name?: string
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          last_interaction_date?: string | null
          organization_number?: string
          postal_code?: string | null
          primary_contact_email?: string
          primary_contact_name?: string
          primary_contact_phone?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          tags?: string[] | null
          total_bookings?: number | null
          total_value?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string | null
          html_content: string
          id: string
          name: string
          subject: string
          text_content: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          html_content: string
          id?: string
          name: string
          subject: string
          text_content?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          html_content?: string
          id?: string
          name?: string
          subject?: string
          text_content?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          buffer_minutes: number | null
          created_at: string | null
          days_of_week: number[] | null
          description: string | null
          duration_minutes: number | null
          end_time: string
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          name: string | null
          start_time: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          buffer_minutes?: number | null
          created_at?: string | null
          days_of_week?: number[] | null
          description?: string | null
          duration_minutes?: number | null
          end_time: string
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name?: string | null
          start_time: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          buffer_minutes?: number | null
          created_at?: string | null
          days_of_week?: number[] | null
          description?: string | null
          duration_minutes?: number | null
          end_time?: string
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          name?: string | null
          start_time?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_book_on_date: {
        Args: { check_date: string }
        Returns: boolean
      }
      can_book_on_date_time: {
        Args: { check_date: string; check_time: string }
        Returns: boolean
      }
      get_available_time_slots: {
        Args: { check_date: string }
        Returns: {
          start_time: string
          end_time: string
          is_available: boolean
        }[]
      }
      get_booking_analytics: {
        Args: { days_back?: number }
        Returns: {
          total_bookings: number
          pending_bookings: number
          confirmed_bookings: number
          completed_bookings: number
          cancelled_bookings: number
          conversion_rate: number
          avg_response_time: unknown
        }[]
      }
      get_booking_counts: {
        Args: { start_date: string; end_date: string }
        Returns: {
          date: string
          count: number
        }[]
      }
      get_client_analytics: {
        Args: { days_back?: number }
        Returns: {
          total_clients: number
          new_clients: number
          active_clients: number
          conversion_rate: number
          avg_bookings_per_client: number
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      log_admin_activity: {
        Args: {
          p_admin_user_id: string
          p_action_type: string
          p_entity_type: string
          p_entity_id?: string
          p_old_values?: Json
          p_new_values?: Json
          p_description?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      admin_role: "admin" | "super_admin"
      booking_status:
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "in_progress"
        | "rescheduled"
        | "no_show"
        | "follow_up_needed"
      client_interaction_type:
        | "email"
        | "phone"
        | "meeting"
        | "note"
        | "booking_created"
        | "booking_updated"
        | "booking_cancelled"
        | "follow_up"
      client_status:
        | "prospect"
        | "active"
        | "completed"
        | "inactive"
        | "churned"
      priority_level: "low" | "medium" | "high" | "urgent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["admin", "super_admin"],
      booking_status: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "in_progress",
        "rescheduled",
        "no_show",
        "follow_up_needed",
      ],
      client_interaction_type: [
        "email",
        "phone",
        "meeting",
        "note",
        "booking_created",
        "booking_updated",
        "booking_cancelled",
        "follow_up",
      ],
      client_status: ["prospect", "active", "completed", "inactive", "churned"],
      priority_level: ["low", "medium", "high", "urgent"],
    },
  },
} as const
