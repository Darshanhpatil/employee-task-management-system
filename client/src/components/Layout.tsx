import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <Header />

        <div
          style={{
            padding: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
    
  );
}

export default Layout;