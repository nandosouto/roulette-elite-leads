
// Utility to get client information
export const getClientInfo = () => {
  // Generate a unique identifier based on user agent and other factors
  const externalId = hashString(
    navigator.userAgent + 
    navigator.language + 
    (new Date().getTimezoneOffset() / 60).toString()
  );
  
  // Get UTM parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get('utm_source') || '';
  const utm_medium = urlParams.get('utm_medium') || '';
  const utm_campaign = urlParams.get('utm_campaign') || '';
  const utm_content = urlParams.get('utm_content') || '';
  const utm_term = urlParams.get('utm_term') || '';
  
  // Get screen resolution
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  
  // Get browser language
  const language = navigator.language;
  
  // Get timezone offset
  const timezoneOffset = new Date().getTimezoneOffset() / 60;
  
  // Get referrer
  const referrer = document.referrer;
  
  // Get user agent
  const userAgent = navigator.userAgent;
  
  return {
    external_id: externalId,
    screenResolution,
    language,
    timezoneOffset,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    userAgent
  };
};

// Generate session ID
export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Generate event ID
export const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Simple string hashing function
export function hashString(str: string): string {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}

// Get Facebook Browser ID (fbp) and Click ID (fbc)
export const getFacebookIds = () => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return '';
  };
  
  const fbp = getCookie('_fbp') || `fb.1.${Date.now()}.${Math.random().toString().substring(2)}`;
  const fbc = getCookie('_fbc') || getCookie('fbclid') || '';
  
  return { fbp, fbc };
};

// Track lead event
export const trackLeadEvent = (telegramLink: string) => {
  const clientInfo = getClientInfo();
  const { fbp, fbc } = getFacebookIds();
  const eventId = generateEventId();
  const sessionId = generateSessionId();
  
  // Store session ID in localStorage
  localStorage.setItem('session_id', sessionId);
  
  // Track with Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'lead',
      event_category: 'Engagement',
      event_label: 'Telegram_Click',
      screen_resolution: clientInfo.screenResolution,
      language: clientInfo.language,
      timezone_offset: clientInfo.timezoneOffset,
      referrer: clientInfo.referrer,
      utm_source: clientInfo.utm_source,
      utm_medium: clientInfo.utm_medium,
      utm_campaign: clientInfo.utm_campaign,
      utm_content: clientInfo.utm_content,
      utm_term: clientInfo.utm_term,
      external_id: clientInfo.external_id,
      event_id: eventId
    });
    
    // Track purchase event
    window.dataLayer.push({
      event: 'purchase',
      event_category: 'Conversion',
      event_label: 'Telegram_Purchase',
      value: 1.99,
      currency: 'BRL',
      screen_resolution: clientInfo.screenResolution,
      language: clientInfo.language,
      timezone_offset: clientInfo.timezoneOffset,
      referrer: clientInfo.referrer,
      utm_source: clientInfo.utm_source,
      utm_medium: clientInfo.utm_medium,
      utm_campaign: clientInfo.utm_campaign,
      utm_content: clientInfo.utm_content,
      utm_term: clientInfo.utm_term,
      external_id: clientInfo.external_id,
      event_id: eventId,
      session_id: sessionId
    });
  }
  
  // Track with Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'lead', {
      event_category: 'Engagement',
      event_label: 'Telegram_Click',
      screen_resolution: clientInfo.screenResolution,
      language: clientInfo.language,
      timezone_offset: clientInfo.timezoneOffset,
      referrer: clientInfo.referrer,
      utm_source: clientInfo.utm_source,
      utm_medium: clientInfo.utm_medium,
      utm_campaign: clientInfo.utm_campaign,
      utm_content: clientInfo.utm_content,
      utm_term: clientInfo.utm_term,
      event_id: eventId
    });
    
    // Track purchase event
    window.gtag('event', 'purchase', {
      event_category: 'Conversion',
      event_label: 'Telegram_Purchase',
      value: 1.99,
      currency: 'BRL',
      screen_resolution: clientInfo.screenResolution,
      language: clientInfo.language,
      timezone_offset: clientInfo.timezoneOffset,
      referrer: clientInfo.referrer,
      utm_source: clientInfo.utm_source,
      utm_medium: clientInfo.utm_medium,
      utm_campaign: clientInfo.utm_campaign,
      utm_content: clientInfo.utm_content,
      utm_term: clientInfo.utm_term,
      event_id: eventId,
      session_id: sessionId
    });
  }
  
  // Track with Facebook Pixel
  if (window.fbq) {
    // Lead event
    window.fbq('track', 'Lead', {
      event_name: 'Lead',
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: window.location.href,
      user_data: {
        client_user_agent: clientInfo.userAgent,
        fbp: fbp,
        fbc: fbc,
        external_id: clientInfo.external_id
      },
      custom_data: {
        screen_resolution: clientInfo.screenResolution,
        language: clientInfo.language,
        timezone_offset: clientInfo.timezoneOffset,
        referrer: clientInfo.referrer,
        utm_source: clientInfo.utm_source,
        utm_medium: clientInfo.utm_medium,
        utm_campaign: clientInfo.utm_campaign,
        utm_content: clientInfo.utm_content,
        utm_term: clientInfo.utm_term,
        content_type: 'lead',
        content_name: 'Telegram Lead Roleta',
        content_category: 'Gambling',
        content_ids: ['grupo_free_roleta_lead']
      }
    });
    
    // Purchase event
    window.fbq('track', 'Purchase', {
      event_name: 'Purchase',
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: window.location.href,
      value: 1.99,
      currency: 'BRL',
      user_data: {
        client_user_agent: clientInfo.userAgent,
        fbp: fbp,
        fbc: fbc,
        external_id: clientInfo.external_id
      },
      custom_data: {
        screen_resolution: clientInfo.screenResolution,
        language: clientInfo.language,
        timezone_offset: clientInfo.timezoneOffset,
        referrer: clientInfo.referrer,
        utm_source: clientInfo.utm_source,
        utm_medium: clientInfo.utm_medium,
        utm_campaign: clientInfo.utm_campaign,
        utm_content: clientInfo.utm_content,
        utm_term: clientInfo.utm_term,
        content_type: 'purchase',
        content_name: 'Telegram Purchase Roleta',
        content_category: 'Gambling',
        content_ids: ['grupo_free_roleta_purchase'],
        session_id: sessionId,
        browser_type: navigator.appName,
        device_type: navigator.platform,
        scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      }
    });
  }
};

