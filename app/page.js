import { getMessages } from './actions';
import MessageForm from '../components/MessageForm';

export const revalidate = 0;

export default async function HomePage() {
  const { messages, error } = await getMessages();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
          <span>✨ Full-Stack Web Ödevi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Canlı Ziyaretçi Defteri
        </h1>
        <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
          Bu uygulama modern web teknolojileri ile geliştirilmiş olup gerçek zamanlı olarak veritabanına kayıt yapmaktadır.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-medium">
            ⚡ Next.js (Node.js)
          </span>
          <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium">
            🐘 Neon DB (PostgreSQL)
          </span>
          <span className="px-3 py-1 bg-slate-800 text-white rounded-lg text-xs font-medium">
            🐙 GitHub
          </span>
          <span className="px-3 py-1 bg-black text-white rounded-lg text-xs font-medium">
            ▲ Vercel
          </span>
        </div>
      </header>

      <section className="mb-12">
        <MessageForm />
      </section>

      {error && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-900 text-sm">
          <div className="font-bold flex items-center gap-2 mb-1">
            <span>⚙️ Kurulum Bilgisi:</span>
          </div>
          <p>{error}</p>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Ziyaretçi Notları ({messages?.length || 0})
          </h2>
          <span className="text-xs text-slate-500">Neon DB&apos;den canlı çekildi</span>
        </div>

        {(!messages || messages.length === 0) && !error ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-4xl mb-2">📬</p>
            <p className="text-slate-600 font-medium">Henüz hiç mesaj bırakılmamış.</p>
            <p className="text-sm text-slate-400 mt-1">Yukarıdaki formu kullanarak ilk notu siz bırakın!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">
                      {item.name}
                    </span>
                  </div>
                  <time className="text-xs text-slate-400">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString('tr-TR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Yeni'}
                  </time>
                </div>
                <p className="text-slate-700 text-sm whitespace-pre-wrap pl-10">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400">
        Bu proje Node.js, Next.js, Neon DB, GitHub ve Vercel kullanılarak geliştirilmiştir.
      </footer>
    </main>
  );
}
