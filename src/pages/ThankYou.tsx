import { useEffect, useState } from 'react';
import { CheckCircle, Mail, Clock, BookOpen, Zap } from 'lucide-react';
import { useFacebookPixel } from '../hooks/useFacebookPixel';

export default function ThankYou() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Proteção caso o hook falhe
  let trackEvent: any = () => {};
  try {
    const pixel = useFacebookPixel();
    trackEvent = pixel?.trackEvent || (() => {});
  } catch (e) {
    console.log('Pixel não carregado');
  }

  useEffect(() => {
    // Evento de compra (não quebra se falhar)
    trackEvent('Purchase', {
      value: 24.9,
      currency: 'BRL',
      product: 'Método 3 Bolos Simples para Renda Extra',
    });

    setShowConfetti(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="fixed animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                fontSize: `${20 + Math.random() * 20}px`,
              }}
            >
              {['🎉', '🎊', '🎈', '🎁', '⭐'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <main className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
              <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          <h1 className="font-black text-4xl md:text-5xl text-gray-900 mb-4">
            Parabéns! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-2">
            Sua compra foi realizada com sucesso!
          </p>
          <p className="text-lg text-gray-600">
            Você agora tem acesso ao Método 3 Bolos Simples para Renda Extra
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-green-500">
          <h2 className="font-black text-2xl text-gray-900 mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-green-500" />
            Próximos Passos
          </h2>

          <div className="space-y-4">
            {[
              {
                title: 'Verifique seu Email',
                desc: 'Um email com seu acesso foi enviado. Verifique spam também.',
              },
              {
                title: 'Clique no Link de Acesso',
                desc: 'Abra o email e entre na área de aluno.',
              },
              {
                title: 'Comece Agora',
                desc: 'Inicie pelo primeiro módulo e aplique.',
              },
            ].map((item, i) => (
              <div className="flex gap-4" key={i}>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://pay.hotmart.com/E78386330G"
            className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition"
          >
            Acessar Minha Conta
          </a>
        </div>
      </main>
    </div>
  );
}