// Track page view and scroll depth
export const initializeAnalytics = () => {
  const pageStartTime = Date.now();
  const sessionId = generateSessionId();
  localStorage.setItem('session_id', sessionId);
  
  // Track scroll depth
  const handleScroll = () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent >= 25 && !localStorage.getItem('scroll_25')) {
      localStorage.setItem('scroll_25', 'true');
      if (window.gtag) window.gtag('event', 'scroll_depth', { depth: '25%' });
    }
    
    if (scrollPercent >= 50 && !localStorage.getItem('scroll_50')) {
      localStorage.setItem('scroll_50', 'true');
      if (window.gtag) window.gtag('event', 'scroll_depth', { depth: '50%' });
    }
    
    if (scrollPercent >= 75 && !localStorage.getItem('scroll_75')) {
      localStorage.setItem('scroll_75', 'true');
      if (window.gtag) window.gtag('event', 'scroll_depth', { depth: '75%' });
    }
    
    if (scrollPercent >= 90 && !localStorage.getItem('scroll_90')) {
      localStorage.setItem('scroll_90', 'true');
      if (window.gtag) window.gtag('event', 'scroll_depth', { depth: '90%' });
    }
  };
  
  // Track time on page
  const trackTimeOnPage = (duration: string) => {
    if (window.gtag) window.gtag('event', 'time_on_page', { duration });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Track time on page at intervals
  setTimeout(() => trackTimeOnPage('30s'), 30000);
  setTimeout(() => trackTimeOnPage('60s'), 60000);
  setTimeout(() => trackTimeOnPage('120s'), 120000);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Add type declarations for global objects
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}
