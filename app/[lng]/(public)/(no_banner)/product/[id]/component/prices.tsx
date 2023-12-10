import { formatPrice } from '@utils/string';

export default function Prices({ price, oldPrice }: { price: string; oldPrice: string }) {
  return (
    <div className="flex justify-start gap-3">
      <div className="text-blue-600 text-2xl font-bold">
        <span>{formatPrice(price)}</span>
      </div>
      {oldPrice && (
        <>
          <div className="line-through text-gray-600 text-2xl font-bold">
            <span>{formatPrice(oldPrice)}</span>
          </div>
        </>
      )}
    </div>
  );
}
