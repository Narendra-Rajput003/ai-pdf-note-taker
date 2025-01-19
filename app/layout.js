
import "./globals.css";
import {Outfit} from "next/font/google"
import Provider from "@/app/provider";
import {ClerkProvider} from "@clerk/nextjs";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
      </ClerkProvider>
  );
}
