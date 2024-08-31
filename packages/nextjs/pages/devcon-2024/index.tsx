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
  const [isEligible, setIsEligible] = useState(false);

  const { address: connectedAddress, isConnected } = useAccount();
  const [inputAddress, setInputAddress] = useState(connectedAddress || "");
  const { isLoading: isSigningMessage, signMessageAsync } = useSignMessage({
    message: `I want to claim Devon Bangkok 2024 for ${connectedAddress}`,
  });

  useEffect(() => {
    if (connectedAddress) {
      setInputAddress(connectedAddress);
    }
  }, [connectedAddress]);

  const handleCheckEligibility = () => {
    setIsEligible(!isEligible);
  };

  const getVoucher = async () => {
    try {
      const signature = await signMessageAsync();
      console.log("Signature: ", signature);
    } catch (e) {
      const error = getParsedError(e);
      notification.error(error);
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="hero min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-3xl font-bold">Check Your Eligibility</h1>
            <div className="flex flex-col gap-4">
              <p className="m-0">Find out if you&apos;re eligible for our special voucher code!</p>
              <AddressInput value={inputAddress} onChange={setInputAddress} placeholder="Enter ENS or Address" />
              <button className="btn btn-primary" onClick={handleCheckEligibility}>
                Check Eligibility
              </button>
              {!isConnected ? (
                <ConnectButton />
              ) : (
                <button
                  className={`btn btn-primary ${isSigningMessage ? "loading" : ""}`}
                  disabled={isSigningMessage}
                  onClick={getVoucher}
                >
                  Get Voucher
                </button>
              )}
            </div>

            {isEligible && (
              <>
                <div className="divider"></div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Congratulations! You&apos;re Eligible</h2>
                  <p className="mb-4">Here&apos;s your voucher code:</p>
                  <div className="bg-secondary text-primary-content p-4 rounded-lg text-2xl font-bold">332421</div>
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
