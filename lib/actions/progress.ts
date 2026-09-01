'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { ContentType } from '@/lib/academy-data';

export interface UserProgressRecord {
  contentType: ContentType;
  contentSlug: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string | null;
}

/**
 * Fetch all content progress records for the currently authenticated user.
 * Returns an empty array if user is not logged in.
 */
export async function getUserProgress(): Promise<UserProgressRecord[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from('user_content_progress')
      .select('content_type, content_slug, status, completed_at')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching user progress:', error);
      return [];
    }

    return (data || []).map((row) => ({
      contentType: row.content_type as ContentType,
      contentSlug: row.content_slug,
      status: row.status,
      completedAt: row.completed_at,
    }));
  } catch (err) {
    console.error('Failed to get user progress:', err);
    return [];
  }
}

/**
 * Toggle or update the progress status of a specific content item for the logged-in user.
 */
export async function updateContentProgress(
  contentType: ContentType,
  contentSlug: string,
  newStatus: 'not_started' | 'in_progress' | 'completed'
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const completedAt = newStatus === 'completed' ? new Date().toISOString() : null;

    const { error } = await supabase
      .from('user_content_progress')
      .upsert(
        {
          user_id: user.id,
          content_type: contentType,
          content_slug: contentSlug,
          status: newStatus,
          completed_at: completedAt,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,content_type,content_slug',
        }
      );

    if (error) {
      console.error('Error updating content progress:', error);
      return { success: false, error: error.message };
    }

    revalidatePath('/academy');
    revalidatePath(`/academy/paths`);

    return { success: true };
  } catch (err) {
    console.error('Failed to update content progress:', err);
    return { success: false, error: 'Server error' };
  }
}
