import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { userActions } from "./store/slices/user";
import { useSelector } from "react-redux";

import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Chat from "./components/pages/Chat";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  };

  const router = createBrowserRouter([
    {
      index: true,
      element: (
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      ),
    },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
  ]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      userActions.setCurrentUser(user)
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
