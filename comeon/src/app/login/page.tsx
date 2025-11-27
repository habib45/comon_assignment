import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Image
          src="/images/logo.svg"
          alt="ComeOn logo"
          width={180}
          height={60}
          priority
          style={{ marginBottom: "1.5rem" }}
        />
        <LoginForm />
      </div>
    </div>
  );
}
