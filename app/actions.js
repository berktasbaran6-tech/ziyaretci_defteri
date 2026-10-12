'use server';

import { revalidatePath } from 'next/cache';
import { getDb } from '../lib/db';

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function getMessages() {
  if (!process.env.DATABASE_URL) {
    return {
      messages: [],
      error: 'DATABASE_URL ayarlanmamış.'
    };
  }

  try {
    const sql = getDb();
    await ensureTable(sql);

    const rows = await sql`
      SELECT id, name, message, created_at
      FROM messages
      ORDER BY created_at DESC
      LIMIT 100;
    `;

    return { messages: rows, error: null };
  } catch (error) {
    console.error('Mesajlar yüklenirken hata:', error);
    return {
      messages: [],
      error: 'Veritabanına bağlanılamadı: ' + (error.message || error)
    };
  }
}

export async function addMessage(formData) {
  const name = formData.get('name')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !message) {
    return { success: false, error: 'Lütfen adınızı ve mesajınızı eksiksiz doldurun.' };
  }

  try {
    const sql = getDb();
    await ensureTable(sql);

    await sql`
      INSERT INTO messages (name, message)
      VALUES (${name}, ${message});
    `;

    revalidatePath('/');
    return { success: true, error: null };
  } catch (error) {
    console.error('Mesaj kaydedilirken hata:', error);
    return { success: false, error: 'Kayıt başarısız: ' + (error.message || error) };
  }
}
