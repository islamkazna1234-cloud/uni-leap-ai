import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MentorChatWidget from "./MentorChatWidget";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <MentorChatWidget />
  </div>
);

export default Layout;
