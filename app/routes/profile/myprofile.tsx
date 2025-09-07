import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"
export default function MyProfile(){
    const { currency } = useCurrency();
    return (
    <>
      <div className="space-y-12">
        <div>Profile</div>
        <p>Credits Owned: {currency}</p>
      </div>
    </>
  );
}