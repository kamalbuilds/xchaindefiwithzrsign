"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectButton } from "thirdweb/react"
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb"

export function SiteHeader() {

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <ConnectButton
              client={client}
              wallets={wallets}
              theme={"dark"}
              connectModal={{ size: "wide" }}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
