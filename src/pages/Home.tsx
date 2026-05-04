import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFacebookPixel } from "../hooks/useFacebookPixel";
import { useSalesNotifications } from "../hooks/useSalesNotifications";
import { useScrollTracking } from "../hooks/useScrollTracking";
import { SalesNotification } from '@/components/SalesNotification';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ActiveUsersStatus } from '@/components/ActiveUsersStatus';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import type { Testimonial } from '@/components/TestimonialCarousel';

/**
 * Landing Page - 3 Bolos Simples para Renda Extra
 * Adaptado do HTML original para React + Tailwind
 * Com rastreamento de eventos do Facebook Pixel
 * E notificações de vendas em tempo real para prova social
 */

export default function Home() {
  const [bolosPerWeek, setBolosPerWeek] = useState(20);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { trackEvent, trackViewContent, trackInitiateCheckout } = useFacebookPixel();
  const { notifications, removeNotification } = useSalesNotifications();
  useScrollTracking();

  // Rastrear visualização de página ao carregar
  useEffect(() => {
    trackViewContent('Landing Page - 3 Bolos Simples');
  }, []);

  // Cálculo de lucro mensal
  const lucroUnitario = 30; // R$ por bolo
  const lucroMensal = bolosPerWeek * 4 * lucroUnitario;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    // Rastrear quando FAQ é expandido
    trackEvent('FAQ_Expanded', {
      faq_index: index,
      faq_question: faqItems[index].pergunta,
    });
  };

  const handleCtaClick = () => {
    // Rastrear clique no CTA
    trackInitiateCheckout(24.90, 'BRL');
    trackEvent('CTA_Clicked', {
      button_text: 'QUERO COMEÇAR AGORA',
      page_section: 'header',
    });
  };

  const handleCalculatorChange = (value: number) => {
    setBolosPerWeek(value);
    // Rastrear uso da calculadora
    trackEvent('Calculator_Used', {
      bolos_per_week: value,
      monthly_profit: value * 4 * lucroUnitario,
    });
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Maria Silva',
      city: 'São Paulo, SP',
      image: 'https://i.pravatar.cc/150?img=1&u=maria',
      text: 'Fiz o primeiro bolo hoje e já vendi 4 pedaços aqui no prédio! Nunca imaginei que seria tão fácil.',
      rating: 5,
      result: 'Ganhou R$ 120 no primeiro dia'
    },
    {
      id: 2,
      name: 'João Santos',
      city: 'Rio de Janeiro, RJ',
      image: 'https://i.pravatar.cc/150?img=2&u=joao',
      text: 'O método é realmente simples! Minha mãe está usando e já tem 5 clientes fixos pedindo bolo toda semana.',
      rating: 5,
      result: 'Renda extra de R$ 600 por mês'
    },
    {
      id: 3,
      name: 'Ana Costa',
      city: 'Belo Horizonte, MG',
      image: 'https://i.pravatar.cc/150?img=3&u=ana',
      text: 'Tentei várias receitas antes, mas nenhuma dava certo. Com esse método, todos os bolos saem perfeitos!',
      rating: 5,
      result: 'Vendendo 30 bolos por semana'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      city: 'Brasília, DF',
      image: 'https://i.pravatar.cc/150?img=4&u=carlos',
      text: 'Comecei sem experiência e agora tenho uma lista de espera! As receitas são incríveis.',
      rating: 5,
      result: 'Lucro de R$ 1.200 no primeiro mês'
    },
    {
      id: 5,
      name: 'Fernanda Martins',
      city: 'Salvador, BA',
      image: 'https://i.pravatar.cc/150?img=5&u=fernanda',
      text: 'O melhor investimento que fiz! Já recuperei o valor do curso e estou ganhando muito mais.',
      rating: 5,
      result: 'ROI de 500% em 2 meses'
    }
  ];

  const faqItems = [
    {
      pergunta: 'Como recebo o acesso ao curso?',
      resposta: 'O acesso é enviado imediatamente para o seu e-mail após a confirmação do pagamento pela Hotmart.'
    },
    {
      pergunta: 'Preciso de equipamentos profissionais?',
      resposta: 'Não. As receitas são adaptadas para utensílios básicos de quem quer começar a vender bolos em casa.'
    },
    {
      pergunta: 'Tenho experiência zero em cozinha. Posso fazer?',
      resposta: 'Sim! O método é feito para iniciantes. Cada receita tem um passo a passo detalhado e fácil de seguir.'
    },
    {
      pergunta: 'Qual é a garantia?',
      resposta: 'Você tem 7 dias de garantia 100% de reembolso. Se não gostar, devolvemos seu dinheiro sem perguntas.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Status Bar com Contador em Tempo Real */}
      <ActiveUsersStatus initialCount={147} />

      {/* Notificações de Vendas */}
      <div className="fixed bottom-4 left-4 z-30 space-y-2 pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <SalesNotification
              notification={notification}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto bg-white shadow-2xl relative z-10">
        
        {/* Header Section */}
        <header className="p-6 md:p-10 border-b border-gray-200 text-center">
          <h1 className="font-black text-2xl md:text-3xl text-red-500 uppercase mb-4 leading-tight">
            O Método Simples para Bolos que Vendem Todos os Dias
          </h1>
          <p className="text-gray-700 mb-6">
            Aprenda a criar sua renda extra sem precisar de batedeiras caras ou experiência prévia.
          </p>

          {/* Video Box */}
          <div 
            className="bg-black rounded-2xl p-2 shadow-2xl mb-6"
            onPlay={() => trackEvent('Video_Started')}
          >
            <video 
              poster="https://rendasimplesagora.com.br/cvsl1.png"
              controls
              className="w-full rounded-xl"
              aria-label="Vídeo de apresentação do método para vender bolos"
            >
              <source src="https://rendasimplesagora.com.br/vsl2.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>

          {/* CTA Button */}
          <a
            href="/checkout"
            onClick={handleCtaClick}
            className="inline-block w-full md:w-auto bg-gradient-to-b from-green-400 to-green-600 text-white font-black text-xl py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            title="Comprar método de bolos para vender agora"
          >
            QUERO COMEÇAR AGORA! 🚀
          </a>
        </header>

        {/* Calculadora Section */}
        <section className="p-6 md:p-10 border-b border-gray-200 text-center">
          <div className="bg-yellow-50 border-4 border-dashed border-yellow-400 rounded-2xl p-8">
            <h2 className="font-black text-2xl md:text-3xl text-yellow-900 mb-4">
              Simule seu Lucro Mensal com Bolos 💰
            </h2>
            <p className="text-gray-700 mb-4">
              Se você vender <b className="text-green-600">{bolosPerWeek}</b> bolos por semana:
            </p>

            {/* Slider */}
            <input 
              type="range"
              min="5"
              max="100"
              value={bolosPerWeek}
              onChange={(e) => handleCalculatorChange(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600 mb-4"
              aria-label="Quantidade de bolos para vender por semana"
            />
            <div className="flex justify-between text-sm text-gray-600 mb-6">
              <span>5 bolos</span>
              <span>100 bolos</span>
            </div>

            <p className="text-gray-700 mb-2">Seu lucro mensal estimado será de:</p>
            <div 
              className="text-5xl md:text-6xl font-black text-green-600 mb-4"
              aria-live="polite"
            >
              R$ {lucroMensal.toLocaleString('pt-BR')}
            </div>
            <small className="text-gray-600">
              Baseado em uma margem média de lucro por unidade de bolo simples.
            </small>
          </div>
        </section>

        {/* Problemas Section */}
        <section className="p-6 md:p-10 border-b border-gray-200 text-center">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 font-bold text-red-900">
            ⚠️ PARE DE JOGAR INGREDIENTES NO LIXO!
          </div>

          <img 
            src="https://rendasimplesagora.com.br/feio.png" 
            alt="Exemplo de bolo que não cresceu"
            className="w-full rounded-2xl mb-6 shadow-lg"
          />

          <div className="space-y-3">
            <div className="bg-gray-900 text-white font-black p-4 rounded-lg border-l-4 border-red-500 text-left">
              ❌ BOLO QUE NÃO CRESCE OU MURCHA
            </div>
            <div className="bg-gray-900 text-white font-black p-4 rounded-lg border-l-4 border-red-500 text-left">
              ❌ RECEITAS DE INTERNET QUE NÃO FUNCIONAM
            </div>
            <div className="bg-gray-900 text-white font-black p-4 rounded-lg border-l-4 border-red-500 text-left">
              ❌ MEDO DE COMEÇAR E PERDER DINHEIRO
            </div>
          </div>
        </section>

        {/* Solução Section */}
        <section className="p-6 md:p-10 border-b border-gray-200 bg-green-50">
          <h2 className="font-black text-2xl md:text-3xl text-green-900 mb-6 text-center">
            A Solução Definitiva para Vender Bolos
          </h2>

          <img 
            src="https://rendasimplesagora.com.br/simples.png" 
            alt="Bolo simples perfeito"
            className="w-full rounded-2xl mb-6 shadow-lg"
          />

          <div className="space-y-4 text-left max-w-md mx-auto">
            <p className="text-gray-800">
              ✅ <b>3 Receitas Campeãs:</b> As que mais geram renda extra no Brasil.
            </p>
            <p className="text-gray-800">
              ✅ <b>Passo a Passo:</b> O segredo dos bolos para vender sem erro.
            </p>
            <p className="text-gray-800">
              ✅ <b>Renda Imediata:</b> Lucro real com baixo investimento inicial.
            </p>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="p-6 md:p-10 border-b border-gray-200">
          <h2 className="font-black text-2xl md:text-3xl text-gray-900 mb-8 text-center">
            Resultados Reais de Nossos Alunos
          </h2>

          <TestimonialCarousel testimonials={testimonials} autoPlayInterval={6000} />
        </section>

        {/* FAQ Section */}
        <section className="p-6 md:p-10 border-b border-gray-200">
          <h2 className="font-black text-2xl md:text-3xl text-gray-900 mb-6 text-center">
            Dúvidas Frequentes (FAQ)
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 py-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between font-bold text-gray-900 transition-colors text-left"
                >
                  <span>{item.pergunta}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-green-600 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedFaq === index && (
                  <div className="px-4 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                    {item.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="p-6 md:p-10 text-center bg-gradient-to-b from-green-500 to-green-600 text-white" id="final_cta">
          <h2 className="font-black text-2xl md:text-3xl mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Acesso imediato ao curso com 7 dias de garantia
          </p>
          <a 
            href="https://pay.hotmart.com/E78386330G"
            onClick={handleCtaClick}
            className="inline-block bg-white text-green-600 font-black text-xl py-4 px-8 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            QUERO COMEÇAR AGORA! 🚀
          </a>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-6 text-center text-sm" id="footer">
          <p className="text-gray-400">© 2024 Renda Simples Agora. Todos os direitos reservados.</p>
          <p className="text-gray-500 mt-2">Método Renda Simples para Bolos | Aprenda a Ganhar Dinheiro em Casa</p>
          <p className="text-gray-600 text-xs mt-4">Contador de usuários ativos atualizado em tempo real</p>
        </footer>

      </main>
    </div>
  );
}
