"use client";

type Props = {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
};

export default function Pagination({
  page,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className={`px-3 py-1 rounded-lg text-sm border cursor-pointer ${
          disablePrev
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        Prev
      </button>
      <span className="text-sm font-medium">Page {page}</span>
      <button
        onClick={onNext}
        disabled={disableNext}
        className={`px-3 py-1 rounded-lg text-sm border cursor-pointer ${
          disableNext
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  );
}
