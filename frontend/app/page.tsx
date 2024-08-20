"use client";
import Link from "next/link"

export default function landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Cross-Chain DeFi
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    OmniDeFi is a decentralized finance platform that enables seamless cross-chain lending, borrowing,
                    and interest earning. Experience the future of DeFi with our secure and dynamic platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/omnidefi"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore OmniDeFi
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock the Power of Cross-Chain DeFi
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  OmniDeFi offers a suite of decentralized finance tools that enable seamless cross-chain lending,
                  borrowing, and interest earning. Experience the future of DeFi with our secure and dynamic platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <LayersIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Cross-Chain Capabilities</h3>
                </div>
                <p className="text-muted-foreground">
                  Seamlessly lend, borrow, and earn interest across multiple blockchain networks with OmniDeFi's
                  cross-chain functionality.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <LockIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Secure Collateral Management</h3>
                </div>
                <p className="text-muted-foreground">
                  Enjoy peace of mind with OmniDeFi's robust collateral management system, ensuring the safety of your
                  assets.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <PercentIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Dynamic Interest Rates</h3>
                </div>
                <p className="text-muted-foreground">
                  Earn competitive interest rates that adapt to market conditions, maximizing your returns on your DeFi
                  investments.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How it Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Seamless Cross-Chain DeFi</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  OmniDeFi offers a comprehensive suite of decentralized finance tools, enabling users to lend, borrow,
                  and earn interest across multiple blockchain networks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Lending & Borrowing</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>Lending:</strong> Users can deposit their assets into OmniDeFi's lending pools. These assets
                  are then available for borrowers who can take out loans by providing sufficient collateral.
                  <br />
                  <strong>Borrowing:</strong> Users request loans by locking up collateral. The system checks the
                  collateral's sufficiency before approving the loan. Once approved, the loan is issued, and the
                  borrower receives the funds.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <ZapIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Cross-Chain Transactions</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>ZrSign Key Request:</strong> Users can request ZrSign keys for cross-chain operations. These
                  keys are essential for performing transactions across different blockchain networks.
                  <br />
                  <strong>ZrSign Transaction Request:</strong> Users initiate cross-chain transactions by sending a
                  transaction request through ZrSign. The platform verifies the user's ownership and authorizes the
                  transaction if valid.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <PercentIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Loan Repayment & Interest Calculation</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>Repayment:</strong> Borrowers repay their loans over time. The platform tracks repayments.
                  <br />
                  <strong>Interest Calculation:</strong> The platform calculates and applies interest rates based on
                  market conditions, ensuring competitive returns for lenders and affordable rates for borrowers.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <WalletIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Wallet Management</h3>
                </div>
                <p className="text-muted-foreground">
                  <strong>ZrSign Key Management:</strong> OmniDeFi manages user wallets across different chains by
                  assigning and verifying ZrSign keys. Users can access and manage their assets securely, regardless of
                  the blockchain network.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Experience the Future of DeFi</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the OmniDeFi revolution and unlock the power of cross-chain decentralized finance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore OmniDeFi
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 OmniDeFi. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CreditCardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function LayersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}


function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}



function PercentIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}


function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}


function ZapIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}