import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { StudyProvider } from './components/StudyContext';

export default function App() {
  return (
    <StudyProvider>
      <RouterProvider router={router} />
    </StudyProvider>
  );
}
