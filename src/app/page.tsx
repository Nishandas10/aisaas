import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Zap, Rocket, Globe, Check } from "lucide-react";
import Auth from "@/components/auth";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const LandingPage: React.FC = () => {

  const {userId} = auth();
  if(userId){
    redirect("/dashboard");
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Sparkles className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">ContentAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline" href="#contact">
            Contact
          </Link>
          <Auth />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  Generate Content with AI and LLMs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600">
                  Create high-quality content in seconds with our advanced AI. Perfect for bloggers, marketers, and content creators.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="border border-black px-4 py-2">Get Started</Button>
                <Button variant="outline" className="border border-black px-4 py-2">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-black">
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2" />
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Generate content in seconds, not hours. Our AI works at superhuman speeds.</p>
                </CardContent>
              </Card>
              <Card className="border border-black">
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2" />
                  <CardTitle>Multilingual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Create content in over 50 languages. Reach a global audience with ease.</p>
                </CardContent>
              </Card>
              <Card className="border border-black">
                <CardHeader>
                  <Rocket className="h-8 w-8 mb-2" />
                  <CardTitle>SEO Optimized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our AI understands SEO best practices, helping your content rank higher.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-center mb-12">
              Pricing Plans
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-black">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individuals and small teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$29/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> 10,000 words per month</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> 5 user seats</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Basic support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-black">Choose Plan</Button>
                </CardFooter>
              </Card>
              <Card className="border border-black">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">$99/mo</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> 50,000 words per month</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> 20 user seats</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Priority support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-black">Choose Plan</Button>
                </CardFooter>
              </Card>
              <Card className="border border-black">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">Custom</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Unlimited words</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> Unlimited user seats</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2" /> 24/7 dedicated support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full border border-black">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-600">
                  Join thousands of content creators who are already using ContentAI to supercharge their workflow.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 border border-black" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="border border-black px-4 py-2">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-600">
                  By signing up, you agree to our{" "}
                  <Link className="underline" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">© 2023 ContentAI Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
