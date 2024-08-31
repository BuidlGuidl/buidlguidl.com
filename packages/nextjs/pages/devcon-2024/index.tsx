import { useEffect, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { AddressInput, getParsedError } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const ConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button className="btn btn-primary" onClick={openConnectModal}>
      Connect
    </button>
  );
};

const Devon2024 = () => {
  const [eligibilityStatus, setEligibilityStatus] = useState<{ isEligible: boolean; type: string | null } | null>(null);
  const [voucher, setVoucher] = useState<string | null>(null);
  const { address: connectedAddress, isConnected } = useAccount();
  const [inputAddress, setInputAddress] = useState("");
  const { isLoading: isSigningMessage, signMessageAsync } = useSignMessage({
    message: `I want to claim Devon Bangkok 2024 for ${connectedAddress}`,
  });

  // need this prevent hydration mismatch because of isConnect
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
      const response = await fetch(`/api/devcon/check-eligibility/${inputAddress}`);
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
    }
  };

  const getVoucher = async () => {
    try {
      const signature = await signMessageAsync();
      const response = await fetch("/api/devcon/get-voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature,
          message: `I want to claim Devon Bangkok 2024 for ${connectedAddress}`,
          builderAddress: connectedAddress,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to get voucher");
      }
      const data = await response.json();
      setVoucher(data.voucher);
    } catch (e) {
      const error = getParsedError(e);
      notification.error(error);
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="hero min-h-screen bg-base-100">
        <div className="card w-96 bg-base-300 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-3xl font-bold">Check Your Eligibility</h1>
            <div className="flex flex-col gap-4">
              <p className="m-0">Find out if you&apos;re eligible for our special voucher code!</p>
              <AddressInput value={inputAddress} onChange={setInputAddress} placeholder="Enter ENS or Address" />
              <button className="btn btn-primary" onClick={handleCheckEligibility}>
                Check Eligibility
              </button>
              {isClient ? (
                !isConnected ? (
                  <ConnectButton />
                ) : (
                  <button
                    className={`btn btn-primary ${isSigningMessage ? "loading" : ""}`}
                    disabled={isSigningMessage || !eligibilityStatus?.isEligible}
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
                  <div className="bg-secondary text-primary-content p-4 rounded-lg text-2xl font-bold">{voucher}</div>
                  <p className="mt-4">Use this code to redeem your special offer.</p>
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
