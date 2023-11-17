import { Button, Label, TextInput } from "flowbite-react";
export const Auth = () => {
  return (
    <div className="max-w-screen-lg mx-auto min-h-screen ">
      <form className="flex max-w-md flex-col gap-4 mx-auto ">
        {/* # USERNAME */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Username" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="example@email.com"
            required
          />
        </div>
        {/* # PASSWORD */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="********"
            required
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
