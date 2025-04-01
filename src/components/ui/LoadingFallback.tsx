import { Spinner } from '@chakra-ui/react';

export function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <p className="text-lg font-medium text-gray-700">Carregando...</p>
      </div>
    </div>
  );
} 