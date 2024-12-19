import Logo from "@/app/(auth)/components/Logo";

export default function Footer() {
  return (
    <div className="pt-10 pb-10 border-t flex justify-center items-center">
      <div>
        <div className="mx-auto w-fit">
          <Logo />
        </div>
        <div className="mt-2 text-muted-foreground">&copy; 2024, All rights reserved.</div>
      </div>
    </div>
  );
}
