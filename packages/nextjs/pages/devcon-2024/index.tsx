import { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";

const Devon2024 = () => {
  const [isEligible, setIsEligible] = useState(false);

  const handleCheckEligibility = () => {
    setIsEligible(!isEligible);
  };

  return (
    <>
      <MetaHeader />
      <div className="hero min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h1 className="card-title text-3xl font-bold">Check Your Eligibility</h1>
            <p>Find out if you&apos;re eligible for our special voucher code!</p>
            <button className="btn btn-primary" onClick={handleCheckEligibility}>
              Check Eligibility
            </button>

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
