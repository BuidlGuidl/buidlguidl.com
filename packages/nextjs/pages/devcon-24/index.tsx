import { useEffect, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAccount, useSignMessage } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, RainbowKitCustomConnectButton, getParsedError } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button className="btn btn-primary" onClick={openConnectModal}>
      Connect
    </button>
  );
};

const DEVCON_BACKEND_URL = process.env.NEXT_PUBLIC_DEVCON_BACKEND_URL || "http://localhost:49832/devcon";

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
      const response = await fetch(`${DEVCON_BACKEND_URL}/check-eligibility/${inputAddress}`);
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
      const response = await fetch(`${DEVCON_BACKEND_URL}/claim`, {
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
      <div className="min-h-screen relative bg-base-100">
        <div className="navbar w-full navbar-end">
          <RainbowKitCustomConnectButton />
        </div>
        <div className="card mx-auto mt-12 w-96 bg-base-300 shadow-xl">
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
