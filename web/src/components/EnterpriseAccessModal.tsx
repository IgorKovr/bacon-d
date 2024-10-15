import React, { useState } from "react";
import { Trophy, Rocket, Check } from "@phosphor-icons/react";
import { Button, TextInput, Card, Title, Text } from "@tremor/react";

interface EnterpriseAccessModalProps {
  email: string;
  onSend: (email: string) => void;
  onClose: () => void;
}

export function EnterpriseAccessModal({
  email: initialEmail,
  onSend,
  onClose,
}: EnterpriseAccessModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(email);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
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
                This Feature is Available for Enterprise Users
              </Title>
            </div>
            <Text className="mb-6 text-gray-600 text-center">
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
                className="w-full bg-gray-900 text-white hover:bg-gray-800"
                type="submit"
              >
                <span className="flex items-center justify-center gap-2">
                  <Rocket weight="fill" className="w-5 h-5" />
                  Request Access
                </span>
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-4">
              <Check weight="fill" className="w-12 h-12 text-green-500 mb-2" />
              <Title className="text-2xl font-bold text-center">
                We'll get back to you within 24 hours
              </Title>
            </div>
            <Text className="mb-6 text-gray-600 text-center">
              Thank you for reaching out. Our team will review your request and
              respond shortly.
            </Text>
            <Button
              size="lg"
              className="w-full bg-gray-900 text-white hover:bg-gray-800"
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
