import { QrGenerator } from "@/components/sections/main/qr-generator";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* <QrCodeGenerator /> */}
      <QrGenerator />
    </main>
  );
}
