import { EduTrioLogo } from "../EduTrioLogo";
import { CardHeader, CardTitle } from "../ui/card";

interface HeaderComponentProps {
  heading: string;
  subHeading: string;
}

const HeaderComponent = ({ heading, subHeading }: HeaderComponentProps) => {
  return <CardHeader className="text-center pb-6">
    <div className="lg:hidden mb-4">
      <EduTrioLogo size="lg" className="mx-auto" />
    </div>
    <CardTitle className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
      {heading}
    </CardTitle>
    <p className="text-slate-600 mt-2">
      {subHeading}
    </p>
  </CardHeader>
}
export default HeaderComponent;