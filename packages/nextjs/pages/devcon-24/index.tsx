import { useEffect, useState } from "react";
import Image from "next/image";
import { AccentGrid, AccentShape, AccentShapeSecondary } from "./_components/AccentShape";
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
    <div className="bg-white">
      <MetaHeader />
      <div className="min-h-screen relative bg-base-100/70 bg-[url(/assets/hero-image-light.png)] bg-bottom bg-no-repeat bg-[length:200%_auto] md:bg-contain">
        <div className="navbar w-full navbar-end">
          <RainbowKitCustomConnectButton />
        </div>
        <AccentShape />
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
        <AccentShapeSecondary />
      </div>
      <div className="relative isolate bg-base-100/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <AccentGrid />
              <h2 id="eligible" className="text-3xl font-bold tracking-tight text-gray-800">
                Check Your Eligibility
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                There are two tiers of discount codes available to BuidlGuidl Members.
              </p>
              <h3 className="mt-12">
                General BuidlGuidl Member <span className="text-gray-500 font-normal">($299 USD)</span>
              </h3>
              <p className="mt-2 text-gray-600">
                General BuidlGuidl members can claim a special discount code for <strong>50%</strong> off of Devcon 2024
                tickets!
              </p>
              <h3 className="mt-10">
                Batch BuidlGuidl Member <span className="text-gray-500 font-normal">($49 USD)</span>
              </h3>
              <p className="mt-2 text-gray-600">
                BuidlGuidl members that are part of a batch can claim a Devcon 2024 ticket for only $49 USD!
              </p>
            </div>
          </div>
          <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
};

export default Devon2024;
