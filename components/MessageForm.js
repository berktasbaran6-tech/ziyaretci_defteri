'use client';

import { useState, useTransition } from 'react';
import { addMessage } from '../app/actions';

export default function MessageForm() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({ error: null, success: false });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFeedback({ error: null, success: false });

    startTransition(async () => {
      const result = await addMessage(formData);
      if (result.success) {
        form.reset();
        setFeedback({ error: null, success: true });
        setTimeout(() => setFeedback((f) => ({ ...f, success: false })), 4000);
      } else {
        setFeedback({ error: result.error, success: false });
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Deftere Bir Not Bırakın ✍️</h2>
      <p className="text-sm text-slate-500 mb-6">
        Adınızı ve iletmek istediğiniz mesajı girip anında Neon DB veritabanına kaydedin.
      </p>

      {feedback.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ {feedback.error}
        </div>
      )}

      {feedback.success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl">
          🎉 Mesajınız Neon DB veritabanına başarıyla kaydedildi!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
            Adınız / Ünvanınız
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Örn: Ahmet Hoca veya Öğrenci Adı"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={3}
            placeholder="Örn: Harika bir proje olmuş, eline sağlık! 100/100"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isPending}
          translate="no"
          className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl transition duration-200 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 text-base notranslate cursor-pointer"
        >
          {isPending ? (
            <span>Kaydediliyor...</span>
          ) : (
            <>
              <span>Mesajı Kaydet</span>
              <span>🚀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
