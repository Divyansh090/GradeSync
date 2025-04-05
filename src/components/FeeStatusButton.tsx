'use client';

type FeeStatusButtonProps = {
  paidFee: number;
  unpaidAmount: number;
};

export default function FeeStatusButton({ paidFee, unpaidAmount }: FeeStatusButtonProps) {
  const handleClick = () => {
    alert(`Paid: ₹${paidFee}\nUnpaid: ₹${unpaidAmount}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaYellowLight text-sm font-bold"
      title="View Fee Details"
    >
      ₹
    </button>
  );
}
