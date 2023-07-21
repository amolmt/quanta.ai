import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return ( 
        <div>
            landing page
            <div>
                <Link href="/sign-in">
                <Button>
                    Login
                    </Button>
                </Link>
            </div>

            <div>
                <Link href="/sign-up">
                <Button>
                    Sign Up
                    </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default LandingPage;