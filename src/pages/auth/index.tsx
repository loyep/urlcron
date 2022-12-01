import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { Button } from "@/ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import AuthLayout from "../../layout/auth";

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", {
        callbackUrl: "/dash",
      });
    } catch (error) {
      toast(
        "An error occurred while logging in. Please create an issue about the problem.",
        {
          icon: "🤔",
          style: {
            borderRadius: "10px",
            background: "#28283E",
            color: "#fff",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout showLogo title="Login" description="" heading="欢迎回来">
      <div className="space-y-6">
        <Button
          onClick={handleSignIn}
          isLoading={loading}
          loadingText="Loading..."
          icon={<BsGithub size={17} />}
          className="bg-brand-500 hover:bg-brand-400 focus:ring-offset focus:ring-brand-500 dark:hover:bg-darkgray-600 dark:bg-darkgray-900 relative inline-flex h-9 w-full items-center justify-center  rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors focus:border focus:border-white focus:outline-none focus:ring-2 dark:text-black"
        >
          Sign in with GitHub
        </Button>
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/dash",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Auth;
