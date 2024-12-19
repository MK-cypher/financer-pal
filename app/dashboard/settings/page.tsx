import ActiveTheme from "@/components/themes/ActiveTheme";
import CustomeTheme from "@/components/themes/CustomeTheme";
import Reset from "@/components/themes/Reset";
import SubscriptionsBtn from "../subscriptions/SubscriptionsBtn";
import PasswordUpdate from "@/components/PasswordUpdate";

export default function page() {
  return (
    <div className="">
      <div className="mb-4 card">
        <div className="text-xl mb-5 font-bold">Subscription</div>
        <SubscriptionsBtn />
      </div>
      <PasswordUpdate />
      <div className="mb-4 card">
        <div className="text-xl mb-5 font-bold">Theme</div>
        <ActiveTheme />
      </div>
      <div className="mb-4 card">
        <div className=" flex items-center gap-2 mb-5">
          <div className="text-xl font-bold">Custome Themes</div>
          <Reset />
        </div>
        <CustomeTheme variable="--background" objKey="background" name="Background Color" />
        <CustomeTheme variable="--card" objKey="card" name="Secondary Background" />
        <CustomeTheme variable="--foreground" objKey="foreground" name="Text color" />
        <CustomeTheme variable="--muted-foreground" objKey="mutedForeground" name="Secondary Text" />
        <CustomeTheme variable="--primary" objKey="primary" name="Primary Color" />
        <CustomeTheme variable="--secondary" objKey="secondary" name="Secondary Color" />
      </div>
    </div>
  );
}
