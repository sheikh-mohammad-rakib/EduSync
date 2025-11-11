import * as Toast from '@radix-ui/react-toast';

export function AppToast({ open, setOpen, message }) {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded px-4 py-2 shadow-lg"
        aria-live="polite"
      >
        <Toast.Title className="font-bold">{message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
    </Toast.Provider>
  );
}