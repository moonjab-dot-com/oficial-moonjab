import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';

export const MOONJAB_PRO = {
  price_id: "price_1TByrLE84vzDx9ysFXERAYK8",
  product_id: "prod_UAJU0VprNZw3rz",
};

interface SubscriptionState {
  subscribed: boolean;
  productId: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
}

const initialState: SubscriptionState = {
  subscribed: false,
  productId: null,
  subscriptionEnd: null,
  loading: false,
};

export function useSubscription() {
  const { isAuthenticated } = useAuthStore();
  const [state, setState] = useState<SubscriptionState>(initialState);

  const checkSubscription = useCallback(async () => {
    if (!isAuthenticated) {
      setState(initialState);
      return null;
    }

    setState((current) => ({ ...current, loading: true }));

    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;

      const nextState = {
        subscribed: data?.subscribed ?? false,
        productId: data?.product_id ?? null,
        subscriptionEnd: data?.subscription_end ?? null,
        loading: false,
      };

      setState(nextState);
      return data;
    } catch {
      setState((current) => ({ ...current, loading: false }));
      return null;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setState(initialState);
      return;
    }

    void checkSubscription();
    const interval = setInterval(() => {
      void checkSubscription();
    }, 60000);

    return () => clearInterval(interval);
  }, [checkSubscription, isAuthenticated]);

  const openCheckout = async () => {
    const { data, error } = await supabase.functions.invoke('create-checkout');
    if (error) throw error;
    if (data?.url) window.open(data.url, '_blank');
  };

  const openPortal = async () => {
    const { data, error } = await supabase.functions.invoke('customer-portal');
    if (error) throw error;
    if (data?.url) window.open(data.url, '_blank');
  };

  return { ...state, checkSubscription, openCheckout, openPortal };
}
