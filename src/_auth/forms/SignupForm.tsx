
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"

 

const SignupForm = () => {

    const isLoading = false;
   
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
      resolver: zodResolver(SignupValidation),
      defaultValues: {
        name: '',
        username: '',
        email: '',
        password: '',
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
      const newUser = await createUserAccount(values);

      console.log(newUser)
    }
    return (
      <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
        <img 
            src="/assets/images/NWCreateNewAccount.png"
            alt="Loader"
            width={360}
            height={360}
        />
          <p className="text-light-3 small-medium md:base-regular">To use NestFinder, please enter your account details</p>
        
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="your public display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" style={{ backgroundColor: '#DFC68B', color: '#021830' }}>
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader />
                </div>
              ): "Sign up" }
            </Button>
            <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>

          </form>
        </div>
      </Form>
    )
}

export default SignupForm