/**
 * Hook para rastrear eventos do Facebook Pixel
 * Pixel ID: 2143719613143934
 */

export const useFacebookPixel = () => {
  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, data);
    }
  };

  const trackViewContent = (contentName: string, contentType: string = 'product') => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_type: contentType,
    });
  };

  const trackAddToCart = (value: number, currency: string = 'BRL') => {
    trackEvent('AddToCart', {
      value: value,
      currency: currency,
    });
  };

  const trackInitiateCheckout = (value: number, currency: string = 'BRL') => {
    trackEvent('InitiateCheckout', {
      value: value,
      currency: currency,
    });
  };

  const trackPurchase = (value: number, currency: string = 'BRL') => {
    trackEvent('Purchase', {
      value: value,
      currency: currency,
    });
  };

  const trackLead = () => {
    trackEvent('Lead');
  };

  const trackCustom = (eventName: string, data?: Record<string, any>) => {
    trackEvent(eventName, data);
  };

  return {
    trackEvent,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackLead,
    trackCustom,
  };
};
