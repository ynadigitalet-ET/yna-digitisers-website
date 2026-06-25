declare module "@tawk.to/tawk-messenger-react" {
    import { ComponentType } from "react";
    
    interface TawkMessengerProps {
      propertyId: string;
      widgetId: string;
      onLoad?: () => void;
      onStatusChange?: (status: string) => void;
      customStyle?: object;
    }
    
    const TawkMessengerReact: ComponentType<TawkMessengerProps>;
    export default TawkMessengerReact;
  }