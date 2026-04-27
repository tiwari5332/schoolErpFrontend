import { CardHeader } from "../../../components/ui/card";
import { EduTrioLogo } from "../../../components/EduTrioLogo";
import { CardTitle } from "../../../components/ui/card";
const HeaderComponent = () => {
  return   <CardHeader className="text-center pb-6">
          <div className="lg:hidden mb-4">
            
            <EduTrioLogo size="lg" className="mx-auto" />
          </div>
          <CardTitle className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <p className="text-slate-600 mt-2">
            Sign in to access your EduTrio portal
          </p>
        </CardHeader>
}
export default HeaderComponent;