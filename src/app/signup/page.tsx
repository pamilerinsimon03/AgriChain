import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupFlow } from '@/components/auth/SignupFlow';

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your AgriChain account"
      subtitle="Join a trusted network for agricultural trade and finance."
    >
      <SignupFlow />
    </AuthLayout>
  );
}
