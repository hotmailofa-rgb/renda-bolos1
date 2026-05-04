import { useState, useEffect } from 'react';
import { Check, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useFacebookPixel } from "../hooks/useFacebookPixel";
/**
 * Página de Checkout com Order Bumper
 * Oferece desconto para o mesmo produto (R$ 24,90 → R$ 19,90)
 * Inclui seção de FAQ para tirar dúvidas dos clientes
 */

export default function Checkout() {
  const [step, setStep] = useState<'main' | 'bumper' | 'redirect'>('main');
  const [bumpAccepted, setBumpAccepted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { trackEvent, trackInitiateCheckout } = useFacebookPixel();

  useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Checkout_Page',
      content_type: 'product',
    });
  }, []);

  const handleMainPurchase = () => {
    // Rastrear compra principal
    trackInitiateCheckout(24.90, 'BRL');
    trackEvent('Purchase', {
      value: 24.90,
      currency: 'BRL',
      content_name: 'Curso Completo de Bolos',
    });

    // Ir para Order Bumper
    setStep('bumper');
  };

  const handleBumpAccept = () => {
    setBumpAccepted(true);
    
    // Rastrear aceitar order bumper
    trackEvent('Purchase', {
      value: 19.90,
      currency: 'BRL',
      content_name: 'Curso Completo de Bolos - Desconto Order Bumper',
    });

    // Redirecionar para Hotmart com order bumper e desconto de saída
    setTimeout(() => {
      window.location.href = 'https://pay.hotmart.com/E78386330G?checkoutMode=10&bid=1777271226219&fromExitPopup=true&offDiscount=Descobrimento+do+Brasil&utm_source=order_bumper&utm_medium=accepted';
    }, 1500);
  };

  const handleBumpReject = () => {
    // Rastrear rejeitar order bumper
    trackEvent('Purchase', {
      value: 24.90,
      currency: 'BRL',
      content_name: 'Curso Completo de Bolos - Sem Order Bumper',
    });

    // Redirecionar para Hotmart sem order bumper
    setTimeout(() => {
      window.location.href = 'https://pay.hotmart.com/E78386330G?utm_source=order_bumper&utm_medium=rejected';
    }, 1000);
  };

  const faqItems = [
    {
      pergunta: 'Como recebo o acesso ao curso?',
      resposta: 'Após a compra, você receberá um email com seu link de acesso em poucos minutos. Basta clicar e fazer login para começar imediatamente. O acesso é vitalício e você pode acessar de qualquer dispositivo!',
    },
    {
      pergunta: 'Preciso de equipamentos profissionais?',
      resposta: 'Não! As receitas foram desenvolvidas para serem feitas em uma cozinha comum, com equipamentos que você já tem em casa. Nada de batedeiras caras ou profissionais. Você só precisa dos ingredientes básicos!',
    },
    {
      pergunta: 'Tenho experiência zero em cozinha. Posso fazer?',
      resposta: 'Sim! O método foi criado especificamente para iniciantes. Todas as receitas têm passo a passo detalhado com fotos. Você vai conseguir fazer bolos perfeitos desde a primeira vez!',
    },
    {
      pergunta: 'Qual é a garantia?',
      resposta: 'Você tem 7 dias de garantia. Se não gostar do curso, devolvemos 100% do seu dinheiro, sem perguntas. Sem risco! Queremos que você fique satisfeito com sua compra.',
    },
    {
      pergunta: 'Quanto tempo leva para começar a vender?',
      resposta: 'Muitos alunos começam a vender no mesmo dia que aprendem a receita! O método é tão simples que você pode fazer o primeiro bolo em poucas horas e vender para amigos e família.',
    },
    {
      pergunta: 'Posso vender para quantas pessoas quiser?',
      resposta: 'Sim! Não há limite. Você pode vender para amigos, família, colegas de trabalho, redes sociais... O método funciona para qualquer volume. Muitos alunos vendem 20-30 bolos por semana!',
    },
    {
      pergunta: 'Recebo suporte se tiver dúvidas?',
      resposta: 'Sim! Você tem acesso a suporte por email. Se tiver qualquer dúvida sobre as receitas ou o método, basta enviar um email que responderemos em até 24 horas.',
    },
    {
      pergunta: 'Posso acessar o curso offline?',
      resposta: 'Sim! Você pode baixar as aulas e acessar offline. Também enviamos um PDF com todas as receitas que você pode imprimir e levar para a cozinha.',
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    trackEvent('Checkout_FAQ_Expanded', {
      faq_index: index,
      faq_question: faqItems[index].pergunta,
    });
  };

  if (step === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="max-w-2xl mx-auto p-4">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white text-center">
              <h1 className="text-3xl font-black mb-2">Resumo da Compra</h1>
              <p className="text-green-100">Você está prestes a acessar o melhor método para ganhar dinheiro com bolos</p>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Curso Completo de Bolos</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">3 Receitas Campeãs que Vendem Todos os Dias</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Passo a Passo Detalhado com Fotos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Planilha de Custos e Lucro</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Acesso Vitalício ao Curso</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">Suporte por Email</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center mb-6">
                  <p className="text-gray-600 mb-2">Investimento Único:</p>
                  <p className="text-4xl font-black text-green-600">R$ 24,90</p>
                  <p className="text-sm text-gray-500 mt-2">Acesso imediato • 7 dias de garantia</p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleMainPurchase}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-black text-lg py-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                >
                  CONTINUAR PARA PAGAMENTO
                  <ChevronRight className="inline ml-2" size={20} />
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Você será redirecionado para a plataforma segura de pagamento Hotmart
                </p>
              </div>

              {/* Security Badge */}
              <div className="border-t pt-6 text-center">
                <p className="text-sm text-gray-600">🔒 Pagamento 100% Seguro | Garantia de 7 Dias</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white text-center">
              <h2 className="text-2xl font-black mb-2">⭐ O Que Nossos Clientes Dizem</h2>
              <p className="text-purple-100">Veja os resultados reais de quem já começou</p>
            </div>

            <div className="p-6 space-y-4">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Maria Silva</p>
                    <p className="text-sm text-gray-600">São Paulo, SP</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2 italic">"Fiz o primeiro bolo hoje e já vendi 4 pedaços aqui no prédio! Nunca imaginei que seria tão fácil."</p>
                <p className="text-green-700 font-bold text-sm">💰 Ganhou R$ 120 no primeiro dia</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    J
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">João Santos</p>
                    <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2 italic">"O método é realmente simples! Minha mãe está usando e já tem 5 clientes fixos pedindo bolo toda semana."</p>
                <p className="text-green-700 font-bold text-sm">💰 Renda extra de R$ 600 por mês</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-100 border-2 border-yellow-300 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Ana Costa</p>
                    <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-2 italic">"Tentei várias receitas antes, mas nenhuma dava certo. Com esse método, todos os bolos saem perfeitos!"</p>
                <p className="text-green-700 font-bold text-sm">💰 Vendendo 30 bolos por semana</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white text-center">
              <h2 className="text-2xl font-black mb-2">❓ Dúvidas Frequentes</h2>
              <p className="text-blue-100">Confira as respostas para as perguntas mais comuns</p>
            </div>

            <div className="p-6 space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-bold text-gray-900 transition-colors text-left"
                  >
                    <span className="text-sm md:text-base">{item.pergunta}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-blue-600 transition-transform flex-shrink-0 ml-2 ${expandedFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 py-4 bg-blue-50 text-gray-700 border-t border-gray-300 text-sm md:text-base">
                      {item.resposta}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FAQ Footer */}
            <div className="bg-blue-50 px-6 py-4 text-center border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Ainda tem dúvidas? Entre em contato: <strong>suporte@rendasimplesagora.com.br</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'bumper') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-white text-center">
              <div className="text-4xl mb-2">🎁</div>
              <h1 className="text-3xl font-black mb-2">ESPERA! OFERTA ESPECIAL!</h1>
              <p className="text-yellow-100 text-lg">Você recebeu um desconto exclusivo por tempo limitado</p>
            </div>

            {/* Offer Details */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Aproveite o Mesmo Curso com 20% de Desconto!
              </h2>

              <p className="text-gray-700 mb-6">
                Você está prestes a fazer uma excelente compra. Mas antes, queremos oferecer algo ainda melhor:
              </p>

              {/* Price Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Original Price */}
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm mb-2">Preço Normal</p>
                  <p className="text-2xl font-bold text-gray-400 line-through">R$ 24,90</p>
                </div>

                {/* Discounted Price */}
                <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-700 text-sm font-bold mb-2">🎉 DESCONTO 20%</p>
                  <p className="text-3xl font-black text-green-600">R$ 19,90</p>
                  <p className="text-xs text-green-600 mt-1">Economize R$ 5,00</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
                <p className="font-bold text-yellow-800 mb-4">✨ Você Recebe:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Acesso Imediato ao Curso Completo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">3 Receitas Campeãs + Bônus Exclusivo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Planilha de Custos Premium</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-green-600 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700">Acesso Vitalício + Atualizações Grátis</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBumpAccept}
                  disabled={bumpAccepted}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-black text-lg py-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bumpAccepted ? '✓ PROCESSANDO...' : 'SIM! QUERO O DESCONTO 🎉'}
                </button>

                <button
                  onClick={handleBumpReject}
                  className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Não, obrigado. Continuar sem desconto
                </button>
              </div>

              {/* Timer */}
              <p className="text-center text-xs text-gray-500 mt-6">
                ⏱️ Esta oferta especial expira em alguns minutos
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="text-center text-sm text-gray-600">
            <p>🔒 Pagamento Seguro | ✓ Garantia de 7 Dias | 📧 Suporte por Email</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
