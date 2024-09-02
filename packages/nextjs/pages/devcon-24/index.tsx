import { useEffect, useState } from "react";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAccount, useSignMessage } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, RainbowKitCustomConnectButton, getParsedError } from "~~/components/scaffold-eth";
import devconLogo from "~~/public/assets/logo-devcon-sea.avif";
import logo from "~~/public/logo.svg";
import { notification } from "~~/utils/scaffold-eth";

const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button className="btn btn-primary" onClick={openConnectModal}>
      Connect
    </button>
  );
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BG_BACKEND_API || "http://localhost:49832";

type VoucherData = {
  voucherData: {
    voucher: string;
    type: string;
    builderAddress: string;
  };
};

const Devon2024 = () => {
  const [eligibilityStatus, setEligibilityStatus] = useState<{ isEligible: boolean; type: string | null } | null>(null);
  const [voucher, setVoucher] = useState<string | null>(null);
  const { address: connectedAddress, isConnected } = useAccount();
  const [inputAddress, setInputAddress] = useState("");
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [isGettingVoucher, setIsGettingVoucher] = useState(false);
  const { isLoading: isSigningMessage, signMessageAsync } = useSignMessage({
    message: `I want to claim my Devcon 2024 Bangkok voucher as ${connectedAddress}`,
  });
  const [voucherCopied, setVoucherCopied] = useState(false);

  // need this to prevent hydration mismatch because of isConnect
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (connectedAddress) {
      setInputAddress(connectedAddress);
    }
  }, [connectedAddress]);

  const handleCheckEligibility = async () => {
    try {
      if (!inputAddress) {
        throw new Error("Please enter an address");
      }
      setIsCheckingEligibility(true);
      const response = await fetch(`${BACKEND_URL}/devcon/check-eligibility/${inputAddress}`);
      if (!response.ok) {
        throw new Error("Failed to check eligibility");
      }
      const data = await response.json();
      setEligibilityStatus(data);
      if (data.isEligible) {
        notification.success(`Congratulations! You're eligible for ${data.type} discount.`);
      } else {
        notification.error("Sorry, you're not eligible for a discount.");
      }
    } catch (e) {
      const error = getParsedError(e);
      notification.error(error);
    } finally {
      setIsCheckingEligibility(false);
    }
  };

  const getVoucher = async () => {
    try {
      const signature = await signMessageAsync();
      setIsGettingVoucher(true);
      const response = await fetch(`${BACKEND_URL}/devcon/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature,
          builderAddress: connectedAddress,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to get voucher");
      }
      const data: VoucherData = await response.json();
      setVoucher(data.voucherData.voucher);
    } catch (e) {
      const error = getParsedError(e);
      notification.error(error);
    } finally {
      setIsGettingVoucher(false);
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="min-h-screen relative bg-base-100 bg-[url(/assets/hero-image-light.png)] bg-bottom bg-no-repeat bg-[length:200%_auto] md:bg-contain">
        <div className="navbar w-full navbar-end">
          <RainbowKitCustomConnectButton />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 transform-gpu blur-3xl overflow-hidden sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[30rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-[#FF78A5] to-[#B293FE] opacity-20 sm:left-[calc(50%-50rem)] sm:w-[70rem]"
          />
        </div>
        <div className="relative z-10 pt-2 px-6 md:pt-0">
          <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row md:gap-4 lg:gap-6">
            <Image className="max-w-[16rem] md:w-60 lg:w-72" alt="BuidlGuidl Logo" src={logo} />
            <XMarkIcon className="text-gray-600 mt-2 w-7 h-7 md:w-8 md:h-8 md:mt-5" />
            <Image className="max-w-[16rem] md:w-60 md:pt-3 lg:w-72" alt="Devcon SEA Logo" src={devconLogo} />
          </div>
          <p className="mt-6 mx-auto text-center text-gray-600 md:max-w-xl md:text-xl md:leading-relaxed lg:mt-4">
            BuidlGuidl has partnered with Devcon SEA to offer <strong>discounted tickets</strong> for BuidlGuidl
            members!
          </p>
          <div className="max-w-xs mx-auto flex flex-col sm:flex-row gap-4 justify-center text-center sm:max-w-none">
            <button className="btn btn-secondary">Check Eligibility</button>
            <button className="btn btn-outline bg-base-100">Learn More</button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[20%] transform-gpu blur-3xl overflow-hidden sm:-top-[30%]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+5rem)] aspect-[1155/678] w-[30rem] -translate-x-1/2 bg-gradient-to-tr from-[#FF78A5] to-[#B293FE] opacity-10 sm:left-[calc(50%+40rem)] sm:w-[70rem]"
          />
        </div>
      </div>
      <div className="py-24 bg-base-100">
        <div className="card mx-auto w-96 bg-base-300 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-3xl font-bold">Check Your Eligibility</h1>
            <div className="flex flex-col gap-4">
              <p className="m-0">Find out if you&apos;re eligible for our special voucher code!</p>
              <AddressInput value={inputAddress} onChange={setInputAddress} placeholder="Enter ENS or Address" />
              <button
                className={`btn btn-primary ${isCheckingEligibility ? "loading" : ""}`}
                disabled={isCheckingEligibility}
                onClick={handleCheckEligibility}
              >
                Check Eligibility
              </button>
              {isClient ? (
                !isConnected ? (
                  <ConnectButton />
                ) : (
                  <button
                    className={`btn btn-primary ${isSigningMessage || isGettingVoucher ? "loading" : ""}`}
                    disabled={isSigningMessage || isGettingVoucher || !eligibilityStatus?.isEligible}
                    onClick={getVoucher}
                  >
                    Get Voucher
                  </button>
                )
              ) : null}
            </div>
            {eligibilityStatus?.isEligible && (
              <p className="mt-4">🥳 Congratulations! You&apos;re eligible for {eligibilityStatus.type} discount.</p>
            )}
            {voucher && (
              <>
                <div className="divider"></div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Here&apos;s Your Voucher Code</h2>
                  <div className="flex items-center justify-center bg-secondary rounded-lg p-4">
                    <div className="bg-secondary text-primary-content text-2xl font-bold">{voucher}</div>
                    {voucherCopied ? (
                      <CheckCircleIcon className="ml-2 text-xl text-primary h-6 w-6" aria-hidden="true" />
                    ) : (
                      <CopyToClipboard
                        text={voucher}
                        onCopy={() => {
                          setVoucherCopied(true);
                          setTimeout(() => {
                            setVoucherCopied(false);
                          }, 800);
                        }}
                      >
                        <DocumentDuplicateIcon
                          className="ml-2 text-xl text-primary h-6 w-6 cursor-pointer"
                          aria-hidden="true"
                        />
                      </CopyToClipboard>
                    )}
                  </div>
                  <p className="mt-4">
                    Use this code to redeem your special offer or visit this{" "}
                    <a
                      className="underline underline-offset-1"
                      href={`https://tickets.devcon.org/redeem?voucher=${voucher}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      link
                    </a>{" "}
                    to buy ticket
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Devon2024;
