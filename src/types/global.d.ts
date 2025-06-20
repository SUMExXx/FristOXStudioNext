type QNAElementProps = {
  question: string;
  answer: string;
}

enum Types3D {
  shirt = 1,
  pants = 2,
}

type Models3D = {
  beanie: ModelData;
  cap: ModelData;
  hangingHoodie: ModelData;
  oversizedTshirt: ModelData;
  pantAnimated: ModelData;
  tshirt: ModelData;
  tshirtAnimated: ModelData;
}

type Models2D = {
  all: ModelData;
}

type ModelData = {
  loaderUrl: string;
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
}

type PaymentProps = {
  name: string;
  email: string;
  plan: string;
  amount: string;
  orderID: string;
}

// Global window type declaration
declare global {
  interface Window {
    openPocketsflowCheckout: (options: PocketsflowCheckoutOptions) => void;
  }
}
  
  // Product checkout options
interface PocketsflowCheckoutOptionsProduct {
  type: "product";
  productId: string;
  subdomain: string;
  embedDivId?: string;
  isDarkMode?: boolean;
  metadata?: unknown, // webhook metadata
  onSuccess?: (data: {
    email: string;
    firstName: string;
    lastName: string;
    paymentIntentId: string;
    data: any;
  }) => void;
}
  
// Subscription checkout options
interface PocketsflowCheckoutOptionsSubscription {
  type: "subscription";
  subscriptionId: string;
  subdomain: string;
  embedDivId?: string;
  isDarkMode?: boolean;
  metadata?: unknown, // webhook metadata
  onSuccess?: (data: {
    type: "success";
    setupIntentId: string;
    data: any;
    isSubscription: true;
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

// Union type for all checkout options
type PocketsflowCheckoutOptions = 
  | PocketsflowCheckoutOptionsProduct 
  | PocketsflowCheckoutOptionsSubscription;