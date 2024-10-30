import React, { useState } from "react";
import { Trophy, Check } from "@phosphor-icons/react";
import { Button, TextInput, Card, Title, Text } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/user/UserProvider";
import Cookies from "js-cookie";

export function EnterpriseAccessModal() {
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return Cookies.get("isSubmitted") === "true";
  });

  const { user } = useUser();
  const [email, setEmail] = useState(user?.email || "");
  const router = useRouter();

  async function sendAccessRequest(email: string): Promise<Response> {
    const response = await fetch(`/api/enterprise_signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    return response;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await sendAccessRequest(email);
    if (response.ok) {
      console.log(`Sending request for email!`);
    } else {
      console.error(`Sending request for email failed`);
    }

    setIsSubmitted(true);
    Cookies.set("isSubmitted", "true");
  };

  const handleClose = () => {
    router.push(`/chat`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-lg w-full bg-white">
        {!isSubmitted ? (
          <>
            <div className="flex flex-col items-center mb-4">
              <Trophy
                weight="fill"
                className="w-12 h-12 text-yellow-500 mb-2"
              />
              <Title className="text-2xl font-bold text-center">
                This feature is available on paid plans
              </Title>
            </div>
            <Text className="mb-6 text-lg text-gray-600 text-center">
              Unlock enterprise-level features to boost productivity and empower
              your team. Request access now to gain full functionality.
            </Text>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="w-full">
                <Text className="ml-3">Email</Text>
                <TextInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                size="lg"
                className="w-full h-11 bg-gray-900 text-white hover:bg-gray-800 border-none"
                type="submit"
              >
                Request Access 🚀
              </Button>
              <Button
                size="lg"
                className="w-full h-11 bg-gray-100 text-gray-700 hover:bg-gray-200 border-none"
                onClick={handleClose}
                type="button"
              >
                Return Home
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-4">
              <Check weight="fill" className="w-12 h-12 text-green-500 mb-2" />
              <Title className="text-2xl font-bold text-center">
                We&apos;ll get back to you within 24 hours
              </Title>
            </div>
            <Text className="mb-6 text-gray-600 text-center">
              Thank you for reaching out. Our team will review your request and
              respond shortly.
            </Text>
            <Button
              size="lg"
              className="w-full bg-gray-900 text-white hover:bg-gray-800 border-none"
              onClick={handleClose}
            >
              Return to Home
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}