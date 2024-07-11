import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Swap from "./components/swap";
import { TokenProvider } from "./components/swap/context";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <Swap />
      </TokenProvider>
    </QueryClientProvider>
  );
}

export default App;
