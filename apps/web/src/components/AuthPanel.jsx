import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

function AuthPanel() {
  return (
    <div className="panel p-6">
      <Tabs defaultValue="Login">
        <TabsList className="width-full">
          <TabsTrigger className="flex-1" value="login">
            Login
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="register">
            Register
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default AuthPanel;
