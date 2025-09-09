import { useCurrency, CurrencyProvider } from "src/context/CurrencyContext"
export default function MyProfile(){
    const { currency } = useCurrency();
    return (
  <>
    <div className="space-y-6 text-white">
      <div className="text-2xl font-bold">Profile</div>

      <div className="flex items-center gap-4">
        <img
          alt="Profile"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="size-16 rounded-full"
        />
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded"
          onClick={() => console.log("Change profile picture clicked")}
        >
          Change Profile Picture
        </button>
      </div>

      <p>Credits Owned: {currency}</p>
    </div>
  </>
);
}