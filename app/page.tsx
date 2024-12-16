'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, MessageSquare, Star, User, List, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100vh] bg-pink-50">
      <main className="flex-1">
        <section className="w-full py-20 bg-pink-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold tracking-tight text-pink-900">
              Manage Your Tasks Like a Pro
            </h1>
            <p className="mt-4 text-xl text-pink-700">
              Create, organize, and track your to-dos with our user-friendly app.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button className="bg-pink-600 text-white hover:bg-pink-500">
                Get Started
              </Button>
              <Button className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
          <div className="mt-12 container mx-auto px-4">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              alt="Hero"
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pink-900">
              Features
            </h2>
            <p className="mt-4 text-xl text-pink-700">
              Everything you need to stay organized and productive.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <List className="w-10 h-10 text-pink-600" />
                  <CardTitle>Task Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easily create, categorize, and prioritize your to-dos.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <Check className="w-10 h-10 text-pink-600" />
                  <CardTitle>Complete Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Mark tasks as complete and track your progress.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <MessageSquare className="w-10 h-10 text-pink-600" />
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Add detailed notes to each task for better clarity.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-pink-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pink-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-pink-700">
              Join the thousands of satisfied users.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/200" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-pink-900">John Doe</p>
                    <p className="text-sm text-pink-700">Product Manager</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    "This app has revolutionized the way I manage my daily tasks. It's intuitive and efficient."
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/200" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-pink-900">Sarah Miller</p>
                    <p className="text-sm text-pink-700">Software Engineer</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    "A game-changer for productivity. I can't imagine my life without it."
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/200" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-pink-900">Michael Johnson</p>
                    <p className="text-sm text-pink-700">Designer</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    "Simple, elegant, and effective. The best to-do list app out there."
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pink-900">
              Pricing
            </h2>
            <p className="mt-4 text-xl text-pink-700">
              Choose a plan that fits your needs.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Basic</CardTitle>
                  <CardDescription className="mt-2 text-4xl font-bold text-pink-600">
                    $5<span className="text-2xl font-medium text-pink-700">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-pink-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      10 Tasks
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Basic Support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-pink-600 text-white hover:bg-pink-500">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border border-pink-600">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-pink-900">Pro</CardTitle>
                  <CardDescription className="mt-2 text-4xl font-bold text-pink-600">
                    $15<span className="text-2xl font-medium text-pink-700">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-pink-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Tasks
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Priority Support
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Collaborate with others
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-pink-600 text-white hover:bg-pink-500">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                  <CardDescription className="mt-2 text-4xl font-bold text-pink-600">
                    $50<span className="text-2xl font-medium text-pink-700">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-pink-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Unlimited Tasks
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Dedicated Support
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Custom Features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-pink-600 text-white hover:bg-pink-500">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-pink-200 py-6">
        <div className="container mx-auto text-center text-pink-700">
          <p>&copy; 2023 Todo App. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Button className="bg-pink-600 text-white hover:bg-pink-500">
              <ArrowRight className="mr-2" /> Contact Us
            </Button>
            <Button className="border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
              <ArrowRight className="mr-2" /> Privacy Policy
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;