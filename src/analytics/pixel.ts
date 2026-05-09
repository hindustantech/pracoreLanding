import ReactPixel from 'react-facebook-pixel';

const PIXEL_ID: string = import.meta.env.VITE_PIXEL_ID || '1241232271460220';

let isInitialized = false;

export const initPixel = (): void => {
  if (typeof window === 'undefined') return;

  if (!isInitialized) {
    ReactPixel.init(PIXEL_ID, {}, { autoConfig: true, debug: false });
    isInitialized = true;
  }
};

export const trackPageView = (): void => {
  if (!isInitialized) return;
  ReactPixel.pageView();
};

// Strong typing for events
type PixelEvent =
  | 'PageView'
  | 'AddToCart'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration';

interface PixelEventData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
  content_type?: string;
}

export const trackEvent = (
  event: PixelEvent,
  data: PixelEventData = {}
): void => {
  if (!isInitialized) return;
  ReactPixel.track(event, data);
};