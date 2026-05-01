'use server';

import { GSCClient } from '@/lib/gsc/client';
import { createClient } from '@/lib/supabase';

export async function getGSCPerformance(startDate: string, endDate: string) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user.id) {
    throw new Error('Not authenticated');
  }

  const client = new GSCClient(data.session.user.id);
  return client.getPerformance('https://www.ronenamoscpa.co.il/', startDate, endDate);
}

export async function getGSCTopQueries(
  startDate: string,
  endDate: string,
  limit: number = 10
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user.id) {
    throw new Error('Not authenticated');
  }

  const client = new GSCClient(data.session.user.id);
  return client.getTopQueries('https://www.ronenamoscpa.co.il/', startDate, endDate, limit);
}

export async function getGSCTopPages(
  startDate: string,
  endDate: string,
  limit: number = 10
) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user.id) {
    throw new Error('Not authenticated');
  }

  const client = new GSCClient(data.session.user.id);
  return client.getTopPages('https://www.ronenamoscpa.co.il/', startDate, endDate, limit);
}

export async function getGSCIndexStatus() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user.id) {
    throw new Error('Not authenticated');
  }

  const client = new GSCClient(data.session.user.id);
  return client.getIndexStatus('https://www.ronenamoscpa.co.il/');
}
