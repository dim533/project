import { createContext, useContext, useReducer, ReactNode } from 'react';

interface State {
  businessType: 'gym' | 'studio' | 'personal-trainer';
  currentStep: number;
  formData: Record<string, any>;
  lastSaved?: Date;
}

type Action = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Record<string, any> }
  | { type: 'RESET_FORM' };

const initialState: State = {
  businessType: 'gym',
  currentStep: 0,
  formData: {}
};

const BusinessRegistrationContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

interface ProviderProps {
  children: ReactNode;
  initialState?: Partial<State>;
}

export function BusinessRegistrationProvider({ children, initialState = {} }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    businessType: initialState.businessType || 'gym',
    currentStep: initialState.currentStep || 0,
    formData: initialState.formData || {}
  });

  return (
    <BusinessRegistrationContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessRegistrationContext.Provider>
  );
}

export function useBusinessRegistration() {
  const context = useContext(BusinessRegistrationContext);
  if (!context) {
    throw new Error('useBusinessRegistration must be used within a BusinessRegistrationProvider');
  }
  return context;
}

function saveProgress(state: State) {
  localStorage.setItem('registration_progress', JSON.stringify({
    ...state,
    lastSaved: new Date()
  }));
}

function recoverProgress(): State | null {
  const saved = localStorage.getItem('registration_progress');
  if (!saved) return null;
  
  const data = JSON.parse(saved);
  const savedDate = new Date(data.lastSaved);
  
  if (Date.now() - savedDate.getTime() > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('registration_progress');
    return null;
  }
  
  return data;
} 