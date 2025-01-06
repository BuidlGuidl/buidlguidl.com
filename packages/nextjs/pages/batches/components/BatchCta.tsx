import { formatDate } from "../utils/formatDate";
import TrackedLink from "~~/components/TrackedLink";

interface BatchCtaProps {
  openBatchNumber: number | null;
  openBatchStartDate: number | null;
}

export const BatchCta = ({ openBatchNumber, openBatchStartDate }: BatchCtaProps) => {
  return (
    <div className="mt-16 mb-16 card bg-gradient-to-r from-primary to-secondary px-6 lg:pl-6 py-8 max-w-full xs:max-w-[90%] md:max-w-[75%] xl:max-w-[60%] mx-auto">
      <div className="card-body py-0 px-0 lg:py-0 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-full lg:max-w-[55%] text-center lg:text-left">
          <h3 className="card-title text-2xl text-white mb-3 justify-center lg:justify-start">
            Batch #{openBatchNumber}
          </h3>
          <p className="text-white">
            Complete SpeedRunEthereum and join BuidlGuidl to be part of the next batch starting
            <strong>{openBatchStartDate ? ` on ${formatDate(openBatchStartDate)}` : " soon"}!</strong>
          </p>
        </div>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto">
          <TrackedLink
            id="apply-next-batch"
            href="https://speedrunethereum.com/"
            className="btn btn-sm bg-white text-primary hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center whitespace-nowrap"
          >
            Go SpeedRunEthereum
          </TrackedLink>
        </div>
      </div>
    </div>
  );
};
