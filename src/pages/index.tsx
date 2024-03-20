

import Button from "components/Button";
import TextInput from "components/TextInput";


export default function Home() {
  return (
      <section className="bg-gray-50  w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <TextInput label="Email" />
                <TextInput  label="Password" />
                <Button className="w-full"  variant="outline">Sign in</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
   
  );
}
